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
  return (
    <div>
    <Container className="text-center my-5">
      <h1 className="display-4">Vista del cómic</h1>
      <hr className="my-4" style={{ borderColor: 'var(--celestito)', borderWidth: '2px' }} />

      {isLoading ? (
        <div className="text-center my-3">
          <Spinner animation="border" variant="primary" role="status">
            <span className="sr-only"></span>
          </Spinner>
          <p className="mt-2">Cargando cómic...</p>
        </div>
      ) : comic ? (
        <div>
          <h2>{comic.comic.titulo}</h2>
          <h2>{id}</h2>
          <p>{comic.comic.sinopsis}</p>
          {/* Puedes mostrar la portada u otras informaciones del cómic aquí */}
          <img
            src={comic.portadaUrl}
            alt="Portada"
            style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
          />
        </div>
      ) : (
        <p>No se encontraron datos del cómic.</p>
      )}
    </Container>
  </div>
  );
}

export default VistaComic;


