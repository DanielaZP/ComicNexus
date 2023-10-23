import React from 'react'
import { useEffect, useState } from 'react';
import Carrucel from '../componentes/Carrucel'
import CardCat from '../componentes/CardCat'
import { Container,Row, Col } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';

export const Inicio = () => {
  const [comicsData, setComicsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Hacer la solicitud HTTP a tu servidor Laravel
    axios.get('https://comic-next-laravel.vercel.app/api/api/listascomics')

    .then((response) => {
      // Almacena los datos JSON en el estado local
      console.log(response.data);
      setComicsData(response.data);
    })
    .catch((error) => {
      console.error('Error al obtener datos:', error);
    })
    .finally(() => {
      // Establece isLoading en false una vez que la solicitud se ha completado (ya sea con éxito o con error)
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
          <hr className="my-4" style={{ borderColor: 'var(--celestito)', borderWidth: '2px' }} />
        </Container>
        <Carrucel/>
        <h3 className="display-4 badabb fs-1">Comics que te recomendamos</h3>
        {isLoading ? (
        <div className="text-center my-3">
         <Spinner animation="border" variant="primary" role="status">
           <span className="sr-only"></span>
         </Spinner>
         <p className="mt-2">Cargando cómics...</p>
       </div>
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
  )
}
