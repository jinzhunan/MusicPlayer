import React, { useState, useRef } from 'react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef();

  const songs = [
    { id: 1, title: 'Song 1', file: 'song1.mp3' },
    { id: 2, title: 'Song 2', file: 'song2.mp3' },
    { id: 3, title: 'Song 3', file: 'song3.mp3' },
  ];

  const playSong = (song) => {
    if (currentSong === song && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      audioRef.current.src = `/path/to/songs/${song.file}`;
      audioRef.current.play();
    }
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    audioRef.current.volume = vol;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleProgressChange = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    audioRef.current.currentTime = time;
  };

  return (
    <div>
      <h1>Music Player</h1>
      <ul>
        {songs.map((song) => (
          <li key={song.id} onClick={() => playSong(song)}>
            {song.title}
          </li>
        ))}
      </ul>
      {currentSong && (
        <div>
          <h3>Now Playing: {currentSong.title}</h3>
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            volume={volume}
            src=""
          />
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
          />
          <input
            type="range"
            min={0}
            max={audioRef.current && audioRef.current.duration}
            step={1}
            value={currentTime}
            onChange={handleProgressChange}
          />
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
