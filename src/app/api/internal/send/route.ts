/**
 * POST /api/internal/send
 *
 * Вызывается TargradCore для отправки сообщения в Telegram конкретного игрока
 * (2FA-код, оповещение о награде, и т.д.).
 *
 * Тело:
 *   { playerUuid: string, text: string }
 * Ответ:
 *   200 { sent: true, messageId: 123 }
 *   200 { sent: false, reason: "not_linked" }
 *   401 { error: "Unauthorized" }
 *   500 { error: "..." }
 */

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendMessage, TelegramApiError } from '@/lib/telegram'
import { checkInternalAuth } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 20

export async function POST(request: Request) {
  if (!checkInternalAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { playerUuid?: string; text?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const playerUuid = body.playerUuid?.trim()
  const text = body.text?.trim()
  if (!playerUuid) {
    return NextResponse.json({ error: 'playerUuid обязателен' }, { status: 400 })
  }
  if (!text) {
    return NextResponse.json({ error: 'text обязателен' }, { status: 400 })
  }
  if (text.length > 4000) {
    // Telegram лимит — 4096 символов на сообщение. Запас на HTML-теги.
    return NextResponse.json({ error: 'text слишком длинный (>4000 символов)' }, { status: 400 })
  }

  const link = await db.link.findUnique({ where: { playerUuid } })
  if (!link) {
    return NextResponse.json({ sent: false, reason: 'not_linked' })
  }

  const chatId = Number(link.telegramId)

  try {
    const result = await sendMessage({ chatId, text })
    // Логируем для аудита.
    await db.outboundMessage.create({
      data: {
        telegramId: BigInt(chatId),
        text,
        status: 'sent',
        httpStatus: 200,
        createdAt: BigInt(Date.now()),
        sentAt: BigInt(Date.now()),
      },
    }).catch(() => { /* лог не критичен */ })
    return NextResponse.json({ sent: true, messageId: result.message_id })
  } catch (err) {
    const errorMessage = err instanceof TelegramApiError
      ? `${err.telegramErrorCode ?? err.statusCode}: ${err.message}`
      : err instanceof Error ? err.message : String(err)

    await db.outboundMessage.create({
      data: {
        telegramId: BigInt(chatId),
        text,
        status: 'failed',
        errorBody: errorMessage.slice(0, 2000),
        createdAt: BigInt(Date.now()),
      },
    }).catch(() => { /* лог не критичен */ })

    return NextResponse.json(
      { sent: false, reason: 'telegram_error', error: errorMessage },
      { status: 502 },
    )
  }
}
