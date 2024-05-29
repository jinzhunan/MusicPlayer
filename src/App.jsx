import { useState } from 'react'
import { DataProvider } from './DataContext';

import './App.css'
import MusicList from './MusicList'
import CloudinaryTest from './CloudinaryTest'

import MusicPlayerBot from './MuaicPlayerBot'



function App() {


  return (
    <DataProvider>

        <div >
          {/* <MusicNavigate></MusicNavigate> */}
          <MusicList></MusicList>
          <CloudinaryTest></CloudinaryTest>
          <MusicPlayerBot  />
        </div>
        
    </DataProvider>
  )
}

export default App
