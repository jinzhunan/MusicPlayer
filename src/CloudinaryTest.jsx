import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'gkk1fiep');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dhhuemjhf/image/upload',
        formData
      );

      const imageUrl = res.data.secure_url;
      
      // 将图片 URL 发送到服务器
      await axios.post('https://tender-determined-louse.glitch.me/upload', { imageUrl });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadImage;
