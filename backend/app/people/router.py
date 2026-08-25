from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.people import service

router = APIRouter(prefix="/friends", tags=["friends"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("")
async def friends(user_id: int, db: Session = Depends(get_db)):
    return service.get_friends(db, user_id)


@router.post("/invite")
async def invite(payload: dict, db: Session = Depends(get_db)):
    return service.create_friend_request(db, payload)


@router.get("/requests/incoming")
async def incoming_requests(user_id: int, db: Session = Depends(get_db)):
    return service.get_incoming_requests(db, user_id)


@router.post("/requests/accept")
async def accept_request(payload: dict, db: Session = Depends(get_db)):
    return service.accept_friend_request(db, payload)


@router.post("/requests/decline")
async def decline_request(payload: dict, db: Session = Depends(get_db)):
    return service.decline_friend_request(db, payload)