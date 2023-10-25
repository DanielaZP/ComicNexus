import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Container, Row, Col, Spinner, Card } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Playlist = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [nameError, setNameError] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (playlistName.trim()) {  
      setNameError('');
    }
  }, [playlistName]);

  useEffect(() => {
    const codUsuario = localStorage.getItem('cod_usuario');
    console.log(codUsuario);
    axios
      .get(`https://comic-next-laravel.vercel.app/api/api/listasPlaylist/${codUsuario}`)
      .then((response) => {
        setPlaylists(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error al obtener playlists:', error);
      });
  }, []);


  const handleClose = () => {
    setShowModal(false);
    setSelectedImage(null);
    setPlaylistName('');
    setNameError('');
  };

  const handleShow = () => setShowModal(true);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedExtensions = /(\.png|\.jpg)$/i;
      if (!allowedExtensions.exec(file.name)) {
        window.alert('Por favor, selecciona un archivo de imagen válido (png o jpg).');
        e.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setNameError('');
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
      setConfirmModalVisible(true);
    }
  };

  const handleVisualizePlaylist = (playlist) => {
    console.log('Visualizar playlist:', playlist);
  };

  const handleConfirmSave = () => {
    if (loading) {
      return;
    }

    const playlistExists = playlists.some(playlist => playlist.playlist.nombre_playlist === playlistName);

    if (playlistExists) {
      window.alert('¡Ya existe una playlist con este nombre!');
      return;
    }

    setLoading(true);
    const codUsuario = localStorage.getItem('cod_usuario');
    const base64Image = extractBase64Code(selectedImage);
    const data = {
      nombre_playlist: playlistName,
      imagen_playlist: base64Image,
      cod_usuario: codUsuario,
    };

    axios
      .post('https://comic-next-laravel.vercel.app/api/api/registroplay', data)
      .then(() => {
        setSuccessModalVisible(true);
        handleClose();

        setPlaylists(prevPlaylists => [
          ...prevPlaylists,
          {
            portadaUrl: base64Image,
            playlist: {
              cod_playlist: prevPlaylists.length + 1,
              nombre_playlist: playlistName,
            }
          }
        ]);
      })
      .catch((error) => {
        window.alert('¡Error al subir la playlist!');
        console.error('Error al enviar los datos:', error);
      })
      .finally(() => {
        setLoading(false);
        setConfirmModalVisible(false);
        setConfirmed(false);
      });
  };

  const extractBase64Code = (dataURL) => {
    const base64Code = dataURL.split(',')[1];
    return base64Code;
  };

  return (
    <Container className="text-center my-5">
      <h1 className="display-4 badabb">Mis playlists de comics</h1>
      <hr className="my-4" style={{ borderColor: 'var(--celestito)', borderWidth: '2px' }} />

      <div className="container">
        <Button variant="btn custom-btn-color" onClick={handleShow} style={{ marginTop: '-155px', marginLeft: '900px' }}>
          Crear playlist
        </Button>

        <Modal show={showModal} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Crear playlist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col md={6}>
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
                    variant="btn custom-btn-color"
                    style={{ marginLeft: '50px', marginRight: 'auto', display: 'block' }}
                    onClick={() => document.querySelector('input[type="file"]').click()}
                  >
                    Agregar Imagen
                  </Button>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="playlistName">
                    <Form.Label style={{ marginTop: '50px', marginLeft: '-100px' }}>Nombre de la Playlist</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre de la playlist"
                      value={playlistName}
                      onChange={(e) => setPlaylistName(e.target.value)}
                      isInvalid={!!nameError}
                      style={{ marginTop: '10px', marginLeft: '-100px' }}
                    />
                    <Form.Control.Feedback type="invalid">{nameError}</Form.Control.Feedback>
                  </Form.Group>
                  <div style={{ marginTop: '50px' }}>
                    <Button variant="btn Warning-btn-color" onClick={handleClose} style={{ marginLeft: '-45px' }}>
                      Cancelar
                    </Button>
                    <Button variant="btn custom-btn-color" onClick={handleSavePlaylist} style={{ marginLeft: '80px' }}>
                      Guardar
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={confirmModalVisible} onHide={() => setConfirmModalVisible(false)} centered>
          <Modal.Body>
            <h4>¿Estás seguro de que deseas guardar esta playlist?</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setConfirmModalVisible(false)}>
              No
            </Button>
            <Button variant="success" onClick={handleConfirmSave}>
              Sí
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={successModalVisible} onHide={() => setSuccessModalVisible(false)} centered>
          <Modal.Body>
            <h4>¡La playlist se ha subido con éxito!</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSuccessModalVisible(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

        <Row style={{ marginLeft: '-70px', marginRight: '-90px', flexWrap: 'wrap' }}>
        {isLoading ? (
          <div className="text-center my-3">
            <Spinner animation="border" variant="primary" role="status">
              <span className="sr-only">.</span>
            </Spinner>
            <p className="mt-2">Cargando playlists...</p>
          </div>
        ) : playlists.length === 0 ? (
          <p>No tienes playlist creadas.</p>
        ) : (
          playlists.map((playlist) => (
            <Col key={playlist.playlist.cod_playlist} md={2} className="mb-4" style={{ flex: '0 0 20%', maxWidth: '20%' }}>
                <Card style={{ width: '210px', height: '300px', marginBottom: '20px', marginRight: '0px'  }}>
                  <Card.Img
                    variant="top"
                    src={playlist.portadaUrl}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <h5 className="card-title">{playlist.playlist.nombre_playlist}</h5>
                    <Link to={`/vista-playlist/${playlist.playlist.cod_playlist}`} className="btn custom-btn-color">
                       Ver playlist {playlist.playlist.cod_playlist}
                    </Link> 
                    {/* <Button variant="btn custom-btn-color" onClick={() => handleVisualizePlaylist(playlist)}>
                      Visualizar Playlist
                    </Button> */}
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </div>
    </Container>
  );
};

export default Playlist;
