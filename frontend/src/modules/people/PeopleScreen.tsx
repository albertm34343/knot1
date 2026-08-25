import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function PeopleScreen() {
  const navigate = useNavigate()
  const [userId, setUserId] = useState(0)
  const [inviteUsername, setInviteUsername] = useState('')
  const [result, setResult] = useState('')

  useEffect(() => {
    const storedUserId = Number(localStorage.getItem('user_id') || 0)
    setUserId(storedUserId)
  }, [])

  const handleInvite = () => {
    const username = inviteUsername.trim()

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
        setResult(JSON.stringify(data))
        setInviteUsername('')
      })
      .catch((err) => {
        setResult('Ошибка: ' + err.message)
      })
  }

  return (
    <div className="screen">
      <button className="back-button" type="button" onClick={() => navigate('/')}>
        ←
      </button>
      <h1>Друзья</h1>

      <div>userId: {userId}</div>

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

      {result && <div className="result">{result}</div>}
    </div>
  )
}

export default PeopleScreen