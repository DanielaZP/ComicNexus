import React from 'react'
import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios'; // Importa Axios
import CardCat from '../componentes/CardCat'// Importa tu componente Card

const Terror = () => {
  const [comicsData, setComicsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Inicialmente, isLoading se establece en true

useEffect(() => {
  // Realiza una solicitud GET a la API de Laravel para obtener los datos de los cómics
    axios.get('http://localhost/ComicNext_laravel/public/api/categoria/Terror')
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

  return (
    <div>
      <Container className="text-center my-5">
      <h1 className="display-4">Seccion de terror</h1>
      <p className="lead">Explora y descubre contenido increíble</p>
      <hr className="my-4" style={{ borderColor: 'var(--verdesito)', borderWidth: '2px' }} />
    </Container>
    <div className="container">
      <div className="row row-cols-1 row-cols-md-4 g-4 mt-4">
        {comicsData.map((comic) => (
          <div className="col-md-4" key={comic.comic.cod_comic}>
          <CardCat comic={comic} />
        </div>
        ))}
      </div>
      </div>
  </div>
  )
}

export default Terror