import React, { useState } from 'react';
import ImageDisplay from './ImageDisplay'
import './MusicPlayer.css'; // 导入样式文件


function MusicPlayer({ title, artist, coverImageUrl, audioUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-player">
      <div className="cover-image">
        <ImageDisplay  base64Image={coverImageUrl}  />
      </div>
      <div className="info">
        <h2>{title}</h2>
        <h3>{artist}</h3>
      </div>
      <audio controls={isPlaying}>
        <source src={audioUrl} />
      </audio>
      <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
    </div>

  );
}

export default MusicPlayer;
