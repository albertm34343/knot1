import { useEffect, useState } from 'react'

declare global {
  interface Window {
    Telegram?: any
  }
}

function App() {
  const [user, setUser] = useState<string | null>(null)
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
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        init_data: tg.initData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.username) {
          setUser(data.username)
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

  if (user) {
    return <div className="app">Привет, @{user}</div>
  }

  return <div className="app">Knot</div>
}

export default App