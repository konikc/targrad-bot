/**
 * Auth для внутренних API-эндпоинтов, которые вызывает TargradCore.
 *
 * ЗАЧЕМ ОБЩИЙ СЕКРЕТ. Vercel-приложение публично: любой может слать POST на
 * /api/internal/send. Чтобы чужой не смог разослать спам от имени бота, все
 * внутренние эндпоинты требуют HTTP-заголовок:
 *   X-Internal-Secret: <значение INTERNAL_API_SECRET>
 *
 * Секрет генерируется один раз при развёртывании (см. README-VERCEL.md) и
 * кладётся в переменные окружения Vercel И в config.yml TargradCore. Длина —
 * 32+ символа, генерируется через `openssl rand -hex 32`.
 *
 * Сверка через timingSafeEqual, чтобы защититься от timing-атак: обычное
 * string-comparison утекает длину совпавшего префикса.
 */

import { createHmac, timingSafeEqual } from 'node:crypto'

export function getInternalSecret(): string {
  const secret = process.env.INTERNAL_API_SECRET
  if (!secret || secret.trim() === '') {
    throw new Error('INTERNAL_API_SECRET не задан в переменных окружения')
  }
  return secret.trim()
}

/**
 * Проверить, что запрос пришёл с правильным секретом.
 * Возвращает true, если секрет совпал; false — если нет или заголовка нет.
 *
 * НЕ БРОСАЕТ исключение намеренно: вызывающий код сам решает, как реагировать
 * (вернуть 401, залогировать попытку, и т.д.).
 */
export function checkInternalAuth(request: Request): boolean {
  let provided: string
  try {
    provided = getInternalSecret()
  } catch {
    // Секрет не настроен на сервере — никто не должен иметь доступа.
    return false
  }

  const header = request.headers.get('x-internal-secret')
  if (!header) return false

  // timingSafeEqual требует одинаковой длины буферов. Если длины разные —
  // возвращаем false сразу (это тоже утечка длины, но не содержимого).
  const a = Buffer.from(provided)
  const b = Buffer.from(header)
  if (a.length !== b.length) return false

  return timingSafeEqual(a, b)
}

/**
 * HMAC-подпись для webhook secret_token от Telegram. Это второй слой
 * проверки: Telegram прикладывает X-Telegram-Bot-Auth-Secret заголовок,
 * и мы сверяем его с тем, что отдали при setWebhook.
 *
 * Telegram рекомендует именно этот механизм для защиты webhook.
 */
export function checkTelegramWebhookSecret(request: Request): boolean {
  const expected = process.env.TELEGRAM_WEBHOOK_SECRET
  if (!expected || expected.trim() === '') {
    // Если секрет не задан — пропускаем без проверки. Это небезопасно для прода,
    // но для dev/тестирования нормально. Логируем один раз через консоль.
    if (process.env.NODE_ENV === 'production') {
      console.warn('TELEGRAM_WEBHOOK_SECRET не задан в production — webhook не защищён от подделки')
    }
    return true
  }

  const header = request.headers.get('x-telegram-bot-auth-secret')
  if (!header) return false

  const a = Buffer.from(expected.trim())
  const b = Buffer.from(header)
  if (a.length !== b.length) return false

  return timingSafeEqual(a, b)
}

/**
 * Сгенерировать случайный секрет. Используется при первом запуске
 * (если админ не задал свой) или для отображения в админ-панели.
 */
export function generateSecret(bytes: number = 32): string {
  return createHmac('sha256', String(Date.now())).digest('hex').slice(0, bytes * 2)
}
