import { useNavigate } from 'react-router-dom'

function EventsScreen() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      <button className="back-button" type="button" onClick={() => navigate('/')}>
        ←
      </button>
      <h1>Ивенты</h1>
    </div>
  )
}

export default EventsScreen