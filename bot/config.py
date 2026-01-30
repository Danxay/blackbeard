import os
from pathlib import Path
from dotenv import load_dotenv

# Always load project root .env (works from any CWD)
_env_path = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(dotenv_path=_env_path)

BOT_TOKEN = os.getenv("BOT_TOKEN", "")
WEBAPP_URL = os.getenv("WEBAPP_URL", "https://localhost:3000")
API_URL = os.getenv("API_URL", "http://localhost:8000")
