import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import CardCat from '../componentes/CardCat';

// import imagenError from '../ruta/de/tu/imagen-de-error.jpg'; // Ruta de tu imagen de error

function ListaComics() {
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

  return (
    <div>
      <Container className="text-center my-5">
      <h1 className="display-4">LISTADO DE COMICS</h1>
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

export default ListaComics;
