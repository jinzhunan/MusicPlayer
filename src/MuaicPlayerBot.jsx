import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from './DataContext';
import { IconButton, Slider, Typography, Box } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ImageDisplay from './ImageDisplay';
import ImageHead from './assets/head.jpeg';

const MusicPlayerBot = () => {
  const { musicSingle } = useContext(DataContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = React.createRef();

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (event, newValue) => {
    const audio = audioRef.current;
    setProgress(newValue);
    audio.currentTime = (newValue / 100) * audio.duration;
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      const duration = audio.duration;
      const currentTime = audio.currentTime;
      const calculatedProgress = (currentTime / duration) * 100;
      setProgress(calculatedProgress);
    };

    audio.addEventListener('timeupdate', updateProgress);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    // Automatically play music when a new musicSingle is set
    if (musicSingle) {
      setIsPlaying(true);
    }

    // Reset progress to 0 when a new musicSingle is set
    setProgress(0);

    // Reset audio duration when a new musicSingle is set
    audio.load();

  }, [musicSingle]);

  return (
<div className="music-player-bot" style={{ position: 'fixed', bottom: -15, left: 0, right: 0, backgroundColor: '#f0f8ff', padding: '10px', boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.1)', zIndex: 9999 }}>
  <audio ref={audioRef} src={musicSingle ? musicSingle.audioUrl : ''} autoPlay loop />
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="controls-bot">
    <div className="cover-image-bot" style={{ width: '50px', height: '50px', overflow: 'hidden' }}>
      <ImageDisplay base64Image={musicSingle ? musicSingle.coverImageUrl : ImageHead} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </div>
    <IconButton
      onClick={togglePlay}
      sx={{
        display: 'grid',
        placeItems: 'center',
        color: '#003366',
        '&:hover': {
          backgroundColor: 'transparent',
        },
        '&:active': {
          backgroundColor: 'transparent',
        },
        '& svg': {
          fontSize: '1rem', // Decrease icon size
        },
      }}
    >
      {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
    </IconButton>
    <div style={{ marginLeft: '5px', marginRight: '5px' }}>
      <Typography variant="h6" style={{ fontSize: '0.75rem' }}>{musicSingle ? musicSingle.title : 'Title'}</Typography>
      <Typography variant="body1" className="width-bot" style={{ fontSize: '0.75rem' }}>{musicSingle ? musicSingle.artist : 'Artist'}</Typography>
    </div>
  </div>
  <Box sx={{ width: '80%', mx: 'auto', }}>
    <Slider
      value={isNaN(progress) ? 0 : progress}
      onChange={handleProgressChange}
      aria-labelledby="continuous-slider"
      min={0}
      max={100}
      valueLabelDisplay="auto"
    />
  </Box>
</div>
  );
};

export default MusicPlayerBot;
