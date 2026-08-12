/**
 * POST /api/internal/setup
 *
 * Одноразовая настройка: устанавливает webhook в Telegram.
 *
 * Тело:
 *   { webhookUrl: string }  — полный URL, например https://myapp.vercel.app/api/telegram
 *                            Telegram требует HTTPS.
 *
 * Автоматически генерирует TELEGRAM_WEBHOOK_SECRET и возвращает его —
 * админ должен добавить его в переменные окружения Vercel и перезапустить.
 *
 * Ответ:
 *   200 { ok: true, bot: {...}, webhook: {...}, webhookSecret: "..." }
 *   401 { error: "Unauthorized" }
 *   400 { error: "..." }
 */

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { checkInternalAuth, generateSecret } from '@/lib/auth'
import { getBotInfo, setWebhook, getWebhookInfo } from '@/lib/telegram'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 20

export async function POST(request: Request) {
  if (!checkInternalAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { webhookUrl?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const webhookUrl = body.webhookUrl?.trim()
  if (!webhookUrl || !/^https:\/\/.+/.test(webhookUrl)) {
    return NextResponse.json(
      { error: 'webhookUrl обязателен и должен быть HTTPS' },
      { status: 400 },
    )
  }

  // Секрет для X-Telegram-Bot-Auth-Secret. Длина 32 символа (рекомендация Telegram).
  // Если уже задан через env — используем его. Иначе генерируем.
  const existingSecret = process.env.TELEGRAM_WEBHOOK_SECRET?.trim()
  const webhookSecret = existingSecret || generateSecret(16)

  const bot = await getBotInfo()
  await setWebhook({ webhookUrl, secretToken: webhookSecret, maxConnections: 40 })
  const webhook = await getWebhookInfo()

  return NextResponse.json({
    ok: true,
    bot,
    webhook,
    webhookSecret,
    note: existingSecret
      ? 'Использован TELEGRAM_WEBHOOK_SECRET из env'
      : 'Сгенерирован новый секрет. Добавьте его в env TELEGRAM_WEBHOOK_SECRET на Vercel и перезапустите.',
  })
}

// GET — текущее состояние настройки.
export async function GET(request: Request) {
  if (!checkInternalAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const bot = await getBotInfo()
    const webhook = await getWebhookInfo()
    return NextResponse.json({
      ok: true,
      bot,
      webhook,
      webhookSecretConfigured: Boolean(process.env.TELEGRAM_WEBHOOK_SECRET?.trim()),
    })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 502 },
    )
  }
}
