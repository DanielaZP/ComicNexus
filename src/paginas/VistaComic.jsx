import React, { useEffect, useState } from 'react';
import { Container, Spinner,Row,Col,Button,Modal} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function VistaComic() {
  const [comic, setComic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // Hacer la solicitud HTTP para obtener los datos del cómic por ID
    axios.get(`https://comic-next-laravel.vercel.app/api/api/comic/${id}`)
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
      .get('https://comic-next-laravel.vercel.app/api/api/listasPlaylist/1')
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
  };

  return (
    <div>
    {/* <Container className="text-center my-5">
      <h1 className="display-4">Vista del cómic</h1>
      <hr className="my-4" style={{ borderColor: 'var(--celestito)', borderWidth: '2px' }} />
      </Container> */}
      {isLoading ? (
        <Container className="text-center my-5">
          <div className="text-center my-3">
            <Spinner animation="border" variant="primary" role="status">
              <span className="sr-only"></span>
            </Spinner>
            <p className="mt-2">Cargando cómic...</p>
          </div>
        </Container>
      ) : comic ? (
        //mostrar datos del comic
        <Row>
          <Container className="text-center my-5">
          <h1 className="display-4 badabb"><strong>{comic.comic.titulo}</strong></h1>
          <hr className="my-4" style={{ borderColor: 'var(--celestito)', borderWidth: '2px' }} />
          </Container>
            {/* Columna izquierda para la imagen */}
            <Col lg={5} md={12} className="text-center">
              <img
              className='imagen-previa text-center'
                src={comic.portadaUrl}
                alt="Portada"
                style={{
                  width: "300px",
                  height: "470px",
                  border: "1px dashed #ccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "200px"
                }}
              />
            </Col>
            {/* Columna derecha para título, autor, año y sinopsis */}
            <Col lg={6} md={12}>
              <div>
              <h3>Título: {comic.comic.titulo}</h3>
              <p><strong>Autor(es): </strong>{comic.comic.autor}</p>
              <p><strong>Año de Publicación: </strong>{comic.comic.anio_publicacion}</p>
              <p className="text-justify "><strong>Sinopsis: </strong>{comic.comic.sinopsis}</p>
              </div>
              <Button
                className='btn custom-btn-color'
                style={{
                  marginTop: '50px',
                  width: '200px',  // Ajusta el ancho según tus necesidades
                  height: '80px',  // Ajusta la altura según tus necesidades
                  // Otros estilos si es necesario
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
                <ul className="playlist-list">
                  {playlists.map((playlist) => (
                    <li key={playlist.playlist.cod_playlist} onClick={() => handleAddToPlaylist(playlist)}>
                      <div className="playlist-item">
                        <img
                          src={playlist.portadaUrl}  
                          alt={`Imagen de ${playlist.playlist.nombre_playlist}`}
                          className="playlist-image"
                        />
                        <span className="playlist-title">{playlist.playlist.nombre_playlist}</span>
                        <Button
                          variant="btn custom-btn-color"
                          >
                          Añadir
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="btn Warning-btn-color" onClick={handleCloseModal}>
                  Cancelar
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


