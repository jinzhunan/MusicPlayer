import React, { useState } from 'react';
import axios from 'axios';
import jsmediatags from 'jsmediatags/dist/jsmediatags.min';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, Input } from '@mui/material';

function MusicUpload() {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        jsmediatags.read(selectedFile, {
          onSuccess: function(tag) {
              const picture = tag.tags.picture;
              if (picture) {
                  const base64String = btoa(
                      new Uint8Array(picture.data).reduce(
                          (data, byte) => data + String.fromCharCode(byte),
                          ''
                      )
                  );
                  const imageUrl = `data:${picture.format};base64,${base64String}`;
                  setThumbnailUrl(imageUrl);
              }
          },
          onError: function(error) {
              console.error(':(', error.type, error.info);
          }
      });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'gkk1fiep');
        formData.append('resource_type', 'auto');
        formData.append('public_id', title);
        formData.append('artist', artist);
        formData.append('thumbnailUrl', thumbnailUrl);
        formData.append('language', selectedOption);

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dhhuemjhf/raw/upload', formData);
            console.log('Upload successful:', response.data);

            await axios.post('https://necessary-shrub-soursop.glitch.me/upload', {
                musicUrl: response.data.secure_url,
                title: title,
                artist,
                thumbnailUrl,
                language: selectedOption
            });

            alert('Upload successful');
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
            <Typography variant="h5" align="center">Music Upload</Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel htmlFor="file"></InputLabel>
                    <Input type="file" id="file" onChange={handleFileChange} />
                </FormControl>
                <TextField
                    fullWidth
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    fullWidth
                    label="Artist"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                {thumbnailUrl && <img style={{ width: '100px', height: '100px', marginBottom: '10px' }} src={thumbnailUrl} alt="Thumbnail" />}
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel id="language-label">Language</InputLabel>
                    <Select
                        labelId="language-label"
                        id="language"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        <MenuItem value="">Select an option</MenuItem>
                        <MenuItem value="english_anime">english_anime</MenuItem>
                        <MenuItem value="japan">japan</MenuItem>
                        <MenuItem value="english">english</MenuItem>
                        <MenuItem value="chinese">chinese</MenuItem>
                        <MenuItem value="no_lyrics">no_lyrics</MenuItem>
                        <MenuItem value="forign">forign</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" fullWidth>Upload</Button>
            </form>
        </Box>
    );
}

export default MusicUpload;
