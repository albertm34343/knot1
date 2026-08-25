import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './PeopleScreen.css'

interface Friend {
  id: number
  username: string
}

interface FriendRequestItem {
  request_id: number
  sender_username: string
}

function PeopleScreen() {
  const navigate = useNavigate()
  const [friends, setFriends] = useState<Friend[]>([])
  const [requests, setRequests] = useState<FriendRequestItem[]>([])
  const [inviteUsername, setInviteUsername] = useState('@')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const userId = Number(localStorage.getItem('user_id') || 0)

  const loadFriends = () => {
    fetch(`https://24pair.ru/friends?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFriends(data)
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false)
      })
  }

  const loadRequests = () => {
    fetch(`https://24pair.ru/friends/requests/incoming?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRequests(data)
        }
      })
      .catch(() => {})
  }

  useEffect(() => {
    loadFriends()
    loadRequests()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      loadRequests()
      loadFriends()
    }, 3000)

    return () => clearInterval(interval)
  }, [userId])

  const handleInvite = () => {
    const username = inviteUsername.trim().replace('@', '')
    if (!username || !userId) return

    fetch('https://24pair.ru/friends/invite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender_id: userId,
        username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'error') {
          if (data.detail === 'cannot_invite_yourself') {
            setError('Нельзя пригласить самого себя')
          } else if (data.detail === 'request_already_sent') {
            setError(`Вы уже отправили заявку @${data.username}`)
          } else if (data.detail === 'request_received') {
            setError(`@${data.username} уже отправил вам заявку в друзья`)
          } else if (data.detail === 'already_friends') {
            setError(`@${data.username} уже в друзьях`)
          } else if (data.detail === 'user_not_found') {
            setError('Пользователь не авторизован')
          } else {
            setError('Ошибка')
          }
        } else {
          setError('')
          setInviteUsername('@')
          loadRequests()
        }
      })
      .catch(() => {
        setError('Ошибка сети')
      })
  }

  const handleAccept = (requestId: number) => {
    fetch('https://24pair.ru/friends/requests/accept', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        request_id: requestId,
        user_id: userId,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        loadRequests()
        loadFriends()
      })
      .catch(() => {})
  }

  const handleDecline = (requestId: number) => {
    fetch('https://24pair.ru/friends/requests/decline', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        request_id: requestId,
        user_id: userId,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        loadRequests()
      })
      .catch(() => {})
  }

  const handleRemoveFriend = (friendId: number) => {
    fetch('https://24pair.ru/friends/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        friend_id: friendId,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        loadFriends()
      })
      .catch(() => {})
  }

  const handleAddToWishlist = (friendId: number) => {
    fetch('https://24pair.ru/friends/add-to-wishlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        friend_id: friendId,
      }),
    })
      .then((res) => res.json())
      .then(() => {})
      .catch(() => {})
  }

  const handleAddToEvent = (friendId: number) => {
    fetch('https://24pair.ru/friends/add-to-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        friend_id: friendId,
      }),
    })
      .then((res) => res.json())
      .then(() => {})
      .catch(() => {})
  }

  return (
    <div className="screen">
      <button className="back-button" type="button" onClick={() => navigate('/')}>
        ←
      </button>
      <h1>Друзья</h1>

      <div className="invite-form">
        <input
          className="invite-input"
          placeholder="Username друга"
          value={inviteUsername}
          onChange={(e) => setInviteUsername(e.target.value)}
        />
        <button className="invite-button" type="button" onClick={handleInvite}>
          Пригласить
        </button>
      </div>

      {error && <div className="error-text">{error}</div>}

      {requests.length > 0 && (
        <div className="requests-block">
          <h2>Входящие заявки</h2>
          {requests.map((request) => (
            <div key={request.request_id} className="request-item">
              <a
                className="username-link"
                href={`https://t.me/${request.sender_username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{request.sender_username}
              </a>
              <div className="request-actions">
                <button
                  className="request-accept"
                  type="button"
                  onClick={() => handleAccept(request.request_id)}
                >
                  Принять
                </button>
                <button
                  className="request-decline"
                  type="button"
                  onClick={() => handleDecline(request.request_id)}
                >
                  Отклонить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="friends-list">
        <h2>Мои друзья</h2>
        {loading ? (
          <div>Загрузка...</div>
        ) : friends.length === 0 ? (
          <div className="empty">Пока нет друзей</div>
        ) : (
          friends.map((friend) => (
            <div key={friend.id} className="friend-item">
              <a
                className="username-link"
                href={`https://t.me/${friend.username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{friend.username}
              </a>
              <div className="friend-actions">
                <button
                  className="friend-action-button"
                  type="button"
                  onClick={() => handleAddToWishlist(friend.id)}
                >
                  Вишлист
                </button>
                <button
                  className="friend-action-button"
                  type="button"
                  onClick={() => handleAddToEvent(friend.id)}
                >
                  Ивент
                </button>
                <button
                  className="friend-remove"
                  type="button"
                  onClick={() => handleRemoveFriend(friend.id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default PeopleScreen