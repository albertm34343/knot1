import { useNavigate } from 'react-router-dom'
import './SettingsScreen.css'

function SettingsScreen() {
  const navigate = useNavigate()

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

        <button className="settings-item settings-item-danger" type="button">
          Удалить аккаунт Knot
        </button>
      </div>
    </div>
  )
}

export default SettingsScreen