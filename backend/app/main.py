import os
import requests

from fastapi import FastAPI
from pydantic import BaseModel

from app import models
from app.auth import verify_telegram_init_data
from app.database import Base, SessionLocal, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Knot API")

BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")


class AuthPayload(BaseModel):
    init_data: str


class InvitePayload(BaseModel):
    username: str


def send_friend_request_to_bot(sender_username: str, receiver_user_id: int) -> None:
    if not BOT_TOKEN:
        return

    text = f"@{sender_username} хочет добавить тебя в друзья."

    requests.post(
        f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
        json={
            "chat_id": receiver_user_id,
            "text": text,
        },
    )


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/auth")
async def auth(payload: AuthPayload):
    db = SessionLocal()

    bot_token = BOT_TOKEN
    user_data = verify_telegram_init_data(payload.init_data, bot_token)

    username = user_data.get("username")
    if not username:
        return {"status": "error", "detail": "username_required"}

    user = db.query(models.User).filter(models.User.username == username).first()

    if not user:
        user = models.User(username=username)
        db.add(user)
        db.commit()
        db.refresh(user)

    db.close()

    return {"status": "ok", "user_id": user.id, "username": user.username}


@app.get("/friends")
async def friends():
    db = SessionLocal()

    users = db.query(models.User).all()

    db.close()

    return [{"id": user.id, "username": user.username} for user in users]


@app.post("/friends/invite")
async def invite(payload: InvitePayload):
    db = SessionLocal()

    receiver = db.query(models.User).filter(models.User.username == payload.username).first()

    if not receiver:
        db.close()
        return {"status": "error", "detail": "user_not_found"}

    # Здесь sender пока не определяем, нужен user_id текущего пользователя
    # Позже возьмём из initData, а сейчас возвращаем заглушку
    db.close()
    return {"status": "ok", "detail": "friend_request_created"} 