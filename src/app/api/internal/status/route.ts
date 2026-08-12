/**
 * GET /api/internal/status
 *
 * Статус бота: сколько привязок, сколько pending-кодов, какой webhook URL.
 * Используется админ-панелью на главной странице и TargradCore для healthcheck.
 */

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { checkInternalAuth } from '@/lib/auth'
import { getWebhookInfo, getBotInfo } from '@/lib/telegram'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 10

export async function GET(request: Request) {
  // На этом эндпоинте не требуем авторизацию — это healthcheck.
  // Чувствительные данные (webhook URL, ошибки) отдаём только с авторизацией.
  const authorized = checkInternalAuth(request)

  const linkCount = await db.link.count()
  const pendingCount = await db.pendingLink.count({ where: { status: 'pending' } })
  const sentToday = await db.outboundMessage.count({
    where: { status: 'sent', createdAt: { gte: BigInt(Date.now() - 86_400_000) } },
  })

  const result: Record<string, unknown> = {
    status: 'ok',
    links: linkCount,
    pending: pendingCount,
    sentToday,
    timestamp: Date.now(),
  }

  if (authorized) {
    try {
      const info = await getBotInfo()
      const webhook = await getWebhookInfo()
      result.bot = info
      result.webhook = webhook
    } catch (err) {
      result.botError = err instanceof Error ? err.message : String(err)
    }
  }

  return NextResponse.json(result)
}
