import React, { useEffect, useState } from 'react';
import { Container, Spinner, Row, Col, Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function VistaComic() {
  const [comic, setComic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [Errormodalvisible, setErrormodalvisible] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const { id } = useParams();
  const codUsuario = localStorage.getItem('cod_usuario');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [addToPlaylistButtonDisabled, setAddToPlaylistButtonDisabled] = useState(false);
  useEffect(() => {
    // Hacer la solicitud HTTP para obtener los datos del cómic por ID
    axios
      .get(`https://comic-next-laravel.vercel.app/api/api/comic/${id}`)
      .then((response) => {
        // Almacena los datos del cómic en el estado local
        console.log(response.data);
        setComic(response.data[0]);
      })
      .catch((error) => {
        console.error('Error al obtener datos del cómic:', error);
      })
      .finally(() => {
        // Establece isLoading en false una vez que la solicitud se ha completado (ya sea con éxito o con error)
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
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

  const handleAddToPlaylist = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Restablecer el estado de selectedPlaylistId al cerrar el modal
    setSelectedPlaylistId(null);
    setAddToPlaylistButtonDisabled(false);
  };

  const modalExito = () => {
    setSuccessModalVisible(true);
  };
  const modalError = () => {
    setErrormodalvisible(true);
  };

  const handleAddToPlaylistConfirm = (selectedPlaylistId) => {
    setAddToPlaylistButtonDisabled(true);
      axios
        .post('https://comic-next-laravel.vercel.app/api/api/registroComicPlaylist', {
          cod_comic: id,
          cod_usuario: codUsuario,
          cod_playlist: selectedPlaylistId,
        })
        .then((response) => {
          console.log('Éxito al añadir el cómic a la playlist:', response.data);
          modalExito();
        })
        .catch((error) => {
          console.error('Error al añadir el cómic a la playlist:', error);
          modalError();
        })
        .finally(() => {
          setShowModal(false);
          // Restablecer el estado de selectedPlaylistId después de añadir a la playlist
          setSelectedPlaylistId(null);
          setAddToPlaylistButtonDisabled(false);
        });
    
  };

  return (
    <div>
      {isLoading ? (
        <Container className="text-center my-5" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '50%', width: '200px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only"></span>
        </Spinner>
        <p className="mt-2">Cargando cómic...</p>
      </Container>
      ) : comic ? (
        <Row>
          <Container className="text-center my-5">
            <h1 className="display-4 badabb">
              <strong>{comic.comic.titulo}</strong>
            </h1>
            <hr className="my-4" style={{ borderColor: 'var(--celestito)', borderWidth: '2px' }} />
          </Container>
          <Col lg={5} md={12} className="text-cente ">
            <img
              className="imagen-previa text-center "
              src={comic.portadaUrl}
              alt="Portada"
              style={{
                width: '300px',
                height: '470px',
                border: '3px solid white', // Cambia el ancho y el estilo del borde según tus preferencias
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '200px',
              }}
            />
          </Col>
          <Col lg={6} md={12}>
          <div className="custom-form-container">
              
              <p>
                <strong>Autor(es): </strong>
                {comic.comic.autor}
              </p>
              <p>
                <strong>Año de Publicación: </strong>
                {comic.comic.anio_publicacion}
              </p>
              <p className="text-justify ">
                <strong>Sinopsis: </strong>
                {comic.comic.sinopsis}
              </p>
            </div>
            <Button 
              className="btn custom-btn-color" 
              style={{
                marginTop: '50px',
                width: '200px',
                height: '80px',
                border: '3px solid white', // Cambia el ancho y el estilo del borde según tus preferencias
                borderRadius: '8px', 
              }}
              onClick={handleAddToPlaylist}
            >
              Añadir cómic a playlist
            </Button>
          </Col>
          <Modal show={showModal} onHide={handleCloseModal} dialogClassName="custom-modal">
            <Modal.Header closeButton>
              <Modal.Title>¿A qué playlist quieres añadir el cómic: {comic.comic.titulo}?</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: 'calc(80vh - 130px)', overflowY: 'auto' }}>
            {playlists.length === 0 ? (
                <p>No tienes playlists creadas.</p>
              ) : (
              <ul className="playlist-list">
                {playlists.map((playlist) => (
                  <li key={playlist.playlist.cod_playlist}>
                    <div className="playlist-item">
                      <img
                        src={playlist.portadaUrl}
                        alt={`Imagen de ${playlist.playlist.nombre_playlist}`}
                        className="playlist-image"
                      />
                      <span className="playlist-title">{playlist.playlist.nombre_playlist}</span>
                      <Button
                        variant="btn custom-btn-color"
                        onClick={() => handleAddToPlaylistConfirm(playlist.playlist.cod_playlist)}
                        disabled={addToPlaylistButtonDisabled}
                      >
                        Añadir
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="btn Warning-btn-color" onClick={handleCloseModal}>
                Cancelar
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={successModalVisible} onHide={() => setSuccessModalVisible(false)} centered>
            <Modal.Body>
              <h4>El cómic: {comic.comic.titulo} se subió con éxito a la playlist</h4>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn Warning-btn-color" onClick={() => setSuccessModalVisible(false)}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={Errormodalvisible} onHide={() => setErrormodalvisible(false)} centered>
            <Modal.Body>
              <h4>El cómic: {comic.comic.titulo} ya existe en la playlist.</h4>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn Warning-btn-color" onClick={() => setErrormodalvisible(false)}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>
      ) : (
        <Container className="text-center my-5">
          <h1 className="display-4">Error: Cómic no encontrado</h1>
          <hr className="my-4" style={{ borderColor: 'var(--rojito)', borderWidth: '2px' }} />
        </Container>
      )}
    </div>
  );
}

export default VistaComic;
