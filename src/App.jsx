import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MusicList from './MusicList'
import CloudinaryTest from './CloudinaryTest'

import MusicPlayerBot from './MuaicPlayerBot'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>MusicPlaer</h1>
      <h3>programer: JASON</h3>
      <div className="card">

        <MusicList></MusicList>
        <CloudinaryTest></CloudinaryTest>
        
        <MusicPlayerBot></MusicPlayerBot>

      </div>
      <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        
    </>
  )
}

export default App
