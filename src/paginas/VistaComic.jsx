import React, { useEffect, useState } from 'react';
import { Container, Spinner, Row, Col, Button, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Agregado
import 'react-toastify/dist/ReactToastify.css';
import { Popup } from 'semantic-ui-react';
import { HeartFill } from 'react-bootstrap-icons';
import { Icon } from 'semantic-ui-react';
import { useLocalStorage } from 'react-use';

function VistaComic() {
  const codcontenido = localStorage.getItem('cod_contenido');
  const [comic, setComic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [Errormodalvisible, setErrormodalvisible] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const { id } = useParams();
  let navigate = useNavigate();
  const codUsuario = localStorage.getItem('cod_usuario');
  const [likedHeart, setLikedHeart] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [addToPlaylistButtonDisabled, setAddToPlaylistButtonDisabled] = useState(false);

  useEffect(() => {
    axios
      .get(`https://comic-next-laravel.vercel.app/api/api/comic/${id}?codUsuario=${codUsuario}`)
      .then((response) => {
        setComic(response.data[0]);
        setLikedHeart(response.data[0].comic_favoritos);
      })
      .catch((error) => {
        console.error('Error al obtener datos del cómic:', error);
      })
      .finally(() => {
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

  const handleToggleFavorite = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://comic-next-laravel.vercel.app/api/api/ComicFavoritosLike',
        data: {
          cod_comic: id,
          cod_usuario: codUsuario,
        },
      });

      if (response.status === 200) {
        setLikedHeart(!likedHeart);
  
        const message = likedHeart
          ? 'Cómic eliminado de favoritos'
          : 'Cómic añadido a favoritos';
  
        console.log('Mostrando notificación:', message); // Agregado
        toast.success(message); // Mostrar notificación de éxito
      } else {
        console.error('Error al agregar/eliminar de favoritos');
        toast.error('Error al agregar/eliminar de favoritos');
      }
    } catch (error) {
      console.error('Error de red:', error);
      toast.error('Error de red al procesar la solicitud');
    }
  };

  const handleAddToLeerComic = () => {
    navigate('/leer');
    localStorage.setItem('cod_contenido',id)
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
        setSelectedPlaylistId(null);
        setAddToPlaylistButtonDisabled(false);
      });
  };

  return (
    <div>
      <ToastContainer /> {/* Agregado */}
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
                border: '3px solid white',
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

              <Button
                className={`btn custom-btn-color${likedHeart ? ' liked' : ''}`}
                style={{
                  marginTop: '50px',
                  width: '200px',
                  height: '80px',
                  border: '3px solid white',
                  borderRadius: '8px',
                }}
                onClick={handleAddToLeerComic}
              >
                Leer Cómic
              </Button>
              <div style={{ marginLeft: 'center', marginTop: '20px', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Popup
                    content="Añadir a la playlist"
                    trigger={
                      <div className="icon-container" onClick={handleAddToPlaylist}>
                        <Icon
                          name='plus'
                          style={{
                            fontSize: '2em',
                            cursor: 'pointer',
                            color: 'black',
                          }}
                        />
                      </div>
                    }
                  />
                  <div className='icon-message' style={{ marginTop: '10px' }}>Añadir playlist</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Popup
                    content="Me gusta"
                    trigger={
                      <div className="icon-container" onClick={handleToggleFavorite}>
                        <HeartFill
                          color={likedHeart ? 'red' : 'var(--color-original)'}
                          size={32}
                          style={{
                            cursor: 'pointer',
                          }}
                        />
                      </div>
                    }
                  />
                  <div className='icon-message' style={{ marginTop: '10px' }}>
                  {likedHeart ? 'Eliminar de favoritos' : 'Añadir a favoritos'}</div>
                </div>
              </div>

            </div>
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
