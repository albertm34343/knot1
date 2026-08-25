import { useEffect, useState } from 'react'

declare global {
  interface Window {
    Telegram?: any
  }
}

const sections = [
  { id: 'people', title: 'Люди' },
  { id: 'events', title: 'Ивенты' },
  { id: 'wishlists', title: 'Парные вишлисты' },
  { id: 'settings', title: 'Настройки' },
]

function App() {
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

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
          setAuthorized(true)
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="app">Загрузка...</div>
  }

  if (!authorized) {
    return <div className="app">Knot</div>
  }

  return (
    <div className="home">
      <h1 className="home__title">Knot</h1>
      <div className="home__grid">
        {sections.map((section) => (
          <button key={section.id} className="home__card" type="button">
            <span className="home__card-title">{section.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default App