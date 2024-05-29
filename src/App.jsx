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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);


  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Home', 'About', 'Services', 'Contact'].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <DataProvider>
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MusicPlayer
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
      <AppBar position="static" color="default">
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          {['Rock', 'Pop', 'Jazz', 'Classical', 'Hip-Hop', 'Country', 'Electronic', 'R&B', 'Blues', 'Reggae'].map((category, index) => (
            <Tab label={category} key={index} />
          ))}
        </Tabs>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="div">
          {`Selected Category: ${['Rock', 'Pop', 'Jazz', 'Classical', 'Hip-Hop', 'Country', 'Electronic', 'R&B', 'Blues', 'Reggae'][tabValue]}`}
        </Typography>
        {/* Add content here based on the selected category */}
      </Box>
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
