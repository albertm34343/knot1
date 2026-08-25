import { useNavigate } from 'react-router-dom'

function SettingsScreen() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      <button className="back-button" type="button" onClick={() => navigate('/')}>
        ←
      </button>
      <h1>Настройки</h1>
    </div>
  )
}

export default SettingsScreen