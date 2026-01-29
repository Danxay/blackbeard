# Black Beard — Telegram Mini App

Приложение для записи в барбершоп через Telegram Mini App.

## Структура проекта

```
blackbeard/
├── frontend/       # Next.js 15 приложение
├── backend/        # FastAPI + SQLAlchemy
├── bot/            # Telegram бот на aiogram 3.x
└── docker-compose.yml
```

## Быстрый старт

### 1. Настройка окружения

```bash
cp .env.example .env
# Заполните BOT_TOKEN и WEBAPP_URL
```

### 2. Запуск для разработки

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

**Bot:**
```bash
cd bot
pip install -r requirements.txt
python -m main
```

### 3. Запуск через Docker

```bash
docker-compose up --build
```

## Настройка Telegram Bot

1. Создайте бота через [@BotFather](https://t.me/BotFather)
2. Получите токен и добавьте в `.env`
3. Настройте Menu Button: `/setmenubutton` → выберите бота → введите HTTPS URL приложения

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/services` | Список услуг |
| GET | `/api/barbers` | Список барберов |
| POST | `/api/bookings` | Создать запись |
| GET | `/api/bookings/user/{id}` | Записи пользователя |
| DELETE | `/api/bookings/{id}` | Отменить запись |
| POST | `/api/auth/validate` | Валидация initData |

## Технологии

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS, Zustand
- **Backend:** FastAPI, SQLAlchemy, SQLite
- **Bot:** aiogram 3.x, Python 3.11+
- **Deploy:** Docker, Docker Compose
