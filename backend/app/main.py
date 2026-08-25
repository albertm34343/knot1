import os

from fastapi import FastAPI

from app import models
from app.auth import verify_telegram_init_data
from app.database import Base, SessionLocal, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Knot API")


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/auth")
async def auth(init_data: str):
    db = SessionLocal()

    bot_token = os.getenv("TELEGRAM_BOT_TOKEN", "")
    user_data = verify_telegram_init_data(init_data, bot_token)

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