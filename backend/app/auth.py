import hashlib
import hmac
import json
from urllib.parse import parse_qs

from fastapi import HTTPException


def verify_telegram_init_data(init_data: str, bot_token: str) -> dict:
    parsed = parse_qs(init_data)

    received_hash = parsed.pop("hash", [None])[0]
    if not received_hash:
        raise HTTPException(status_code=400, detail="Hash missing")

    data_check_string = "\n".join(
        f"{key}={value[0]}"
        for key, value in sorted(parsed.items())
    )

    secret_key = hmac.new(
        b"WebAppData",
        bot_token.encode(),
        hashlib.sha256,
    ).digest()

    calculated_hash = hmac.new(
        secret_key,
        data_check_string.encode(),
        hashlib.sha256,
    ).hexdigest()

    if calculated_hash != received_hash:
        raise HTTPException(status_code=403, detail="Invalid hash")

    user_data = json.loads(parsed.get("user", ["{}"])[0])

    return user_data