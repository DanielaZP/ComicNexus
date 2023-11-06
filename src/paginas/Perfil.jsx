import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const Perfil = () => {
  const [images, setImages] = useState([]);

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => Object.assign(file, {
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

  const uploadImages = async () => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images[]', image);
    });

    try {
      await axios.post('http://tu-api-laravel.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Manejar la respuesta exitosa
    } catch (error) {
      // Manejar el error
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        <p>Arrastra y suelta las imágenes aquí, o haz clic para seleccionarlas</p>
      </div>
      <div style={previewStyles}>
        {images.map((file, index) => (
          <div key={file.name} style={imageContainerStyles}>
            <img
              src={file.preview}
              alt={file.name}
              style={imageStyles}
            />
            <div style={deleteIconStyles} onClick={() => removeImage(index)}>
              &times;
            </div>
          </div>
        ))}
      </div>
      <button onClick={uploadImages}>Subir imágenes</button>
    </div>
  );
};

const dropzoneStyles = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  marginBottom: '20px', 
  minHeight: '150px',
  marginTop: '100px'
};

const previewStyles = {
  display: 'flex',
  marginTop: '20px',
};

const imageContainerStyles = {
  position: 'relative',
  marginRight: '10px',
};

const imageStyles = {
  width: '100px',
  height: '100px',
  objectFit: 'cover',
};

const deleteIconStyles = {
  position: 'absolute',
  top: '5px',
  right: '5px',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  background: 'red',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};

export default Perfil;