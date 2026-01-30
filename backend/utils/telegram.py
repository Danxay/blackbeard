import hashlib
import hmac
import time
from urllib.parse import parse_qsl
from config import BOT_TOKEN
import json

def validate_init_data(init_data: str) -> dict | None:
    """
    Validate Telegram WebApp initData using HMAC-SHA256.
    Returns parsed data if valid, None otherwise.
    """
    try:
        # Use parse_qsl with keep_blank_values=True for robust parsing
        parsed_list = parse_qsl(init_data, keep_blank_values=True)
        parsed_dict = dict(parsed_list)
        
        # Extract hash
        received_hash = parsed_dict.get('hash')
        if not received_hash:
            return None
        
        # Build data-check-string (sorted, excluding hash)
        data_check_arr = []
        for key, value in sorted(parsed_dict.items()):
            if key != 'hash':
                data_check_arr.append(f"{key}={value}")
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
        auth_date_str = parsed_dict.get('auth_date', '0')
        auth_date = int(auth_date_str)
        if auth_date == 0:
            return None

        current_time = int(time.time())
        # Allow 24 hours (86400 seconds) validity
        if current_time - auth_date > 86400:
            return None

        # Parse user data
        user_data = parsed_dict.get('user', '{}')
        user = json.loads(user_data)
        
        return {
            'user': user,
            'auth_date': auth_date,
            'query_id': parsed_dict.get('query_id')
        }
    except Exception as e:
        print(f"Validation error: {e}")
        return None
