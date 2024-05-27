import React, { useState, useContext  } from 'react';
import ImageDisplay from './ImageDisplay'
import './MusicPlayer.css'; // 导入样式文件
import MusicPlayerBot from './MuaicPlayerBot';


function MusicNavigate() {

  const handleLanguage = (language) => {
    
  }


  return (

        <>
          <div className="image-container" >

            <div className="info">
              <button onClick={handleLanguage('english_anime')} className='bold-p'>english_anime</button>
              <button onClick={handleLanguage('japan')} className='bold-p'>japan</button>
              <button onClick={handleLanguage('english')} className='bold-p'>english</button>
              <button onClick={handleLanguage('chinese')} className='bold-p'>chinese</button>
              <button onClick={handleLanguage('no_lyrics')} className='bold-p'>no_lyrics</button>
              <button onClick={handleLanguage('forign')} className='bold-p'>forign</button>
            </div>
          </div>

        </>



  );
}

export default MusicNavigate;
