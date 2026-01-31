# Black Beard — Telegram Mini App

Приложение для записи в барбершоп через Telegram Mini App.

## 📁 Структура

```
blackbeard/
├── frontend/     # Next.js 16, React 19
├── backend/      # FastAPI, SQLAlchemy
├── bot/          # aiogram 3.x
└── docker-compose.yml
```

## 🚀 Быстрый старт

### Docker (рекомендуется)

```bash
# 1. Скопируйте и заполните конфиг
cp .env.example .env

# 2. Укажите BOT_TOKEN и WEBAPP_URL в .env
#    (для продакшена также задайте NEXT_PUBLIC_API_URL и FRONTEND_URL)
#    API_URL для docker-compose не нужен — там используется внутренний адрес backend:${API_PORT:-8000}

# 3. Запуск
docker-compose up --build
```

База данных и тестовые данные создадутся автоматически.

### Локальная разработка

Все сервисы читают `.env` из корня репозитория (ничего копировать в `backend/` или `bot/` не нужно).

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python seed.py          # Только первый раз
uvicorn main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Bot:**
```bash
cd bot
pip install -r requirements.txt
python -m main
```

## ⚙️ Конфигурация (.env)

Скопируйте `.env.example` → `.env` и заполните минимум:

```ini
# Обязательные
BOT_TOKEN=             # Токен от @BotFather
WEBAPP_URL=            # HTTPS URL приложения
```

Остальные переменные с дефолтами для локалки и docker-compose:

```ini
# Frontend -> API
NEXT_PUBLIC_API_URL=http://localhost:8000

# CORS для API
FRONTEND_URL=http://localhost:3000

# Bot -> API (нужно для локального запуска бота)
API_URL=http://localhost:8000

# Порты (хостовые порты docker-compose)
FRONTEND_PORT=3000
BACKEND_PORT=8000

# Backend host/port (если запускать `python main.py`)
API_HOST=0.0.0.0
API_PORT=8000

# БД
DATABASE_URL=sqlite:///./data/blackbeard.db

# Seed demo data (отключить на проде)
SEED_DATA=true

# Напоминания о записи (за N минут)
REMINDER_ENABLED=true
REMINDER_MINUTES=60
REMINDER_POLL_SECONDS=60
APP_TIMEZONE=Europe/Moscow
```

## 🤖 Настройка Telegram Bot

1. Создайте бота: [@BotFather](https://t.me/BotFather)
2. Добавьте токен в `.env`
3. Menu Button: `/setmenubutton` → HTTPS URL

## 📡 API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/services` | Услуги |
| GET | `/api/barbers` | Барберы |
| POST | `/api/bookings` | Создать запись |
| GET | `/api/bookings/user/{id}` | История |
| DELETE | `/api/bookings/{id}` | Отменить |

## 🔔 Уведомления

При создании/отмене записи — автоматическое уведомление в Telegram.

## 📍 Локация

**Black Beard** — Санкт-Петербург, Невский просп. 28, м. Гостиный двор
