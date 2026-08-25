import { useNavigate } from 'react-router-dom'

function WishlistsScreen() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      <button className="back-button" type="button" onClick={() => navigate('/')}>
        ←
      </button>
      <h1>Парные вишлисты</h1>
    </div>
  )
}

export default WishlistsScreen