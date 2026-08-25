import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './SettingsScreen.css'

function SettingsScreen() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [deleted, setDeleted] = useState(false)

  const userId = Number(localStorage.getItem('user_id') || 0)

  const handleDeleteAccount = () => {
    fetch('https://24pair.ru/account/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok') {
          setDeleted(true)
        } else {
          setError('Ошибка удаления')
        }
      })
      .catch(() => {
        setError('Ошибка сети')
      })
  }

  if (deleted) {
    return (
      <div className="screen">
        <h1>Аккаунт удалён</h1>
        <p className="settings-deleted-text">
          Ваш аккаунт Knot удалён.
        </p>
      </div>
    )
  }

  return (
    <div className="screen">
      <button className="back-button" type="button" onClick={() => navigate('/')}>
        ←
      </button>
      <h1>Настройки</h1>

      <div className="settings-list">
        <button className="settings-item" type="button">
          Техподдержка
        </button>

        <button className="settings-item" type="button">
          Статистика
        </button>

        <button className="settings-item" type="button">
          Купить полный доступ
        </button>

        <button
          className="settings-item settings-item-danger"
          type="button"
          onClick={handleDeleteAccount}
        >
          Удалить аккаунт Knot
        </button>
      </div>

      {error && <div className="settings-error">{error}</div>}
    </div>
  )
}

export default SettingsScreen