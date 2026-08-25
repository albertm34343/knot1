import { useEffect, useState } from 'react'

function App() {
  const [user, setUser] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp

    if (!tg?.initData) {
      setLoading(false)
      return
    }

    fetch('https://24pair.ru/api/auth', {
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

  return (
    <div className="app">
      {loading ? (
        <div>Загрузка...</div>
      ) : user ? (
        <div>Привет, @{user}</div>
      ) : (
        <div>Knot</div>
      )}
    </div>
  )
}

export default App