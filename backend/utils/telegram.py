import hashlib
import hmac
import time
from urllib.parse import parse_qs
from config import BOT_TOKEN

def validate_init_data(init_data: str) -> dict | None:
    """
    Validate Telegram WebApp initData using HMAC-SHA256.
    Returns parsed data if valid, None otherwise.
    """
    try:
        parsed = parse_qs(init_data)
        
        # Extract hash
        received_hash = parsed.get('hash', [''])[0]
        if not received_hash:
            return None
        
        # Build data-check-string (sorted, excluding hash)
        data_check_arr = []
        for key, value in sorted(parsed.items()):
            if key != 'hash':
                data_check_arr.append(f"{key}={value[0]}")
        data_check_string = '\n'.join(data_check_arr)
        
        # Calculate secret key: HMAC_SHA256(bot_token, "WebAppData")
        secret_key = hmac.new(
            b"WebAppData",
            BOT_TOKEN.encode(),
            hashlib.sha256
        ).digest()
        
        # Calculate hash
        calculated_hash = hmac.new(
            secret_key,
            data_check_string.encode(),
            hashlib.sha256
        ).hexdigest()
        
        if calculated_hash != received_hash:
            return None
        
        # Check auth_date (prevent replay attacks)
        auth_date = int(parsed.get('auth_date', ['0'])[0])
        if auth_date == 0:
            return None

        current_time = int(time.time())
        # Allow 24 hours (86400 seconds) validity
        if current_time - auth_date > 86400:
            return None

        # Parse user data
        import json
        user_data = parsed.get('user', ['{}'])[0]
        user = json.loads(user_data)
        
        return {
            'user': user,
            'auth_date': int(parsed.get('auth_date', ['0'])[0]),
            'query_id': parsed.get('query_id', [None])[0]
        }
    except Exception as e:
        print(f"Validation error: {e}")
        return None
