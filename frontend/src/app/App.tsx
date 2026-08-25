import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import SplashScreen from '../modules/splash/SplashScreen'
import PeopleScreen from '../modules/people/PeopleScreen'
import EventsScreen from '../modules/events/EventsScreen'
import WishlistsScreen from '../modules/wishlists/WishlistsScreen'
import SettingsScreen from '../modules/settings/SettingsScreen'

declare global {
  interface Window {
    Telegram?: any
  }
}

const sections = [
  { id: 'people', title: 'Друзья', path: '/people' },
  { id: 'events', title: 'Ивенты', path: '/events' },
  { id: 'wishlists', title: 'Парные вишлисты', path: '/wishlists' },
  { id: 'settings', title: 'Настройки', path: '/settings' },
]

function HomeScreen() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <h1 className="home__title" aria-label="knot">
        k
        <span style={{ position: 'relative', top: '-0.04em' }}>n</span>
        <span style={{ position: 'relative', top: '0.02em' }}>o</span>
        <span style={{ position: 'relative', top: '-0.03em' }}>t</span>
      </h1>

      <div className="home__grid">
        {sections.map((section) => (
          <button
            key={section.id}
            className="home__card"
            type="button"
            onClick={() => navigate(section.path)}
          >
            {section.title}
          </button>
        ))}
      </div>
    </div>
  )
}

function App() {
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const tg = window.Telegram?.WebApp

    if (!tg?.initData) {
      setLoading(false)
      return
    }

    fetch('https://24pair.ru/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        init_data: tg.initData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok') {
          localStorage.setItem('user_id', String(data.user_id))
          setAuthorized(true)
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return <SplashScreen />
  }

  if (loading) {
    return <div className="app">Загрузка...</div>
  }

  if (!authorized) {
    return <div className="app">Knot</div>
  }

  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/people" element={<PeopleScreen />} />
      <Route path="/events" element={<EventsScreen />} />
      <Route path="/wishlists" element={<WishlistsScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />
    </Routes>
  )
}

export default App