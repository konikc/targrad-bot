/**
 * POST /api/internal/unlink-player
 *
 * Вызывается TargradCore при /tg unlink в игре. Удаляет привязку игрока.
 *
 * Тело:
 *   { playerUuid: string }
 * Ответ:
 *   200 { unlinked: true }      — была привязка, удалена
 *   200 { unlinked: false }      — привязки не было
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

  try {
    await db.link.delete({ where: { playerUuid } })
    return NextResponse.json({ unlinked: true })
  } catch {
    // Prisma бросает P2025 если запись не найдена.
    return NextResponse.json({ unlinked: false })
  }
}
