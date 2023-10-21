import React, { useState } from 'react';
import { Button, Modal, Form, Container } from 'react-bootstrap';

function Playlist() {
  const [showModal, setShowModal] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistImage, setPlaylistImage] = useState('');

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handlePlaylistNameChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const handlePlaylistImageChange = (e) => {
    setPlaylistImage(e.target.value);
  };

  const handleSavePlaylist = () => {
    // Realizar acciones con los datos ingresados (por ejemplo, enviarlos a un servidor)
    console.log('Nombre de la playlist:', playlistName);
    console.log('URL de la imagen:', playlistImage);
    handleClose();
  };

  return (
    <Container className="text-center my-5">
      <h1 className="display-4">Mis playlist de comics</h1>
      <hr className="my-4" style={{ borderColor: 'var(--celestito)', borderWidth: '2px' }} />

      <div className="container" style={{ position: 'relative' }}>
        <Button
          variant="primary"
          onClick={handleShow}
          style={{
            position: 'absolute',
            top: '-80px', // Ajusta la distancia desde la parte superior
            right: '10px', // Ajusta la distancia desde el lado derecho
          }}
        >
          Agregar Playlist
        </Button>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Playlist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="playlistName">
                <Form.Label>Nombre de la Playlist</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre de la playlist"
                  value={playlistName}
                  onChange={handlePlaylistNameChange}
                />
              </Form.Group>

              <Form.Group controlId="playlistImage">
                <Form.Label>URL de la Imagen</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese la URL de la imagen"
                  value={playlistImage}
                  onChange={handlePlaylistImageChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleSavePlaylist}>
              Guardar Playlist
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
}

export default Playlist;
