import React, { useEffect, useState } from 'react';
import { Container, Spinner,Row,Col,Button,Modal} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
const VistaPlaylist = () => {
  const [playlist, setPlaylist] = useState(null);
  const [comicsData, setComicsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
  
  return (
    <div>
      {isLoading ? (
        <Container className="text-center my-5">
        <div className="text-center my-3">
          <Spinner animation="border" variant="primary" role="status">
            <span className="sr-only"></span>
          </Spinner>
          <p className="mt-2">Cargando playlist...</p>
        </div>
      </Container>
      ) : playlist ? (
        <Row className="align-items-center">
          <Col md={4} className='text-center' style={{marginTop:'50px'}}>
          <img
              src={playlist.portadaUrl}
              alt="Playlist Cover"
              className="img-fluid"
              style={{ width: '208px', height: '200px', objectFit: 'cover' }}
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
                <Col md={1} className="text-center">
                  <p className="font-weight-bold" style={{
                      marginTop: '50px',
                      marginLeft: '10px',
                      width: '150px',
                      height: '50px',
                    }}>{index + 1}</p>
                </Col>
                <Col md={3} className='text-center'>
                  <img
                    src={comic.portadaUrl}
                    alt={`Comic ${index + 1}`}
                    className="img-fluid"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                </Col>
                <Col md={4} >
                  <h4>{comic.comic.titulo}</h4>
                  <p>{comic.comic.sinopsis}</p>
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
                    }}
                  >Ver el cómic</Link>
                  <Button className="btn Warning-btn-color" 
                    style={{
                      marginTop: '30px',
                      marginLeft: '20px',
                      width: '150px',
                      height: '50px',
                    }} disabled
                  >Eliminar de la Lista</Button>
                </Col>
              </Row>
            ))
          ) : (
            <p className='text-center'>No hay ningún cómic registrado en la playlist.</p>
          )}
        </Container>
        </Row>
      ) : (
        <Container className="text-center my-5">
          <h1 className="display-4">Error: playlist no encontrada</h1>
          <hr className="my-4" style={{ borderColor: 'var(--rojito)', borderWidth: '2px' }} />
        </Container> 
      )}
    </div>
  );
};


export default VistaPlaylist;
