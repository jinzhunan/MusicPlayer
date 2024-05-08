import React, { useState } from 'react';
import axios from 'axios';
import jsmediatags from 'jsmediatags/dist/jsmediatags.min';



function MusicUpload() {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState(null);


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

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dhhuemjhf/raw/upload', formData);
            console.log('Upload successful:', response.data);

            await axios.post('https://necessary-shrub-soursop.glitch.me/upload', {
                musicUrl: response.data.secure_url,
                title: title,
                artist,
                thumbnailUrl
            });

            alert('Upload successful');
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed');
        }
    };

    return (
      <div>
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Artist" value={artist} onChange={(e) => setArtist(e.target.value)} />
            {thumbnailUrl && <img style={{ width: '100px', height: '100px' }} src={thumbnailUrl} alt="Thumbnail" />}
            <button type="submit">Upload</button>
        </form>
      </div>
    );
}

export default MusicUpload;





// import React, { useState } from 'react';
// import axios from 'axios';

// const UploadImage = () => {
//   const [image, setImage] = useState(null);

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append('file', image);
//     formData.append('upload_preset', 'gkk1fiep');

//     try {
//       const res = await axios.post(
//         'https://api.cloudinary.com/v1_1/dhhuemjhf/image/upload',
//         formData
//       );

//       const imageUrl = res.data.secure_url;
      
//       // 将图片 URL 发送到服务器
//       await axios.post('https://necessary-shrub-soursop.glitch.me/upload', { imageUrl });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleImageChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// };

// export default UploadImage;
