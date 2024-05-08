// MusicPlayer.js

import React, { useState } from 'react';
import './MusicPlayerBot'

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-player">
      <div className="controls">
        <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
        <p>{isPlaying ? 'Playing' : 'Paused'}</p>
      </div>
      <div className="progress-bar">
        <div className="progress"></div>
      </div>
    </div>
  );
};

export default MusicPlayer;
