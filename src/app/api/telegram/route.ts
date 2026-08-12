/**
 * Telegram webhook handler.
 *
 * Telegram присылает сюда POST при каждом обновлении: /start, /link, /unlink,
 * /status, /help или произвольный текст (интерпретируется как код привязки).
 *
 * Vercel serverless: должны ответить за ~10 сек, иначе Telegram ретраит.
 * Все операции короткие: 1-2 записи в БД + 1 sendMessage.
 */

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendMessage, getBotInfo } from '@/lib/telegram'
import { checkTelegramWebhookSecret } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30

interface TelegramUpdate {
  update_id: number
  message?: {
    message_id: number
    chat: { id: number; type: string; first_name?: string; last_name?: string; username?: string }
    from?: { id: number; is_bot: boolean; first_name: string; username?: string }
    text?: string
    date: number
  }
  edited_message?: {
    message_id: number
    chat: { id: number; type: string }
    text?: string
  }
}

export async function POST(request: Request) {
  // 1. Проверка секретного заголовка Telegram (защита от поддельных webhook).
  if (!checkTelegramWebhookSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 2. Парсинг тела.
  let update: TelegramUpdate
  try {
    update = (await request.json()) as TelegramUpdate
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Логируем обновление для аудита.
  try {
    await db.webhookEvent.create({
      data: {
        updateId: BigInt(update.update_id),
        rawPayload: JSON.stringify(update).slice(0, 8000),
        eventType: update.message ? 'message' : update.edited_message ? 'edited_message' : 'unknown',
        fromChatId: update.message?.chat?.id ? BigInt(update.message.chat.id) : null,
        commandText: update.message?.text?.slice(0, 512) ?? null,
        receivedAt: BigInt(Date.now()),
      },
    })
  } catch (err) {
    console.warn('webhook log write failed:', err)
  }

  const message = update.message
  if (!message || !message.text) {
    return NextResponse.json({ ok: true, ignored: true })
  }

  const chatId = message.chat.id
  const text = message.text.trim()

  try {
    await handleMessage(chatId, message, text)
  } catch (err) {
    console.error('handleMessage failed:', err)
    // 200, иначе Telegram ретраит бесконечно.
  }

  return NextResponse.json({ ok: true })
}

async function handleMessage(
  chatId: number,
  message: NonNullable<TelegramUpdate['message']>,
  text: string,
) {
  const lower = text.toLowerCase()

  if (lower === '/start' || lower.startsWith('/start ')) {
    await sendWelcome(chatId, message.from?.first_name)
    return
  }
  if (lower === '/help' || lower === '/help@targradbot') {
    await sendHelp(chatId)
    return
  }
  if (lower === '/status') {
    await sendStatus(chatId)
    return
  }
  if (lower === '/unlink') {
    await handleUnlink(chatId)
    return
  }
  if (lower.startsWith('/link')) {
    const parts = text.split(/\s+/, 2)
    if (parts.length < 2 || !parts[1]) {
      await sendMessage({
        chatId,
        text: 'Укажите код: <code>/link ABCD-1234</code>\nКод выдаётся в игре командой <code>/tg link</code>.',
      })
      return
    }
    await tryConfirmLink(chatId, parts[1].toUpperCase().trim())
    return
  }

  // Не команда — возможно, это код привязки без префикса /link.
  const normalized = text.toUpperCase().trim().replace(/[^A-Z0-9-]/g, '')
  if (normalized.length >= 4 && normalized.length <= 12) {
    await tryConfirmLink(chatId, normalized)
    return
  }

  await sendMessage({
    chatId,
    text: 'Не понял сообщение. Введи <code>/link ABCD-1234</code> для привязки или <code>/help</code> для справки.',
  })
}

async function sendWelcome(chatId: number, firstName?: string) {
  const name = firstName ? `, ${firstName}` : ''
  const text = [
    `<b>TARGRAD</b> — бот 2FA и оповещений.`,
    ``,
    `Привет${name}! Здесь ты получишь:`,
    `• Коды подтверждения входа (2FA)`,
    `• Уведомления о наказаниях и событиях сервера`,
    ``,
    `Чтобы привязать аккаунт Minecraft:`,
    `1. В игре введи <code>/tg link</code> — получишь одноразовый код`,
    `2. Пришли сюда команду <code>/link ABCD-1234</code>`,
    ``,
    `Команды: /help, /status, /unlink`,
  ].join('\n')
  await sendMessage({ chatId, text })
}

async function sendHelp(chatId: number) {
  const text = [
    `<b>Команды бота TARGRAD:</b>`,
    ``,
    `<code>/link ABCD-1234</code> — привязать аккаунт Minecraft`,
    `<code>/status</code> — проверить статус привязки`,
    `<code>/unlink</code> — отвязать аккаунт (если привязан не тот)`,
    `<code>/help</code> — эта справка`,
    ``,
    `Можно прислать просто код (без /link) — бот поймёт.`,
  ].join('\n')
  await sendMessage({ chatId, text })
}

async function sendStatus(chatId: number) {
  const link = await db.link.findUnique({
    where: { telegramId: BigInt(chatId) },
  })
  if (!link) {
    await sendMessage({
      chatId,
      text: 'Этот Telegram не привязан ни к одному аккаунту Minecraft.\nВведи <code>/tg link</code> в игре, чтобы получить код привязки.',
    })
    return
  }
  await sendMessage({
    chatId,
    text: [
      `<b>Статус привязки:</b>`,
      `Игрок: <code>${link.playerName ?? link.playerUuid}</code>`,
      `Привязан: ${new Date(Number(link.linkedAt)).toISOString()}`,
      `Чтобы отвязать: <code>/tg unlink</code> в игре`,
    ].join('\n'),
  })
}

async function handleUnlink(chatId: number) {
  const link = await db.link.findUnique({
    where: { telegramId: BigInt(chatId) },
  })
  if (!link) {
    await sendMessage({ chatId, text: 'Этот Telegram не был привязан — нечего отвязывать.' })
    return
  }
  // В целях безопасности отвязка только из игры (/tg unlink), а не из Telegram.
  await sendMessage({
    chatId,
    text: [
      `<b>Отвязка аккаунта</b>`,
      ``,
      `Игрок: <code>${link.playerName ?? link.playerUuid}</code>`,
      ``,
      `Чтобы подтвердить отвязку, введи в игре команду <code>/tg unlink</code>.`,
      `Это требование безопасности — мы не знаем, кто именно пользуется этим Telegram.`,
    ].join('\n'),
  })
}

async function tryConfirmLink(chatId: number, code: string) {
  const pending = await db.pendingLink.findUnique({ where: { code } })

  if (!pending) {
    await sendMessage({
      chatId,
      text: 'Код недействителен. Получите новый командой <code>/tg link</code> в игре.',
    })
    return
  }

  if (pending.status !== 'pending') {
    await sendMessage({
      chatId,
      text: `Этот код уже использован или отменён (статус: ${pending.status}). Получите новый: <code>/tg link</code> в игре.`,
    })
    return
  }

  if (Date.now() > Number(pending.expiresAt)) {
    await db.pendingLink.update({ where: { code }, data: { status: 'expired' } })
    await sendMessage({
      chatId,
      text: 'Срок действия кода истёк. Получите новый: <code>/tg link</code> в игре.',
    })
    return
  }

  // Не даём привязать один Telegram к двум игрокам.
  const existing = await db.link.findUnique({ where: { telegramId: BigInt(chatId) } })
  if (existing && existing.playerUuid !== pending.playerUuid) {
    await sendMessage({
      chatId,
      text: [
        `Этот Telegram уже привязан к игроку <code>${existing.playerName ?? existing.playerUuid}</code>.`,
        `Чтобы переключить на нового игрока, сначала отвяжите старый аккаунт: <code>/tg unlink</code> в игре.`,
      ].join('\n'),
    })
    return
  }

  // Если у игрока была привязка к другому Telegram — снимаем её.
  if (existing) {
    await db.link.delete({ where: { playerUuid: pending.playerUuid } })
  }

  await db.link.create({
    data: {
      playerUuid: pending.playerUuid,
      telegramId: BigInt(chatId),
      playerName: pending.playerName,
      linkedAt: BigInt(Date.now()),
    },
  })

  await db.pendingLink.update({ where: { code }, data: { status: 'confirmed' } })

  await sendMessage({
    chatId,
    text: [
      `<b>Привязка выполнена!</b>`,
      ``,
      `Игрок Minecraft: <code>${pending.playerName ?? pending.playerUuid}</code>`,
      `Теперь сюда будут приходить:`,
      `• Коды подтверждения входа (2FA)`,
      `• Уведомления о банах/мутах/наградах`,
      ``,
      `Команды: /status, /help, /unlink`,
    ].join('\n'),
  })
}

// GET — healthcheck (для UptimeRobot и админ-панели).
export async function GET() {
  let botUsername: string | null = null
  try {
    const info = await getBotInfo()
    botUsername = info.username ?? null
  } catch {
    // Токен не настроен — это видно в админке.
  }
  return NextResponse.json({
    status: 'ok',
    bot: botUsername,
    timestamp: Date.now(),
  })
}
