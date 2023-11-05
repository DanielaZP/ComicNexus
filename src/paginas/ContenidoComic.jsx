import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function ContenidoComic() {
    const [images, setImages] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

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
    <Container className="text-center my-5">
        <h1 className="display-4 badabb">
            <strong>Registro contenido comic</strong>
          </h1>
          <hr className="my-4 custom-divider" />
      <Row>
        {/* Columna izquierda (1/3 de la ventana) */}
        <Col xs={12} md={4}>
        <div
                  className="empty-image-container"
                  style={{
                    width: "300px",
                    height: "470px",
                    //border: "1px dashed #ccc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    border: '3px solid white', 
                    borderRadius: '8px'
                  }}
                >
                  Escoja un cómic
                </div>
                <div className='text-center'>
                    <button
                        className="btn custom-btn-color"
                        style={{
                        marginTop: '20px',
                        width: '180px',
                        height: '60px',
                        justifyContent: 'center',
                        lineHeight: '35px',
                        border: '3px solid white', 
                        borderRadius: '8px',
                        marginRight:'110px'
                        }}
                        onClick={handleShowModal}
                    >
                        Seleccionar Cómic
                    </button>
                </div>
        </Col>
        {/* Columna derecha (2/3 de la ventana) */}
        <Col xs={12} md={8}>
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
            <button onClick={uploadImages} style={{
                marginTop:'10px'
            }}>
            Subir imágenes</button>
            </div>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>A qué cómic quieres añadir contenido?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Contenido del modal */}
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn Warning-btn-color" onClick={handleCloseModal}>
            Cancelar
          </Button>
          {/* Otros botones del pie del modal si es necesario */}
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
const dropzoneStyles = {
    border: '2px dashed #cccccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: '20px', 
    minHeight: '150px',
    marginTop: '20px',
    backgroundColor: "white"
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
    width: '150px',
    height: '200px',
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

export default ContenidoComic;