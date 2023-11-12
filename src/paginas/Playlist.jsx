import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Container, Row, Col, Spinner, Card, Pagination } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Playlist = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [nameError, setNameError] = useState('');
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const playlistsPerPage = 15;
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editPlaylist, setEditPlaylist] = useState(null);  

  useEffect(() => {
    if (playlistName.trim().length >= 3 && playlistName.trim().length <= 50) {
      setMinLengthError(false);
      setMaxLengthError(false);
    } else {
      if (playlistName.trim().length < 3 && playlistName.trim().length > 0) {
        setMinLengthError(true);
        setMaxLengthError(false);
      } else if (playlistName.trim().length > 50) {
        setMinLengthError(false);
        setMaxLengthError(true);
      }
    }
  }, [playlistName]);

  useEffect(() => {
    if (playlistName.trim()) {  
      setNameError('');
    }
  }, [playlistName]);

  useEffect(() => {
    const codUsuario = localStorage.getItem('cod_usuario');
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
  const handleDeletePlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    setDeleteModalVisible(true);
  };  

  const handleConfirmDelete = () => {
    console.log('Eliminar playlist:', selectedPlaylist);
    const cod_playlist = selectedPlaylist?.playlist?.cod_playlist;
    axios
      .delete(`https://comic-next-laravel.vercel.app/api/api/eliminarPlaylist?cod_playlist=${cod_playlist}`)
      .then(() => {
        setPlaylists((prevPlaylists) =>
          prevPlaylists.filter((playlist) => playlist.playlist.cod_playlist !== cod_playlist)
        )
        setDeleteModalVisible(false);
        Swal.fire({
          icon: 'success',
          title: '¡La playlist ha sido eliminada con éxito!',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error('Error al eliminar la playlist:', error);

      });
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };
  const handleEditPlaylist = (playlist) => {
    setEditPlaylist(playlist);
    setPlaylistName(playlist.playlist.nombre_playlist); // Establecer el nombre de la playlist en el estado
    setSelectedImage(playlist.portadaUrl); // Establecer la imagen de la playlist en el estado
    setShowModal(true); // Abrir el modal de edición
  };
  const handleClose = () => {
    setShowModal(false);
    setSelectedImage(null);
    setPlaylistName('');
    setNameError('');
    setMinLengthError(false);
    setMaxLengthError(false);
  };

  const handleShow = () => setShowModal(true);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedExtensions = /(\.png|\.jpg)$/i;
      if (!allowedExtensions.exec(file.name)) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Por favor, selecciona un archivo de imagen válido (png o jpg).',
        });
        e.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setNameError('');
        // Mostrar el mensaje de éxito al cargar la imagen
        Swal.fire({
          icon: 'success',
          title: '¡Imagen subida exitosamente!',
          showConfirmButton: false,
          timer: 1500,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  const handleSavePlaylist = () => {
    const specialCharactersRegex = /^[a-zA-Z0-9ñÑ ]+$/;
    if (!playlistName.trim()) {
      setNameError('Rellene este campo.');
      setMinLengthError(false);
      setMaxLengthError(false);
    } else if (playlistName.trim().length < 3) {
      setMinLengthError(true);
      setMaxLengthError(false);
      setNameError('');
    } else if (playlistName.trim().length > 50) {
      setMinLengthError(false);
      setMaxLengthError(true);
      setNameError('');
    } else if (!specialCharactersRegex.test(playlistName)) {
      setNameError('El nombre no puede contener caracteres especiales.');
      setMinLengthError(false);
      setMaxLengthError(false);
    } else if (!selectedImage) {
      setNameError('Sube una imagen válida.');
      setMinLengthError(false);
      setMaxLengthError(false);
    } else {
      setMinLengthError(false);
      setMaxLengthError(false);
      setConfirmModalVisible(true);
    }
  }  

  const handleCloseSuccessModal = () => {
    setSuccessModalVisible(false);
    handleClose();
    window.location.reload();
  };

  const handleCancelPlaylist = () => {
    if (playlistName || selectedImage) {
      setCancelModalVisible(true);
    } else {
      handleClose();
    }
  };

  const handleConfirmSave = () => {
    if (loading) {
      return;
    }

    const playlistExists = playlists.some(playlist => playlist.playlist.nombre_playlist === playlistName);

    if (playlistExists) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Ya existe una playlist con este nombre!',
      });
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
        setCancelModalVisible(false);
        setConfirmed(false);
      });
  };

  const extractBase64Code = (dataURL) => {
    const base64Code = dataURL.split(',')[1];
    return base64Code;
  };

  const handleVisualizePlaylist = (playlist) => {
    console.log('Visualizar playlist:', playlist);
  };

  const indexOfLastPlaylist = currentPage * playlistsPerPage;
  const indexOfFirstPlaylist = indexOfLastPlaylist - playlistsPerPage;
  const currentPlaylists = playlists.slice(indexOfFirstPlaylist, indexOfLastPlaylist);
  const totalPages = Math.ceil(playlists.length / playlistsPerPage);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="text-center my-5">
      <h1 className="display-4 badabb">Mis playlists de comics</h1>
      <hr className="my-4" style={{ borderColor: 'var(--celestito)', borderWidth: '2px' }} />

      <div className="container">
        <Button variant="btn custom-btn-color" onClick={handleShow} style={{
                marginTop: '-150px',
                marginLeft: '930px',
                width: '150px',
                height: '60px',
                border: '3px solid white', 
                borderRadius: '8px', 
              }}>
          Crear playlist
        </Button>

        <Modal show={showModal} onHide={handleCancelPlaylist} size="lg" backdrop="static">
          <Modal.Header closeButton>
          <Modal.Title>{editPlaylist ? 'Editar Playlist' : 'Crear Playlist'}</Modal.Title>
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
                    <Form.Label style={{ marginTop: '50px', marginLeft: '-100px' }}>Nombre del Playlist</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre de la playlist"
                      value={playlistName}
                      onChange={(e) => setPlaylistName(e.target.value)}
                      isInvalid={!!nameError || minLengthError || maxLengthError}
                      style={{ marginTop: '10px', marginLeft: '-100px' }}
                    />
                      {minLengthError && <Form.Control.Feedback type="invalid">El nombre es demasiado corto (mínimo 3 caracteres).</Form.Control.Feedback>}
                      {maxLengthError && <Form.Control.Feedback type="invalid">El nombre es demasiado largo (máximo 50 caracteres).</Form.Control.Feedback>}
                      {nameError && <Form.Control.Feedback type="invalid">{nameError}</Form.Control.Feedback>}
                    </Form.Group>
                  <div style={{ marginTop: '50px' }}>
                    <Button variant="btn Warning-btn-color" onClick={handleCancelPlaylist} style={{ marginLeft: '-45px' }}>
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

        <Modal show={confirmModalVisible} centered backdrop="static" keyboard={false}>
        <Modal.Body>
          <h4>¿Estás seguro de que deseas guardar esta playlist?</h4>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
         <Button variant="btn Warning-btn-color" onClick={() => setConfirmModalVisible(false)}>
          No
          </Button>
          <Button variant="btn custom-btn-color" onClick={handleConfirmSave}>
         Sí
      </Button>
   </Modal.Footer>
  </Modal>


        <Modal
            show={cancelModalVisible}
            onHide={() => setCancelModalVisible(false)}
            centered
            backdrop="static"
            keyboard={false}
            >
          <Modal.Body>
            <h4>¿Estás seguro de que deseas cancelar la creación de la playlist?</h4>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <Button variant="btn Warning-btn-color" onClick={() => setCancelModalVisible(false)}>
              No
            </Button>
            <Button variant="btn custom-btn-color" onClick={() => { setCancelModalVisible(false); handleClose(); }}>
              Sí
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={successModalVisible}
          onHide={handleCloseSuccessModal} 
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Body className="text-center">
            <h4 c>¡La playlist se ha subido con éxito!</h4>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <Button className='btn custom-btn-color' onClick={handleCloseSuccessModal}>  
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
        <Row style={{ marginLeft: '-70px', marginRight: '-90px', flexWrap: 'wrap' }}>
          {isLoading ? (
            <Container className="text-center my-5" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '50%', width: '200px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Spinner animation="border" variant="primary" role="status">
              <span className="sr-only"></span>
            </Spinner>
            <p className="mt-2">Cargando playlists...</p>
          </Container>
          ) : playlists.length === 0 ? (
            <p className='text-center custom-form-container' style={{ maxWidth: '600px', margin: '0 auto' }}>
              No tienes playlist creadas.</p>
          ) : (
            currentPlaylists.map((playlist) => (
              <Col key={playlist.playlist.cod_playlist} md={2} className="mb-4" style={{ flex: '0 0 20%', maxWidth: '20%' }}>
                <Card style={{ 
                  width: '210px', 
                  height: '300px', 
                  marginBottom: '20px', 
                  marginRight: '0px',
                  border: '3px solid white', 
                  borderRadius: '8px', 
                }}>
                    <Dropdown
                  className="position-absolute top-0 end-0 m-2"
                  style={{ zIndex: 1 }} 
                >
                  <Dropdown.Toggle
                    variant="dark"
                    id={`dropdown-${playlist.playlist.cod_playlist}`}
                    style={{ background: 'var(--celestito)', border: '1px solid white', borderRadius: '8px', padding: '5px' }}
                  >
                    <i className="bi bi-three-dots-vertical" style={{ color: 'white' }}></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleEditPlaylist(playlist)}>Editar Playlist</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDeletePlaylist(playlist)}>Eliminar Playlist</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                  <Card.Img
                    variant="top"
                    src={playlist.portadaUrl}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <h5 className="card-title">{playlist.playlist.nombre_playlist}</h5>
                    <Link to={`/vista-playlist/${playlist.playlist.cod_playlist}`} className="btn custom-btn-color">
                      Ver playlist 
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
        <Modal show={deleteModalVisible} onHide={handleCancelDelete} centered backdrop="static" keyboard={false}>
            <Modal.Body>
              <h4>¿Deseas eliminar la playlist: {selectedPlaylist?.playlist?.nombre_playlist}?</h4>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <Button variant="btn Warning-btn-color" onClick={handleCancelDelete}>
                No
              </Button>
              <Button variant="btn custom-btn-color" onClick={handleConfirmDelete} style={{marginLeft:'25px'}}>
                Sí
              </Button>
            </Modal.Footer>
        </Modal>
          <div className="mt-4 text-center">
          {totalPages > 1 && (
            <>
              <button
                className="btn custom-btn-color mx-2"
                onClick={() => handlePageChange(currentPage - 1)}
                style={{ border: '3px solid white', borderRadius: '8px' }}
                disabled={currentPage === 1}
              >
                Página Anterior
              </button>
              <button
                className="btn custom-btn-color mx-2"
                onClick={() => handlePageChange(currentPage + 1)}
                style={{ border: '3px solid white', borderRadius: '8px' }}
                disabled={currentPage === totalPages}
              >
                Siguiente Página
              </button>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Playlist;
