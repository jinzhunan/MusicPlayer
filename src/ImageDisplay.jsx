import React from 'react';

function ImageDisplay({ base64Image }) {
    return <img src={base64Image} alt="Base64 Image" style={{ width: '100px', height: '100px' }} />;
}

export default ImageDisplay;
