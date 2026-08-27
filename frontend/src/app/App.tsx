import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import SplashScreen from '../modules/splash/SplashScreen'
import GiftPile from '../modules/home/GiftPile'
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
    <div className="home home-fade-in">
      <h1 className="home__title" aria-label="knot">
        <span>k</span>
        <span>n</span>
        <span>o</span>
        <span>t</span>
      </h1>

      <GiftPile />

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
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const tg = window.Telegram?.WebApp

    if (tg) {
      tg.ready()
      tg.expand()
    }

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
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 2700)

    const hideTimer = setTimeout(() => {
      setShowSplash(false)
    }, 2850)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (showSplash) {
    return (
      <div className={fadeOut ? 'splash-fade-out' : ''}>
        <SplashScreen />
      </div>
    )
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