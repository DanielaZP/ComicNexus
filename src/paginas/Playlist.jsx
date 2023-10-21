import React, { useState, useRef } from 'react';
import { Button, Modal, Form, Container, Row, Col } from 'react-bootstrap';

function Playlist() {
  const [showModal, setShowModal] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [nameError, setNameError] = useState('');
  const imageUploadRef = useRef(null);

  const handleClose = () => {
    setShowModal(false);
    setSelectedImage(null);
    setPlaylistName('');
    setNameError('');
  };

  const handleShow = () => setShowModal(true);

  const handlePlaylistNameChange = (e) => {
    setPlaylistName(e.target.value);
    setNameError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  const handleSavePlaylist = () => {
    if (!playlistName.trim()) {
      setNameError('El nombre de la playlist es obligatorio.');
    } else if (!selectedImage) {
      setNameError('Sube una imagen válida.');
    } else {
      console.log('Nombre de la playlist:', playlistName);
      console.log('Imagen:', selectedImage);
      handleClose();
    }
  };

  return (
    <Container className="text-center my-5">
      <h1 className="display-4">Mis playlists de comics</h1>
      <hr className="my-4" style={{ borderColor: 'var(--celestito)', borderWidth: '2px' }} />

      <div className="container">
        <Button variant="primary" onClick={handleShow} style={{ marginTop: '-155px', marginLeft: '900px' }}>
          Crear playlist
        </Button>

        <Modal show={showModal} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title style={{  margin: '0 auto', marginLeft: '310px' }}>Editar Información</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col md={6}>
                  {/* Cuadro de visualización */}
                  <div
                    style={{
                      width: '220px',
                      height: '220px',
                      border: '2px dashed #ccc',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      marginBottom: '20px',
                      position: 'relative',
                    }}
                  >
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Previsualización"
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <span>Subir Imagen</span>
                    )}
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      ref={imageUploadRef}
                      style={{
                        display: 'none',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                      onChange={handleImageChange}
                    />
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => imageUploadRef.current.click()}
                    style={{ marginLeft: '50px', marginRight: 'auto', display: 'block' }}
                  >
                    Agregar Imagen
                  </Button>
                </Col>
                <Col md={6}>
                  {/* Campo del nombre de la playlist */}
                  <Form.Group controlId="playlistName">
                    <Form.Label style={{ marginTop: '50px', marginLeft: '-100px' }}>Nombre de la Playlist</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre de la playlist"
                      value={playlistName}
                      onChange={handlePlaylistNameChange}
                      isInvalid={!!nameError}
                      style={{ marginTop: '10px', marginLeft: '-100px' }} // Ajuste de margen superior y izquierdo
                    />
                    <Form.Control.Feedback type="invalid">{nameError}</Form.Control.Feedback>
                  </Form.Group>

                  {/* Botones de Guardar y Cancelar */}
                  <div style={{ marginTop: '50px' }}>
                    <Button variant="secondary" onClick={handleClose} style={{ marginLeft: '-45px' }}>
                      Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSavePlaylist} style={{ marginLeft: '80px' }}>
                      Guardar
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </Container>
  );
}

export default Playlist;
