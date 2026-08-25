import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

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
  const [inviteUsername, setInviteUsername] = useState('')
  const [loading, setLoading] = useState(true)

  const userId = Number(localStorage.getItem('user_id') || 0)

  useEffect(() => {
    loadFriends()
    loadRequests()
  }, [])

  const loadFriends = () => {
    fetch('https://24pair.ru/friends')
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

  const handleInvite = () => {
    const username = inviteUsername.trim()
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
        alert(JSON.stringify(data))
        setInviteUsername('')
      })
      .catch(() => {})
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

  const handleDecline = () => {
    alert('Заявка отклонена')
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

      {requests.length > 0 && (
        <div className="requests-block">
          <h2>Входящие заявки</h2>
          {requests.map((request) => (
            <div key={request.request_id} className="request-item">
              <span>@{request.sender_username}</span>
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
                  onClick={handleDecline}
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
              @{friend.username}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default PeopleScreen