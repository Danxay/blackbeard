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

# 3. Запуск
docker-compose up --build
```

База данных и тестовые данные создадутся автоматически.

### Локальная разработка

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

```ini
# Telegram
BOT_TOKEN=             # Токен от @BotFather
WEBAPP_URL=            # HTTPS URL приложения

# Порты (измените если заняты)
FRONTEND_PORT=3000
BACKEND_PORT=8000

# БД
DATABASE_URL=sqlite:///./data/blackbeard.db
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
