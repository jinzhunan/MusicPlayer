// MusicPlayer.js

import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from './DataContext';
import './MusicPlayer'
import ImageDisplay from './ImageDisplay'
import ImageHead from './assets/head.jpeg'
import ImagePlay from './assets/pause.png'
import ImagePause from './assets/play.webp'


const MusicPlayerBot = () => {
    const {musicSingle} = useContext(DataContext);

    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    
    const audioRef = React.createRef();

    

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        console.log(isPlaying)
    };
    // useEffect(() => {
    //     setIsPlaying(true);

    //   }, []);
    
    
    const handleProgressChange = (e) => {

        const audio = audioRef.current;
        let newProgress = parseInt(e.target.value);
        setProgress(newProgress);
        audio.currentTime = (newProgress / 100) * audio.duration;
      };

    useEffect(() => {
        const audio = audioRef.current;

        setIsPlaying(false)
        // audio.play()
      }, [musicSingle]);



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

  return (
    <div className="music-player-bot">
      <audio 
       
        ref={audioRef} 
        src={musicSingle === null ? '' : musicSingle.audioUrl} loop></audio>
      <div style={{ display: 'flex', justifyContent: 'center' }} className="controls-bot">
        <div className="cover-image-bot">
            <ImageDisplay  base64Image={musicSingle === null ? ImageHead : musicSingle.coverImageUrl}  />
        </div>
        <button style={{ display: 'grid', placeItems: 'center' }} onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
        <h3>{musicSingle === null ? 'Title' : musicSingle.title}</h3>
        <p className="width-bot">{musicSingle === null ? 'Artist' : musicSingle.artist}</p>

        {/* <button  onClick={togglePlay}>
          {isPlaying ? 
            <div className='cover-play-bot'>
              <img src={ImagePlay}/>
            </div>
          : <div className='cover-play-bot'>
              <img src={ImagePause}/>
            </div>}
        </button> */}

      </div>
        {/* <div className="progress-bot" style={{ width: `${progress}%` }}></div> */}
        <input
        type="range"
        value={isNaN(progress) ? 0 : progress}
        onChange={handleProgressChange}
        min="0"
        max="100"
        step="1"
        className="progress-bar-bot"
      />
    </div>
  );
};

export default MusicPlayerBot;
