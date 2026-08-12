/**
 * POST /api/internal/register-link
 *
 * Вызывается TargradCore, когда игрок в игре вводит /tg link.
 * Создаёт pending-link с одноразовым кодом. Игрок затем шлёт этот код боту
 * в Telegram, и webhook /api/telegram превращает pending-link в постоянную
 * привязку Link.
 *
 * Тело:
 *   { playerUuid: string, playerName?: string, expiryMinutes?: number }
 * Ответ:
 *   200 { code: "ABCD-1234", expiresAt: 1234567890 }
 *   400 { error: "..." }
 *   401 { error: "Unauthorized" }
 */

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { checkInternalAuth } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 10

const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // без I, O, 0, 1

function generateCode(): string {
  let s = ''
  const bytes = new Uint8Array(8)
  crypto.getRandomValues(bytes)
  for (let i = 0; i < 8; i++) {
    if (i === 4) s += '-'
    s += CODE_ALPHABET[bytes[i] % CODE_ALPHABET.length]
  }
  return s
}

export async function POST(request: Request) {
  if (!checkInternalAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { playerUuid?: string; playerName?: string; expiryMinutes?: number }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const playerUuid = body.playerUuid?.trim()
  if (!playerUuid || !/^[0-9a-fA-F-]{36}$/.test(playerUuid)) {
    return NextResponse.json({ error: 'playerUuid должен быть UUID' }, { status: 400 })
  }

  // Аннулируем старые pending-link этого игрока (если игрок запрашивает новый код,
  // не накапливаем мусор).
  await db.pendingLink.updateMany({
    where: { playerUuid, status: 'pending' },
    data: { status: 'revoked' },
  })

  // Генерируем код с проверкой уникальности (коллизия мала, но возможна).
  let code: string
  for (let attempt = 0; attempt < 5; attempt++) {
    code = generateCode()
    const exists = await db.pendingLink.findUnique({ where: { code } })
    if (!exists) break
  }
  // @ts-expect-error code всегда присваивается в цикле
  const finalCode: string = code!

  const expiryMinutes = Math.max(1, Math.min(60, body.expiryMinutes ?? 5))
  const now = Date.now()
  const expiresAt = BigInt(now + expiryMinutes * 60_000)

  await db.pendingLink.create({
    data: {
      code: finalCode,
      playerUuid,
      playerName: body.playerName ?? null,
      createdAt: BigInt(now),
      expiresAt,
      status: 'pending',
    },
  })

  return NextResponse.json({
    code: finalCode,
    expiresAt: Number(expiresAt),
  })
}
