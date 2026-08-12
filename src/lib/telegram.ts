/**
 * Telegram Bot API client.
 *
 * ВСЁ, ЧТО НАМ НУЖНО ОТ TELEGRAM:
 *   - getMe            — проверить токен при первом запуске
 *   - setWebhook       — указать Telegram, куда слать обновления
 *   - deleteWebhook     — отключить webhook (для перевыпуска токена или отката на long-polling)
 *   - getWebhookInfo    — проверить, что webhook активен
 *   - sendMessage       — отправить текстовое сообщение в chat_id
 *
 * ЧЕГО ЗДЕСЬ НЕТ. Никакой сложной логики клавиатур, inline-кнопок, media-загрузок.
 * Бот TargradCore — это текстовый бот: 2FA-коды, /start, /link, broadcast.
 * Если позже понадобятся кнопки — добавим sendPhoto / sendMessage с reply_markup,
 * но пока не нужно.
 *
 * ОШИБКИ. Telegram API возвращает JSON с полем ok:
 *   { ok: true, result: ... }     — успех
 *   { ok: false, error_code: 401, description: "Unauthorized" }  — провал
 * Этот модуль бросает TelegramApiError с описанием — вызывающий код решает,
 * что делать (повторить, залогировать, уведомить админа).
 */

const TELEGRAM_API_BASE = 'https://api.telegram.org/bot'

export class TelegramApiError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly telegramErrorCode: number | undefined,
    message: string,
  ) {
    super(message)
    this.name = 'TelegramApiError'
  }
}

export interface TelegramBotInfo {
  id: number
  is_bot: boolean
  first_name: string
  username: string
  can_join_groups?: boolean
  can_read_all_group_messages?: boolean
  supports_inline_queries?: boolean
}

export interface TelegramWebhookInfo {
  url: string
  has_custom_certificate: boolean
  pending_update_count: number
  last_error_date?: number
  last_error_message?: string
  max_connections?: number
  ip_address?: string
}

export interface SendMessageResult {
  message_id: number
  chat: { id: number; type: string }
  date: number
  text?: string
}

function getToken(): string {
  const token = process.env.TELEGRAM_BOT_TOKEN
  if (!token || token.trim() === '') {
    throw new TelegramApiError(500, undefined, 'TELEGRAM_BOT_TOKEN не задан в переменных окружения')
  }
  return token.trim()
}

async function callTelegramMethod<T>(
  method: string,
  body: Record<string, unknown>,
): Promise<T> {
  const token = getToken()
  const url = `${TELEGRAM_API_BASE}${token}/${method}`

  let response: Response
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      // Vercel serverless: таймаут 10 сек на fetch. Telegram обычно отвечает < 1 сек.
      // Если timeout-секция больше времени жизни функции, fetch всё равно прервётся.
      signal: AbortSignal.timeout(10_000),
    })
  } catch (err) {
    throw new TelegramApiError(
      0,
      undefined,
      `Сетевая ошибка при вызове ${method}: ${err instanceof Error ? err.message : String(err)}`,
    )
  }

  let json: unknown
  try {
    json = await response.json()
  } catch {
    throw new TelegramApiError(
      response.status,
      undefined,
      `${method}: Telegram вернул не-JSON (HTTP ${response.status})`,
    )
  }

  const payload = json as { ok: boolean; result?: T; error_code?: number; description?: string }

  if (!response.ok || !payload.ok) {
    throw new TelegramApiError(
      response.status,
      payload.error_code,
      `${method}: ${payload.description ?? 'неизвестная ошибка Telegram API'}`,
    )
  }

  return payload.result as T
}

/** Проверить токен и получить информацию о боте. */
export async function getBotInfo(): Promise<TelegramBotInfo> {
  return callTelegramMethod<TelegramBotInfo>('getMe', {})
}

/** Установить webhook: Telegram будет слать POST на `webhookUrl` при каждом обновлении. */
export async function setWebhook(params: {
  webhookUrl: string
  secretToken?: string
  maxConnections?: number
}): Promise<boolean> {
  return callTelegramMethod<boolean>('setWebhook', {
    url: params.webhookUrl,
    secret_token: params.secretToken,
    max_connections: params.maxConnections ?? 40,
    allowed_updates: ['message', 'edited_message'],
    drop_pending_updates: true,
  })
}

/** Отключить webhook. */
export async function deleteWebhook(): Promise<boolean> {
  return callTelegramMethod<boolean>('deleteWebhook', { drop_pending_updates: true })
}

/** Получить информацию о текущем webhook. */
export async function getWebhookInfo(): Promise<TelegramWebhookInfo> {
  return callTelegramMethod<TelegramWebhookInfo>('getWebhookInfo', {})
}

/** Отправить текстовое сообщение. */
export async function sendMessage(params: {
  chatId: number | string
  text: string
  parseMode?: 'HTML' | 'Markdown' | 'MarkdownV2'
  disableWebPagePreview?: boolean
}): Promise<SendMessageResult> {
  return callTelegramMethod<SendMessageResult>('sendMessage', {
    chat_id: params.chatId,
    text: params.text,
    parse_mode: params.parseMode ?? 'HTML',
    disable_web_page_preview: params.disableWebPagePreview ?? true,
  })
}
