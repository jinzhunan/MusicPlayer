import { useState } from 'react'
import { DataProvider } from './DataContext';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MusicList from './MusicList'
import CloudinaryTest from './CloudinaryTest'

import MusicPlayerBot from './MuaicPlayerBot'
import { AppBar, Toolbar, Typography, Button, IconButton, Tabs, Tab, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MusicNavigate from './MusicNavigate';
import MenuIcon from '@mui/icons-material/Menu';


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
