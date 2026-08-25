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
    sender_id: int
    username: str


class RequestActionPayload(BaseModel):
    request_id: int
    user_id: int


def send_friend_request_to_bot(sender_username: str, receiver_telegram_id: int) -> None:
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


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/auth")
async def auth(payload: AuthPayload):
    db = SessionLocal()

    user_data = verify_telegram_init_data(payload.init_data, BOT_TOKEN)

    username = user_data.get("username")
    telegram_id = user_data.get("id")

    if not username:
        return {"status": "error", "detail": "username_required"}

    user = db.query(models.User).filter(models.User.username == username).first()

    if not user:
        user = models.User(username=username, telegram_id=telegram_id)
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

    sender = db.query(models.User).filter(models.User.id == payload.sender_id).first()
    receiver = db.query(models.User).filter(models.User.username == payload.username).first()

    if not sender or not receiver:
        db.close()
        return {"status": "error", "detail": "user_not_found"}

    existing = (
        db.query(models.FriendRequest)
        .filter(
            models.FriendRequest.sender_id == sender.id,
            models.FriendRequest.receiver_id == receiver.id,
            models.FriendRequest.status == "pending",
        )
        .first()
    )

    if existing:
        db.close()
        return {"status": "error", "detail": "request_already_exists"}

    request = models.FriendRequest(
        sender_id=sender.id,
        receiver_id=receiver.id,
        status="pending",
    )
    db.add(request)
    db.commit()
    db.refresh(request)

    send_friend_request_to_bot(sender.username, receiver.telegram_id)

    db.close()

    return {"status": "ok", "detail": "friend_request_created"}


@app.get("/friends/requests/incoming")
async def incoming_requests(user_id: int):
    db = SessionLocal()

    requests_list = (
        db.query(models.FriendRequest)
        .filter(
            models.FriendRequest.receiver_id == user_id,
            models.FriendRequest.status == "pending",
        )
        .all()
    )

    result = []
    for request in requests_list:
        sender = db.query(models.User).filter(models.User.id == request.sender_id).first()
        result.append(
            {
                "request_id": request.id,
                "sender_username": sender.username if sender else "",
            }
        )

    db.close()

    return result


@app.post("/friends/requests/accept")
async def accept_request(payload: RequestActionPayload):
    db = SessionLocal()

    request = (
        db.query(models.FriendRequest)
        .filter(models.FriendRequest.id == payload.request_id)
        .first()
    )

    if not request or request.receiver_id != payload.user_id:
        db.close()
        return {"status": "error", "detail": "request_not_found"}

    request.status = "accepted"
    db.add(request)
    db.commit()

    db.close()

    return {"status": "ok", "detail": "request_accepted"}