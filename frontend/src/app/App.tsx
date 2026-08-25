import { useEffect, useState } from 'react'

declare global {
  interface Window {
    Telegram?: any
  }
}

function App() {
  const [info, setInfo] = useState('Загрузка...')

  useEffect(() => {
    const tg = window.Telegram?.WebApp

    if (!tg) {
      setInfo('Нет Telegram WebApp')
      return
    }

    if (!tg.initData) {
      setInfo('Нет initData')
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
        setInfo(JSON.stringify(data))
      })
      .catch((err) => {
        setInfo('Ошибка: ' + err.message)
      })
  }, [])

  return <div className="app">{info}</div>
}

export default App