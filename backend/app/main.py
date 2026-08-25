import os

from fastapi import FastAPI
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app import models
from app.auth import verify_telegram_init_data
from app.database import Base, SessionLocal, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Knot API")


class AuthPayload(BaseModel):
    init_data: str


class InvitePayload(BaseModel):
    username: str


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/auth")
async def auth(payload: AuthPayload):
    db = SessionLocal()

    bot_token = os.getenv("TELEGRAM_BOT_TOKEN", "")
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

    user = db.query(models.User).filter(models.User.username == payload.username).first()

    if not user:
        db.close()
        return {"status": "error", "detail": "user_not_found"}

    db.close()

    return {"status": "ok", "user_id": user.id, "username": user.username}