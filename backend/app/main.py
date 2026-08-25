import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app import models
from app.auth import verify_telegram_init_data
from app.database import Base, SessionLocal, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Knot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")


class AuthPayload(BaseModel):
    init_data: str


class InvitePayload(BaseModel):
    sender_id: int
    username: str


class RequestActionPayload(BaseModel):
    request_id: int
    user_id: int


def is_friend(db, user_id: int, friend_id: int) -> bool:
    friendship = (
        db.query(models.Friendship)
        .filter(
            models.Friendship.user_id == user_id,
            models.Friendship.friend_id == friend_id,
        )
        .first()
    )
    return friendship is not None


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
async def friends(user_id: int):
    db = SessionLocal()

    friendships = (
        db.query(models.Friendship)
        .filter(models.Friendship.user_id == user_id)
        .all()
    )

    result = []
    for friendship in friendships:
        friend = db.query(models.User).filter(models.User.id == friendship.friend_id).first()
        if friend:
            result.append({"id": friend.id, "username": friend.username})

    db.close()

    return result


@app.post("/friends/invite")
async def invite(payload: InvitePayload):
    db = SessionLocal()

    sender = db.query(models.User).filter(models.User.id == payload.sender_id).first()
    receiver = db.query(models.User).filter(models.User.username == payload.username).first()

    if not sender:
        db.close()
        return {"status": "error", "detail": "sender_not_found"}

    if not receiver:
        db.close()
        return {"status": "error", "detail": "user_not_found"}

    if sender.id == receiver.id:
        db.close()
        return {"status": "error", "detail": "cannot_invite_yourself"}

    if is_friend(db, sender.id, receiver.id):
        db.close()
        return {"status": "error", "detail": "already_friends"}

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

    reverse = (
        db.query(models.FriendRequest)
        .filter(
            models.FriendRequest.sender_id == receiver.id,
            models.FriendRequest.receiver_id == sender.id,
            models.FriendRequest.status == "pending",
        )
        .first()
    )

    if reverse:
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

    if not is_friend(db, request.sender_id, request.receiver_id):
        db.add(models.Friendship(user_id=request.sender_id, friend_id=request.receiver_id))

    if not is_friend(db, request.receiver_id, request.sender_id):
        db.add(models.Friendship(user_id=request.receiver_id, friend_id=request.sender_id))

    db.commit()

    db.close()

    return {"status": "ok", "detail": "request_accepted"}


@app.post("/friends/requests/decline")
async def decline_request(payload: RequestActionPayload):
    db = SessionLocal()

    request = (
        db.query(models.FriendRequest)
        .filter(models.FriendRequest.id == payload.request_id)
        .first()
    )

    if not request or request.receiver_id != payload.user_id:
        db.close()
        return {"status": "error", "detail": "request_not_found"}

    request.status = "declined"
    db.add(request)
    db.commit()

    db.close()

    return {"status": "ok", "detail": "request_declined"}