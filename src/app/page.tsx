'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'

interface StatusResponse {
  status: string
  links: number
  pending: number
  sentToday: number
  timestamp: number
  bot?: { username?: string; first_name?: string }
  botError?: string
  webhook?: {
    url: string
    pending_update_count: number
    last_error_date?: number
    last_error_message?: string
  }
}

export default function Home() {
  const [status, setStatus] = useState<StatusResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Форма настройки webhook.
  const [internalSecret, setInternalSecret] = useState('')
  const [webhookUrl, setWebhookUrl] = useState('')
  const [setupResult, setSetupResult] = useState<unknown>(null)
  const [setupLoading, setSetupLoading] = useState(false)

  async function fetchStatus() {
    try {
      const res = await fetch('/api/internal/status', {
        headers: internalSecret ? { 'x-internal-secret': internalSecret } : {},
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = (await res.json()) as StatusResponse
      setStatus(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
    const interval = setInterval(fetchStatus, 30_000) // обновление раз в 30 сек
    return () => clearInterval(interval)
  }, [internalSecret])

  async function setupWebhook() {
    setSetupLoading(true)
    try {
      const res = await fetch('/api/internal/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-internal-secret': internalSecret,
        },
        body: JSON.stringify({ webhookUrl }),
      })
      const data = await res.json()
      setSetupResult(data)
      if (res.ok) fetchStatus()
    } catch (err) {
      setSetupResult({ error: err instanceof Error ? err.message : String(err) })
    } finally {
      setSetupLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">TARGRAD Telegram Bot</h1>
            <p className="text-sm text-muted-foreground">
              Бот 2FA и оповещений для Minecraft-сервера targrad, работает на Vercel 24/7
            </p>
          </div>
          <Badge variant={status?.bot ? 'default' : 'destructive'}>
            {status?.bot ? `@${status.bot.username}` : 'бот не настроен'}
          </Badge>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Tabs defaultValue="status" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="status">Статус</TabsTrigger>
            <TabsTrigger value="setup">Настройка</TabsTrigger>
            <TabsTrigger value="deploy">Деплой на Vercel</TabsTrigger>
          </TabsList>

          {/* === СТАТУС === */}
          <TabsContent value="status" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Состояние бота</CardTitle>
                <CardDescription>
                  Без авторизационного секрета — только счётчики. С секретом — полный webhook URL и ошибки.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <MetricCard label="Привязок" value={status?.links ?? '—'} />
                  <MetricCard label="Ожидают кода" value={status?.pending ?? '—'} />
                  <MetricCard label="Отправлено сегодня" value={status?.sentToday ?? '—'} />
                  <MetricCard
                    label="Webhook"
                    value={status?.webhook?.url ? 'OK' : 'не задан'}
                  />
                </div>

                {status?.webhook?.last_error_message && (
                  <Alert variant="destructive">
                    <AlertTitle>Последняя ошибка webhook</AlertTitle>
                    <AlertDescription>
                      {status.webhook.last_error_message}
                      {status.webhook.last_error_date && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          {new Date(status.webhook.last_error_date * 1000).toLocaleString('ru-RU')}
                        </span>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                {error && (
                  <Alert variant="destructive">
                    <AlertTitle>Не удалось получить статус</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button variant="outline" onClick={fetchStatus} disabled={loading}>
                  {loading ? 'Загрузка...' : 'Обновить'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Авторизация админа</CardTitle>
                <CardDescription>
                  Введите INTERNAL_API_SECRET, чтобы увидеть webhook URL и ошибки.
                  Без него показаны только счётчики.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Label htmlFor="secret">INTERNAL_API_SECRET</Label>
                <Input
                  id="secret"
                  type="password"
                  placeholder="32+ символа, hex"
                  value={internalSecret}
                  onChange={(e) => setInternalSecret(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Секрет хранится только в localStorage этого браузера (точнее, в useState).
                  На сервер он не отправляется, кроме как в заголовке авторизации.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* === НАСТРОЙКА === */}
          <TabsContent value="setup" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>1. Установить webhook в Telegram</CardTitle>
                <CardDescription>
                  После деплоя на Vercel укажите сюда ваш URL вида
                  https://your-app.vercel.app/api/telegram
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <Input
                    id="webhookUrl"
                    placeholder="https://your-app.vercel.app/api/telegram"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="setupSecret">INTERNAL_API_SECRET</Label>
                  <Input
                    id="setupSecret"
                    type="password"
                    placeholder="Тот же, что в env Vercel"
                    value={internalSecret}
                    onChange={(e) => setInternalSecret(e.target.value)}
                  />
                </div>
                <Button onClick={setupWebhook} disabled={!webhookUrl || !internalSecret || setupLoading}>
                  {setupLoading ? 'Установка...' : 'Установить webhook'}
                </Button>

                {setupResult && (
                  <div className="space-y-2">
                    <Separator />
                    <Label>Результат</Label>
                    <ScrollArea className="h-72 rounded-md border p-4">
                      <pre className="text-xs">
                        {JSON.stringify(setupResult, null, 2)}
                      </pre>
                    </ScrollArea>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Проверить привязку из игры</CardTitle>
                <CardDescription>
                  После настройки webhook игроки могут привязывать аккаунты.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>В игре: <code className="bg-muted px-1 rounded">/tg link</code> — выдаёт код вида ABCD-1234</li>
                  <li>В Telegram боту: <code className="bg-muted px-1 rounded">/link ABCD-1234</code></li>
                  <li>Бот отвечает «Привязка выполнена» — игрок теперь привязан</li>
                  <li>При следующем входе игрок получит код 2FA в Telegram</li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>

          {/* === ДЕПЛОЙ === */}
          <TabsContent value="deploy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Деплой на Vercel</CardTitle>
                <CardDescription>
                  Пошаговая инструкция. Подробная версия — в файле README-VERCEL.md в пакете.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <ol className="list-decimal list-inside space-y-3">
                  <li>
                    <strong>Перевыпустите токен бота</strong> через @BotFather:
                    команда <code>/revoke</code>, затем <code>/token</code>.
                    Старый токен, который вы случайно опубликовали в чате, скомпрометирован.
                  </li>
                  <li>
                    <strong>Создайте GitHub-репозиторий</strong> и запушьте содержимое
                    папки <code>targrad-wipe-package/</code>.
                  </li>
                  <li>
                    <strong>Зайдите на vercel.com</strong> → New Project → Import из GitHub.
                  </li>
                  <li>
                    <strong>Добавьте переменные окружения</strong> в Vercel:
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-xs font-mono">
                      <li>TELEGRAM_BOT_TOKEN=новый_токен_от_botfather</li>
                      <li>INTERNAL_API_SECRET=сгенерированный_секрет_32_символа</li>
                      <li>TELEGRAM_WEBHOOK_SECRET=сгенерированный_секрет_32_символа</li>
                      <li>POSTGRES_URL=получите_после_создания_БД (для прода)</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Deploy.</strong> Vercel выдаст URL вида
                    <code className="mx-1 bg-muted px-1 rounded">your-app.vercel.app</code>.
                  </li>
                  <li>
                    <strong>Включите Vercel Postgres</strong> (Storage → New → Postgres, бесплатно до 256 МБ).
                    Скопируйте POSTGRES_URL в env. Без этого данные не сохранятся между cold starts.
                  </li>
                  <li>
                    <strong>Зайдите на эту страницу после деплоя</strong> → вкладка «Настройка» →
                    введите URL <code>https://your-app.vercel.app/api/telegram</code> →
                    нажмите «Установить webhook».
                  </li>
                  <li>
                    <strong>Проверьте в Telegram</strong>: отправьте боту <code>/start</code>.
                    Он должен ответить welcome-сообщением.
                  </li>
                  <li>
                    <strong>В TargradCore config.yml</strong> укажите URL приложения и INTERNAL_API_SECRET:
                    <pre className="bg-muted p-2 rounded text-xs mt-1">{`vercel:
  bot-url: "https://your-app.vercel.app"
  internal-secret: "тот_же_секрет_что_в_env" `}</pre>
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ограничения бесплатного тарифа Vercel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Serverless functions</strong>: 100 ГБ-часов в месяц (хватит на ~7000 входящих сообщений).</li>
                  <li><strong>Время выполнения</strong>: максимум 60 сек на запрос (для нас 30 сек — `maxDuration`).</li>
                  <li><strong>Vercel Postgres</strong>: 256 МБ бесплатно — хватит на ~50 000 привязок.</li>
                  <li><strong>Cold start</strong>: первая функция после простоя идёт ~1-2 сек дольше. Telegram ретраит при timeout, так что это не страшно.</li>
                  <li><strong>Не лимит</strong>: webhook работает 24/7 — Vercel не «усыпляет» функции, они вызываются по запросу.</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-4 text-xs text-muted-foreground text-center">
          TargradCore Telegram Bridge · работает на Vercel · 24/7
        </div>
      </footer>
    </div>
  )
}

function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border p-4 bg-card text-card-foreground">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  )
}
