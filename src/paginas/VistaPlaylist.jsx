import React, { useEffect, useState } from 'react';
import { Container, Spinner,Row,Col,Button,Modal} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
const VistaPlaylist = () => {
  const [playlist, setPlaylist] = useState(null);
  const [comicsData, setComicsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedComic, setSelectedComic] = useState(null);
  const { id } = useParams();
  const codUsuario = localStorage.getItem('cod_usuario');
  useEffect(() => {
    axios.get(`https://comic-next-laravel.vercel.app/api/api/playlist/${codUsuario}/${id}`)
      .then((response) => {
        console.log(response.data);
        setPlaylist(response.data[0]);
      })
      .catch((error) => {
        console.error('Error al obtener datos de la playlist:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    axios.get(`https://comic-next-laravel.vercel.app/api/api/comicPlaylist/${codUsuario}/${id}`)
      .then((response) => {
        console.log(response.data);
        setComicsData(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener datos de la playlist:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);
  const handleShowModal = (comic) => {
    setSelectedComic(comic);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedComic(null);
    setShowModal(false);
  };

  const handleDeleteComic = () => {
    axios.delete('https://comic-next-laravel.vercel.app/api/api/deleteComicPlaylist', {
        data: {
          cod_comic: selectedComic.comic.cod_comic,
          cod_usuario: codUsuario,
          cod_playlist: id,
        },
        })
      .then((response) => {
        console.log('Éxito al eliminar el cómic', response.data);
        window.location.reload(); // Recargar la página
      })
      .catch((error) => {
        console.error('Error al eliminar el cómic de la playlist:', error);
      })
      .finally(() => {
        handleCloseModal();
       });
     };

  return (
    <div>
      {isLoading ? (
       <Container className="text-center my-5" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '50%', width: '200px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
       <Spinner animation="border" variant="primary" role="status">
         <span className="sr-only"></span>
       </Spinner>
       <p className="mt-2">Cargando playlist...</p>
     </Container>
      ) : playlist ? (
        <Row className="align-items-center">
          <Col md={4} className='text-center' style={{marginTop:'50px'}}>
          <img
              src={playlist.portadaUrl}
              alt="Playlist Cover"
              className="img-fluid"
              style={{ width: '208px', height: '200px', objectFit: 'cover',
              border: '3px solid white', 
              borderRadius: '8px'}}
            />
          </Col>
          <Col md={6}>
            <div className="content-container custom-form-container" >
            <h1 className="display-4 badabb"><strong>playlist: {playlist.playlist.nombre_playlist}</strong></h1>
            <h3 >Lista de cómics variados</h3>
            </div>
          </Col>
          <hr className="my-4" style={{ borderColor: 'var(--celestito)', borderWidth: '2px' }} />
          <Container className="mt-4">
          {comicsData.length > 0 ? (
            comicsData.map((comic, index) => (
              <Row key={index} className="mb-4" >
                <Col md={1} className="text-center badabb">
                <p className="font-weight-bold" style={{
                    marginTop: '50px',
                    marginLeft: '10px',
                    width: '150px',
                    height: '50px',
                    color: 'white',
                    fontSize: '1.5em',
                    
                  }}>
                    {index + 1}
                  </p>
                </Col>
                <Col md={3} className='text-center'>
                  <img
                    src={comic.portadaUrl}
                    alt={`Comic ${index + 1}`}
                    className="img-fluid"
                    style={{ width: '150px', height: '150px', objectFit: 'cover',border: '3px solid white', 
                    borderRadius: '8px'}}
                  />
                </Col>
                <Col md={4} className='custom-form-container'>
                  <h4>{comic.comic.titulo}</h4>
                  {comic.comic.sinopsis.length > 150 ? `${comic.comic.sinopsis.substring(0, 150)}...` : comic.comic.sinopsis}
                </Col>
                <Col md={4}>
                <Link to={`/vista-comic/${comic.comic.cod_comic}`} className="btn custom-btn-color "
                    style={{
                      marginTop: '30px',
                      marginLeft: '10px',
                      width: '150px',
                      height: '50px',
                      justifyContent: 'center',  // Alinea horizontalmente en el centro
                      lineHeight: '35px',  // Centra verticalmente el texto
                      border: '3px solid white', 
                      borderRadius: '8px'
                    }}
                  >Ver el cómic</Link>
                  <Button className="btn Warning-btn-color" 
                    style={{
                      marginTop: '30px',
                      marginLeft: '20px',
                      width: '150px',
                      height: '50px',
                      border: '3px solid white', 
                      borderRadius: '8px'
                    }} 
                    onClick={() => handleShowModal(comic)}
                  >Eliminar de la Lista</Button>
                </Col>
              </Row>
            ))
          ) : (
            <p className='text-center custom-form-container' style={{ maxWidth: '600px', margin: '0 auto' }}>
              No hay ningún cómic registrado en la playlist.</p>
          )}
        </Container>
        </Row>
      ) : (
        <Container className="text-center my-5">
          <h1 className="display-4">Error: playlist no encontrada</h1>
          <hr className="my-4" style={{ borderColor: 'var(--rojito)', borderWidth: '2px' }} />
        </Container> 
      )}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación de Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{`¿Estás seguro que deseas eliminar el cómic ${selectedComic?.comic?.titulo}?`}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn custom-btn-color" onClick={handleCloseModal}>
            No
          </Button>
          <Button className="btn Warning-btn-color" onClick={handleDeleteComic}>
            Sí
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};


export default VistaPlaylist;
