import React, { useEffect, useState } from 'react';
import { Container, Spinner,Row,Col,Button,Modal} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { HeartFill } from 'react-bootstrap-icons';
import { Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const Favoritos = () => {
  const [comicsData, setComicsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedComic, setSelectedComic] = useState(null);
  const codUsuario = localStorage.getItem('cod_usuario');
  const [likedHearts, setLikedHearts] = useState([]);
  



  useEffect(() => {
    axios.get(`https://comic-next-laravel.vercel.app/api/api/listasfavoritos/${codUsuario}`)
      .then((response) => {
        console.log(response.data);
        setComicsData(response.data);
        const initialLikedHearts = response.data.map(() => true); 
        setLikedHearts(initialLikedHearts);
      })
      .catch((error) => {
        console.error('Error al obtener datos de la playlist:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  });
  const handleToggleFavorite = async (comicId, index) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://comic-next-laravel.vercel.app/api/api/ComicFavoritosLike',
        data: {
          cod_comic: comicId,
          cod_usuario: codUsuario,
        },
      });

    } catch (error) {
      console.error('Error de red:', error);
      toast.error('Error de red al procesar la solicitud');
    }
  };
  
  return (
    <div>
      {isLoading ? (
        <Container className="text-center my-5" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '50%', width: '200px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Spinner animation="border" variant="primary" role="status">
            <span className="sr-only"></span>
          </Spinner>
          <p className="mt-2">Cargando favoritos...</p>
        </Container>
      ) : (
        <Row className="align-items-center">
          <Col md={4} className='text-center' style={{ marginTop: '50px' }}>
            <div
              style={{
                width: '230px',
                height: '200px',
                objectFit: 'cover',
                border: '0px solid white',
                borderRadius: '8px',
                backgroundImage:  'url(/LogoComicsNexus.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginLeft: '200px',
                marginTop: '0px'
              }}
            />
                <div style={{ marginTop: '-40px', textAlign: 'center' }}>
      {isLoading ? (
        <Container className="text-center my-5" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '50%', width: '200px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Spinner animation="border" variant="primary" role="status">
            <span className="sr-only"></span>
          </Spinner>
          <p className="mt-2">Cargando favoritos...</p>
        </Container>
      ) : (
        <>
          
          <Container className="text-center my-4">
          </Container>
        </>
      )}
    </div>
          </Col>
          <Col md={6}>
            <div className="content-container custom-form-container">
              <h1 className="display-4 badabb">
                <strong>Mis Favoritos</strong>
              </h1>
              <h3>Lista de favoritos variados</h3>
            </div>
          </Col>
          <hr className="my-4" style={{ borderColor: 'var(--celestito)', borderWidth: '2px' }} />
          <Container className="mt-4">
            {comicsData.length > 0 ? (
              comicsData.map((comic, index) => (
                <Row key={index} className="mb-4">
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
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Popup
                          content="Me gusta"
                          trigger={
                            <div className="icon-container" onClick={() => handleToggleFavorite(comic.comic.cod_comic, index)}>
                              <HeartFill
                                color={likedHearts[index] ? 'red' : 'var(--color-original)'}
                                size={32}
                                style={{
                                  cursor: 'pointer',
                                }}
                              />
                            </div>
                          }
                        />
                      </div>
                </Row>
              ))
            ) : (
              <p className='text-center custom-form-container' style={{ maxWidth: '600px', margin: '0 auto' }}>
                No hay ningún cómic registrado en favoritos.
              </p>
            )}
          </Container>
        </Row>
      )}
    </div>
  );
};

export default Favoritos;
