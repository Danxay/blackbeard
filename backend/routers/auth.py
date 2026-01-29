from fastapi import APIRouter, HTTPException
from schemas import TelegramAuthData
from utils.telegram import validate_init_data

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/validate")
def validate_telegram_data(data: TelegramAuthData):
    """Validate Telegram WebApp initData"""
    result = validate_init_data(data.init_data)
    
    if result is None:
        raise HTTPException(status_code=401, detail="Invalid init data")
    
    return {
        "valid": True,
        "user": result.get("user"),
        "auth_date": result.get("auth_date")
    }
