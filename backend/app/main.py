import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app import models
from app.auth import verify_telegram_init_data
from app.database import Base, SessionLocal, engine
from app.people.router import router as people_router

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

app.include_router(people_router)


class AuthPayload(BaseModel):
    init_data: str


class DeleteAccountPayload(BaseModel):
    user_id: int


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


@app.post("/account/delete")
async def delete_account(payload: DeleteAccountPayload):
    db = SessionLocal()

    user = db.query(models.User).filter(models.User.id == payload.user_id).first()

    if not user:
        db.close()
        return {"status": "error", "detail": "user_not_found"}

    db.query(models.Friendship).filter(
        (models.Friendship.user_id == user.id) | (models.Friendship.friend_id == user.id)
    ).delete()

    db.query(models.FriendRequest).filter(
        (models.FriendRequest.sender_id == user.id) | (models.FriendRequest.receiver_id == user.id)
    ).delete()

    db.delete(user)
    db.commit()

    db.close()

    return {"status": "ok", "detail": "account_deleted"}