
import React, { useState, useContext  } from 'react';
import ImageDisplay from './ImageDisplay'
import './MusicPlayer.css'; // 导入样式文件
import MusicPlayerBot from './MuaicPlayerBot';
import { DataContext } from './DataContext';
import { AppBar, Box, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';


function MusicPlayer({ title, artist, coverImageUrl, audioUrl }) {
  const { setMusicSingle } = useContext(DataContext);

  const [data, setData] = useState([]);


  const handleClick = () => {
    const dataToSend  = {  title: title, 
                        artist: artist, 
                        coverImageUrl: coverImageUrl, 
                        audioUrl: audioUrl,
                        isPlay: true };
    setMusicSingle(dataToSend);
  };

  return (

        <>


          <Grid item key={title} xs={12} sm={6} md={4}>
            <Card>
            <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="140px"
                >
                  <CardMedia
                    component="img"
                    src={coverImageUrl}
                    sx={{ width: 140, height: 140, paddingTop:'15px', borderRadius: '50%' }}
                  />
                </Box>
              <CardContent>
                <Typography variant="h5" component="div">
                  {title} 
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {artist}
                </Typography>
                <Box mt={2} display="flex" justifyContent="center">
                  <Button onClick={handleClick} variant="contained" color="primary">
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

