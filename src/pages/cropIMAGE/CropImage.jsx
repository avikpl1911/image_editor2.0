import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default function ImageCrop({img}) {
  const [src, setSrc] = useState(img);
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [croppedImage, setCroppedImage] = useState(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    // Perform any desired operations with the cropped area or pixels
    console.log('Cropped area:', croppedArea);
    console.log('Cropped area in pixels:', croppedAreaPixels);
  };

  const onCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const onImageLoaded = (image) => {
    // Access the image element if needed
    console.log('Image loaded:', image);
  };

  const getCroppedImage = () => {
    if (src && crop.width && crop.height) {
      const image = new Image();
      image.src = src;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = crop.width;
      canvas.height = crop.height;

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );

      // Create a new image element with the cropped image
      const croppedImage = new Image();
      croppedImage.src = canvas.toDataURL();
      setCroppedImage(croppedImage);
    }
  };

  return (
    <div>
      

      {src && (
        <ReactCrop
          src={src}
          crop={crop}
          onChange={onCropChange}
          onComplete={onCropComplete}
          onImageLoaded={onImageLoaded}
        />
      )}

      {croppedImage && (
        <div>
          <h2>Cropped Image</h2>
          <img src={croppedImage.src} alt="Cropped" />
        </div>
      )}

      {src && (
        <button onClick={getCroppedImage} disabled={!crop.width || !crop.height}>
          Crop Image
        </button>
      )}
    </div>
  );
}
