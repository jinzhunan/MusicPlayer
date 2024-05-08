import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MusicPlayer from './MusicPlayer';
import ImageDisplay from './ImageDisplay';


function MusicList() {
    const [musicList, setMusicList] = useState([]);



    useEffect(() => {
        const fetchMusicList = async () => {
            try {
                const response = await axios.get('https://necessary-shrub-soursop.glitch.me/music');
                setMusicList(response.data);
            } catch (error) {
                console.error('Failed to fetch music list:', error);
                alert('Failed to fetch music list:', {error});
            }
        };
        fetchMusicList();
    }, []);



    return (
        <div>
                {musicList.map((music) => (
                    <MusicPlayer key={music._id}
                        title={music.title}
                        artist={music.artist}
                        coverImageUrl={music.thumbnailUrl}
                        audioUrl={music.musicUrl}
                    />
                        // <a href={music.musicUrl} target="_blank" rel="noreferrer">{music.title}</a>
                        // <ImageDisplay  base64Image={music.thumbnailUrl}  />

                ))}
        </div>
    );
}

export default MusicList;
