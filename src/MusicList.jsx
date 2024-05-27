
// 'https://necessary-shrub-soursop.glitch.me/music'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MusicPlayer from './MusicPlayer';
import './MusicPlayer.css';

function MusicList() {
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [musicList, setMusicList] = useState([]);
    const [language, setLanguage] = useState('all');
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        async function fetchMusicList() {
            try {
                setLoading(true); // 设置加载状态为 true
                const response = await axios.get(`https://necessary-shrub-soursop.glitch.me/music/${language}?pageNumber=${pageNumber}`);
                const { data } = response;
                const { musicList, totalPages } = data;
                setMusicList(musicList);
                setTotalPages(totalPages);
            } catch (error) {
                console.error('Failed to fetch music list:', error);
            } finally {
                setLoading(false); // 无论请求成功或失败，都将加载状态设置为 false
            }
        }

        fetchMusicList();
    }, [pageNumber, language]);

    useEffect(() => {
        // 当 language 变化时，将 pageNumber 重置为 1
        setPageNumber(1);
    }, [language]);

    const handleNextPage = () => {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
    };

    const handlePrevPage = () => {
        setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
    };

    const handleLanguage = (inputLanguage) => {
        setLanguage(inputLanguage);
    };

    return (
        <>
            <div className="image-containerNav" >
                <div className="info">
                    <button onClick={() => handleLanguage('all')} className='bold-p'>all</button>
                    <button onClick={() => handleLanguage('english_anime')} className='bold-p'>english_anime</button>
                    <button onClick={() => handleLanguage('japan')} className='bold-p'>japan</button>
                    <button onClick={() => handleLanguage('english')} className='bold-p'>english</button>
                    <button onClick={() => handleLanguage('chinese')} className='bold-p'>chinese</button>
                    <button onClick={() => handleLanguage('no_lyrics')} className='bold-p'>no_lyrics</button>
                    <button onClick={() => handleLanguage('forign')} className='bold-p'>forign</button>
                </div>
            </div>

            {/* 显示加载状态 */}
            {loading && <div>Loading...</div>}

            <div className="image-gallery">
                {musicList.map((music) => (
                    <MusicPlayer key={music._id}
                        title={music.title}
                        artist={music.artist}
                        coverImageUrl={music.thumbnailUrl}
                        audioUrl={music.musicUrl}
                    />
                ))}
            </div>
            <div>
                <button onClick={handlePrevPage} disabled={pageNumber === 1}>
                    Pre Page
                </button>
                <span>{pageNumber}/{totalPages}</span>
                <button onClick={handleNextPage} disabled={pageNumber === totalPages}>
                    Next Page
                </button>
            </div>
        </>
    );
}

export default MusicList;



// useEffect(() => {
//     const fetchMusicList = async () => {
//         try {
//             const response = await axios.get('https://necessary-shrub-soursop.glitch.me/music');
//             setMusicList(response.data);
//         } catch (error) {
//             console.error('Failed to fetch music list:', error);
//             alert(error);
//         }
//     };
//     fetchMusicList();
// }, []);

