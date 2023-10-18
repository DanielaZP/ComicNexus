import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function VistaComic() {
  const [comic, setComic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    // Hacer la solicitud HTTP para obtener los datos del cómic por ID
    axios.get(`https://comic-next-laravel.vercel.app/api/api/comic/${id}`)
      .then((response) => {
        // Almacena los datos del cómic en el estado local
        console.log(response.data);
        setComic(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener datos del cómic:', error);
      })
      .finally(() => {
        // Establece isLoading en false una vez que la solicitud se ha completado (ya sea con éxito o con error)
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="text-center my-3">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only"></span>
        </Spinner>
        <p className="mt-2">Cargando cómic...</p>
      </div>
    );
  }

  if (!comic) {
    return <div className='text-center'>Comic no encontrado <h1>Id:{id}</h1></div>;
  }

  return (
    <div>
      <Container className="text-center my-5">
        <h1>{id}</h1>
        <h1 className="display-4">{comic.titulo}</h1>
        <hr className="my-4" style={{ borderColor: 'var(--celestito)', borderWidth: '2px' }} />
        <p>{comic.sinopsis}</p>
        {/* Otros detalles del cómic */}
      </Container>
    </div>
  );
}

export default VistaComic;
