import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface Friend {
  id: number
  username: string
}

function PeopleScreen() {
  const navigate = useNavigate()
  const [friends, setFriends] = useState<Friend[]>([])
  const [inviteUsername, setInviteUsername] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
  }, [])

  const handleInvite = () => {
    const username = inviteUsername.trim()
    if (!username) return

    fetch('https://24pair.ru/friends/invite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(JSON.stringify(data))
      })
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

      <div className="friends-list">
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