import React, { useState, useContext } from 'react';
import ImageDisplay from './ImageDisplay';
import './MusicPlayer.css'; // 导入样式文件
import { DataContext } from './DataContext';
import { AppBar, Box, Typography, Button, Grid, Card, CardContent, CardMedia, useMediaQuery } from '@mui/material';

function MusicPlayer({ title, artist, coverImageUrl, audioUrl }) {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const { setMusicSingle } = useContext(DataContext);

  const [data, setData] = useState([]);

  const handleClick = () => {
    const dataToSend = { 
      title: title, 
      artist: artist, 
      coverImageUrl: coverImageUrl, 
      audioUrl: audioUrl,
      isPlay: true 
    };
    setMusicSingle(dataToSend);
  };

  return (
    <>
<Grid item key={title} xs={12} sm={6} md={4}>
      <Card sx={{ height: isSmallScreen ? 80 : '100%', display: 'flex', flexDirection: isSmallScreen ? 'row' : 'column' }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={isSmallScreen ? '100%' : '140px'}
          sx={{ flexShrink: 0, marginLeft: isSmallScreen ? '5px' : 0 }}
        >
          <CardMedia
            component="img"
            src={coverImageUrl}
            sx={{
              width: isSmallScreen ? 50 : 150,
              height: isSmallScreen ? 50 : 150,
              borderRadius: '50%'
            }}
          />
        </Box>
        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: isSmallScreen ? 'row' : 'column',
            justifyContent: isSmallScreen ? 'space-between' : 'space-between',
            alignItems: isSmallScreen ? 'center' : 'stretch',
            padding: isSmallScreen ? '8px' : '16px'
          }}
        >
          <Box
            sx={{
              flexGrow: isSmallScreen ? 1 : 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginLeft: isSmallScreen ? '5px' : 0
            }}
          >
            <Typography
              variant={isSmallScreen ? 'body1' : 'h4'}
              component="div"
              sx={{ fontWeight: 'bold', textAlign: isSmallScreen ? 'left' : 'center', marginLeft: '5px' }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: isSmallScreen ? 'left' : 'center', fontWeight: 'bold', marginLeft: '5px' }}
            >
              {artist}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent={isSmallScreen ? 'flex-end' : 'center'}
            sx={{ marginTop: '10px' }}
          >
            <Button onClick={handleClick} variant="contained" color="primary" size={isSmallScreen ? 'small' : 'medium'}>
              Play
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
    </>
  );
}

export default MusicPlayer;
