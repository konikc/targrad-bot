/**
 * POST /api/internal/check-link
 *
 * Вызывается TargradCore при входе игрока, чтобы узнать, привязан ли он к Telegram
 * и какой chat_id использовать для отправки 2FA-кода.
 *
 * Тело:
 *   { playerUuid: string }
 * Ответ:
 *   200 { linked: true, telegramId: 123456789, playerName?: string }
 *   200 { linked: false }
 */

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { checkInternalAuth } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 10

export async function POST(request: Request) {
  if (!checkInternalAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { playerUuid?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const playerUuid = body.playerUuid?.trim()
  if (!playerUuid) {
    return NextResponse.json({ error: 'playerUuid обязателен' }, { status: 400 })
  }

  const link = await db.link.findUnique({ where: { playerUuid } })

  if (!link) {
    return NextResponse.json({ linked: false })
  }

  return NextResponse.json({
    linked: true,
    telegramId: Number(link.telegramId),
    playerName: link.playerName ?? null,
    linkedAt: Number(link.linkedAt),
  })
}
