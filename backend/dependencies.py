from fastapi import Header, HTTPException
from typing import Annotated
from utils.telegram import validate_init_data

async def get_current_user(authorization: Annotated[str | None, Header()] = None):
    """
    Validate Telegram WebApp initData from Authorization header.
    Format: tma <initData>
    """
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header")

    if not authorization.startswith("tma "):
        raise HTTPException(status_code=401, detail="Invalid Authorization header format. Expected 'tma <initData>'")

    init_data = authorization[4:] # Strip "tma "

    result = validate_init_data(init_data)
    if not result:
        raise HTTPException(status_code=401, detail="Invalid initData")

    return result['user']
