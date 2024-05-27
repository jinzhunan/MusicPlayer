import { useState } from 'react'
import { DataProvider } from './DataContext';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MusicList from './MusicList'
import CloudinaryTest from './CloudinaryTest'

import MusicPlayerBot from './MuaicPlayerBot'
import MusicNavigate from './MusicNavigate';

function App() {
  const [count, setCount] = useState(0)

  return (
    <DataProvider>
      <div className='top'>
        <h1 >MusicPlaer</h1>
        <h3>programer: JASON</h3>
      </div>
      <div className="card">
        {/* <MusicNavigate></MusicNavigate> */}
        <MusicList></MusicList>
        <CloudinaryTest></CloudinaryTest>
        
        <MusicPlayerBot></MusicPlayerBot>

      </div>

        
    </DataProvider>
  )
}

export default App
