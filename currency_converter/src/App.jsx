import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ExchangeRate from './page/ExchangeRate'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ExchangeRate/>
    </>
  )
}

export default App
