import React, { useEffect, useState } from 'react';
import { Container, Spinner,Row,Col,Button,Modal} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VistaPlaylist = () => {
  const [playlist, setPlaylist] = useState(null);
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
            <div className="content-container" >
            <h1 className="display-4 badabb"><strong>playlist: {playlist.playlist.nombre_playlist}</strong></h1>
            <h3 >Lista de comics variados</h3>
            </div>
          </Col>
          <hr className="my-4" style={{ borderColor: 'var(--celestito)', borderWidth: '2px' }} />
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
