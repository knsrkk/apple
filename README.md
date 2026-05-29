# Apple Выкуп Чита

Сайт на **Next.js** (App Router) для бизнеса по выкупу iPhone и техники Apple в городе **Чита**. Форма заявки отправляет уведомления в **Telegram** с данными клиента и ссылкой на загруженное фото.

## Стек

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui (кнопки, карточки, инпуты, селекты)
- React Hook Form + Zod
- Axios (клиентские запросы)

## Быстрый старт

```bash
npm install
cp .env.local.example .env.local
# Заполните TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

Сборка для продакшена:

```bash
npm run build
npm start
```

## Настройка Telegram

### 1. Создать бота

1. Откройте [@BotFather](https://t.me/BotFather) в Telegram.
2. Отправьте `/newbot`, следуйте инструкциям.
3. Скопируйте **токен** вида `123456789:ABCdef...` — это `TELEGRAM_BOT_TOKEN`.

### 2. Получить Chat ID

**Личные сообщения:**

1. Напишите боту любое сообщение (например, `/start`).
2. Откройте в браузере:
   ```
   https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates
   ```
3. Найдите `"chat":{"id":123456789}` — это `TELEGRAM_CHAT_ID`.

**Группа:**

1. Добавьте бота в группу.
2. Напишите в группе сообщение.
3. Снова откройте `getUpdates` — `chat.id` группы будет отрицательным (например, `-1001234567890`).

### 3. Переменные окружения

Создайте файл `.env.local` в корне проекта:

```env
TELEGRAM_BOT_TOKEN=ваш_токен
TELEGRAM_CHAT_ID=ваш_chat_id
NEXT_PUBLIC_SITE_URL=https://ваш-домен.vercel.app
```

`NEXT_PUBLIC_SITE_URL` нужен на продакшене, чтобы в Telegram приходила **полная ссылка** на фото (`https://.../uploads/...`).

## API

| Маршрут | Метод | Описание |
|---------|--------|----------|
| `/api/upload` | POST | `multipart/form-data`, поле `file` → `{ fileUrl: "/uploads/uuid.jpg" }` |
| `/api/send-telegram` | POST | JSON с полями формы + `photoUrl` → отправка в Telegram |

## Загрузка фото

Файлы сохраняются в `public/uploads/` с уникальным именем и отдаются как статика по URL `/uploads/...`.

> **Важно для Vercel:** файловая система на serverless **временная**. Загруженные фото пропадут после передеплоя или через некоторое время. Для продакшена рекомендуется **S3**, Cloudinary, Uploadthing или аналог. Текущее решение подходит для MVP и тестирования.

## Деплой на Vercel

1. Загрузите проект на GitHub.
2. Импортируйте репозиторий на [vercel.com](https://vercel.com).
3. В **Settings → Environment Variables** добавьте:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
   - `NEXT_PUBLIC_SITE_URL` = URL вашего деплоя (например `https://apple-chita.vercel.app`)
4. Deploy.

После деплоя проверьте форму: заявка должна прийти в Telegram с кликабельной ссылкой на фото.

## Настройка контактов

Отредактируйте `src/lib/constants.ts`:

- `PHONE_DISPLAY`, `PHONE_RAW` — ваш телефон
- `WHATSAPP_URL` — ссылка `https://wa.me/7XXXXXXXXXX`
- `TELEGRAM_USERNAME` — ваш @username для футера

## Структура проекта

```
src/
├── app/
│   ├── api/upload/route.ts
│   ├── api/send-telegram/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/          # shadcn-компоненты
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Benefits.tsx
│   ├── PriceCards.tsx
│   ├── Calculator.tsx
│   ├── SellForm.tsx
│   ├── Reviews.tsx
│   ├── MapSection.tsx
│   ├── Footer.tsx
│   └── FadeIn.tsx
└── lib/
    ├── constants.ts
    ├── validation.ts
    └── utils.ts
public/uploads/      # загруженные фото
```

## Лицензия

MIT — используйте свободно для своего бизнеса.
