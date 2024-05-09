import React, { useState, useContext  } from 'react';
import ImageDisplay from './ImageDisplay'
import './MusicPlayer.css'; // 导入样式文件
import MusicPlayerBot from './MuaicPlayerBot';
import { DataContext } from './DataContext';


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
          <div className="image-container" >
            <div className="cover-image">
              <ImageDisplay  base64Image={coverImageUrl}  />
            </div>
            <div className="info">
              <h2>{title}</h2>
              <h3>{artist}</h3>
            </div>
            {/* <audio>
              <source src={audioUrl} />
            </audio> */}
            <button className="play-button" onClick={handleClick}>ADD</button>
            <MusicPlayerBot data={data} />
            <p>{data.title}</p>
          </div>

        </>



  );
}

export default MusicPlayer;
