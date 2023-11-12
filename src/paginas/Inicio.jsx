import React, { useEffect, useState } from 'react';
import Carrucel from '../componentes/Carrucel';
import CardCat from '../componentes/CardCat';
import { Container, Row, Col, ButtonGroup, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

export const Inicio = () => {
  const [comicsData, setComicsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('https://comic-next-laravel.vercel.app/api/api/listascomics')
      .then((response) => {
        setComicsData(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener datos:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getRandomComics = () => {
    const shuffledComics = comicsData.sort(() => 0.5 - Math.random());
    return shuffledComics.slice(0, 4);
  };

  return (
    <div className='container'>
      <Container className="text-center my-5">
        <h1 className="display-4 badabb">ComicNexus</h1>
        <hr className="my-4 custom-divider" />
      </Container>
      <Carrucel />
      <ButtonGroup className="mt-4 d-flex" >
        <Button
          className="btn custom-btn-color flex-grow-1 mx-2 btn-hover-effect"
          style={{
            height: '100px',
            borderRadius: '8px',
            border: '3px solid white',
            fontWeight: "bold"
          }}
        >
          Terror
        </Button>
        <Button
          className="btn custom-btn-color flex-grow-1 mx-2 btn-hover-effect"
          style={{
            height: '100px',
            borderRadius: '8px',
            border: '3px solid white',
            fontWeight: "bold"
          }}
        >
          Accion 
        </Button>
        <Button
          className="btn custom-btn-color flex-grow-1 mx-2 btn-hover-effect"
          style={{
            height: '100px',
            borderRadius: '8px',
            border: '3px solid white',
            fontWeight: "bold"
          }}
        >
          Ciencia ficcion
        </Button>
        <Button
          className="btn custom-btn-color flex-grow-1 mx-2 btn-hover-effect"
          style={{
            height: '100px',
            borderRadius: '8px',
            border: '3px solid white',
            fontWeight: "bold"
          }}
        >
          Comedia
        </Button>
      </ButtonGroup>
      <h3 className="display-4 badabb fs-1 mt-4">Comics que te recomendamos</h3>
      {isLoading ? (
        <Container className="text-center my-5" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '50%', width: '200px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Spinner animation="border" variant="primary" role="status">
            <span className="sr-only"></span>
          </Spinner>
          <p className="mt-2">Cargando cómics...</p>
        </Container>
      ) : (
        <div className="row row-cols-1 row-cols-md-4 g-4 mt-4">
          {getRandomComics().map((comic) => (
            <Col md={3} key={comic.comic.cod_comic}>
              <CardCat comic={comic} />
            </Col>
          ))}
        </div>
      )}
    </div>
  );
};
