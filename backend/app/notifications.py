import os
import requests


BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")


def send_friend_request_notification(sender_username: str, receiver_telegram_id: int) -> None:
    if not BOT_TOKEN or not receiver_telegram_id:
        return

    text = f"@{sender_username} хочет добавить тебя в друзья."

    requests.post(
        f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
        json={
            "chat_id": receiver_telegram_id,
            "text": text,
        },
    )