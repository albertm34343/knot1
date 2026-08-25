from sqlalchemy.orm import Session

from app import models
from app.notifications import send_friend_request_notification


def is_friend(db: Session, user_id: int, friend_id: int) -> bool:
    friendship = (
        db.query(models.Friendship)
        .filter(
            models.Friendship.user_id == user_id,
            models.Friendship.friend_id == friend_id,
        )
        .first()
    )
    return friendship is not None


def get_friends(db: Session, user_id: int):
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

    return result


def create_friend_request(db: Session, payload: dict):
    sender_id = payload.get("sender_id")
    username = payload.get("username", "").replace("@", "").strip()

    sender = db.query(models.User).filter(models.User.id == sender_id).first()
    receiver = db.query(models.User).filter(models.User.username == username).first()

    if not sender:
        return {"status": "error", "detail": "sender_not_found"}

    if not receiver:
        return {"status": "error", "detail": "user_not_found"}

    if sender.id == receiver.id:
        return {"status": "error", "detail": "cannot_invite_yourself"}

    if is_friend(db, sender.id, receiver.id):
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
        return {"status": "error", "detail": "request_already_exists"}

    request = models.FriendRequest(
        sender_id=sender.id,
        receiver_id=receiver.id,
        status="pending",
    )
    db.add(request)
    db.commit()
    db.refresh(request)

    send_friend_request_notification(sender.username, receiver.telegram_id)

    return {"status": "ok", "detail": "friend_request_created"}


def get_incoming_requests(db: Session, user_id: int):
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

    return result


def accept_friend_request(db: Session, payload: dict):
    request_id = payload.get("request_id")
    user_id = payload.get("user_id")

    request = (
        db.query(models.FriendRequest)
        .filter(models.FriendRequest.id == request_id)
        .first()
    )

    if not request or request.receiver_id != user_id:
        return {"status": "error", "detail": "request_not_found"}

    request.status = "accepted"
    db.add(request)

    if not is_friend(db, request.sender_id, request.receiver_id):
        db.add(models.Friendship(user_id=request.sender_id, friend_id=request.receiver_id))

    if not is_friend(db, request.receiver_id, request.sender_id):
        db.add(models.Friendship(user_id=request.receiver_id, friend_id=request.sender_id))

    db.commit()

    return {"status": "ok", "detail": "request_accepted"}


def decline_friend_request(db: Session, payload: dict):
    request_id = payload.get("request_id")
    user_id = payload.get("user_id")

    request = (
        db.query(models.FriendRequest)
        .filter(models.FriendRequest.id == request_id)
        .first()
    )

    if not request or request.receiver_id != user_id:
        return {"status": "error", "detail": "request_not_found"}

    request.status = "declined"
    db.add(request)
    db.commit()

    return {"status": "ok", "detail": "request_declined"}