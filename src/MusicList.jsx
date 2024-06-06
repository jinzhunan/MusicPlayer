
// 'https://necessary-shrub-soursop.glitch.me/music'
// 'Rock', 'Pop', 'Jazz', 'Classical', 'Hip-Hop', 'Country', 'Electronic', 'R&B', 'Blues', 'Reggae'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Tabs,
    Tab,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Grid,
    CircularProgress // 添加的 CircularProgress 组件
} from '@mui/material';
import MusicPlayer from './MusicPlayer';
import './MusicPlayer.css';
import MenuIcon from '@mui/icons-material/Menu';


function MusicList() {

    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [musicList, setMusicList] = useState([]);
    const [language, setLanguage] = useState('all');
    const [loading, setLoading] = useState(false);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);

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
        setPageNumber(1); // 当 language 变化时，将 pageNumber 重置为 1
    }, [language]);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        const languages = ['all', 'english_anime', 'japan', 'english', 'chinese', 'no_lyrics', 'forign'];
        setLanguage(languages[newValue]);
    };

    const handleNextPage = () => {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
    };

    const handlePrevPage = () => {
        setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
    };

    const drawerList = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {['Home', 'About', 'Services', 'Contact'].map((text) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            MusicPlayer
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                    {drawerList}
                </Drawer>
                <div className="root">
            <div className="tabs-container">
            <div style={{ backgroundColor: '#f5f5f5', padding: '10px 0' }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    className="tabs"
                    centered={false}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {['all', 'english_anime', 'japan', 'english', 'chinese', 'no_lyrics', 'foreign'].map((category, index) => (
                    <Tab label={category} key={index} className="tab" />
                    ))}
                </Tabs>
                </div>
            </div>
        </div>
            </div>

            {loading && <CircularProgress sx={{ margin: '20px' }} />} {/* 显示加载状态 */}
            {!loading && (
                <Container sx={{ mt: 4 }}>
                    <Grid container spacing={1}>
                        {musicList.map((music) => (
                            <MusicPlayer key={music._id}
                                title={music.title}
                                artist={music.artist}
                                coverImageUrl={music.thumbnailUrl}
                                audioUrl={music.musicUrl}
                            />
                        ))}
                    </Grid>
                </Container>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handlePrevPage} disabled={pageNumber === 1}>
                    Pre Page
                </Button>
                <Typography variant="body1" sx={{ mx: 2 }}>{pageNumber}/{totalPages}</Typography>
                <Button variant="contained" color="primary" onClick={handleNextPage} disabled={pageNumber === totalPages}>
                    Next Page
                </Button>
            </Box>
        </>
    );
}

export default MusicList;
