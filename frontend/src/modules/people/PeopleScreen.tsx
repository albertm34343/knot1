import { useNavigate } from 'react-router-dom'

function PeopleScreen() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      <button className="back-button" type="button" onClick={() => navigate('/')}>
        ←
      </button>
      <h1>Люди</h1>
    </div>
  )
}

export default PeopleScreen