/**
 * POST /api/internal/broadcast
 *
 * Массовая рассылка ВСЕМ привязанным игрокам. Используется админом через
 * /targrad broadcast в игре. ВАЖНО: при большом количестве привязанных
 * игроков этот endpoint может работать дольше лимита Vercel serverless
 * (10-60 сек). В этом случае рекомендуется вызвать его несколько раз
 * с пагинацией (поддерживается параметром offset/limit).
 *
 * Тело:
 *   { text: string, offset?: number, limit?: number }
 * Ответ:
 *   200 { sent: number, failed: number, total: number, nextOffset?: number }
 */

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendMessage, TelegramApiError } from '@/lib/telegram'
import { checkInternalAuth } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 55 // макс для Vercel Hobby

const BROADCAST_CHUNK_SIZE = 25 // Telegram rate limit: ~30 msg/sec глобально

export async function POST(request: Request) {
  if (!checkInternalAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { text?: string; offset?: number; limit?: number }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const text = body.text?.trim()
  if (!text) {
    return NextResponse.json({ error: 'text обязателен' }, { status: 400 })
  }
  if (text.length > 4000) {
    return NextResponse.json({ error: 'text слишком длинный' }, { status: 400 })
  }

  const offset = Math.max(0, body.offset ?? 0)
  const limit = Math.min(BROADCAST_CHUNK_SIZE, body.limit ?? BROADCAST_CHUNK_SIZE)

  const links = await db.link.findMany({
    skip: offset,
    take: limit,
    orderBy: { linkedAt: 'asc' },
  })

  const total = await db.link.count()
  let sent = 0
  let failed = 0

  for (const link of links) {
    try {
      await sendMessage({ chatId: Number(link.telegramId), text })
      sent++
    } catch (err) {
      console.warn(`broadcast: failed for chat ${link.telegramId}:`, err)
      failed++
    }
    // 50 мс между сообщениями = 20 msg/sec, в пределах rate-limit Telegram.
    await new Promise((r) => setTimeout(r, 50))
  }

  const nextOffset = offset + links.length < total ? offset + links.length : undefined

  return NextResponse.json({
    sent,
    failed,
    total,
    nextOffset,
  })
}
