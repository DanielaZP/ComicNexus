import React, { useEffect, useState } from 'react';
import { Container, Spinner,Row,  Col} from 'react-bootstrap';
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
      </Container>
      {isLoading ? (
        <div className="text-center my-3">
          <Spinner animation="border" variant="primary" role="status">
            <span className="sr-only"></span>
          </Spinner>
          <p className="mt-2">Cargando cómic...</p>
        </div>
      ) : comic ? (
        //mostrar datos del comic
        <Row>
            {/* Columna izquierda para la imagen */}
            <Col lg={6} md={12} className="text-center image-container">
              <img
                src={comic.portadaUrl}
                alt="Portada"
                style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
              />
            </Col>
            {/* Columna derecha para título, autor, año y sinopsis */}
            <Col lg={6} md={12} className="ui large form" >
              <div >
              <h3>Titulo: {comic.comic.titulo}</h3>
              <p>Autor(es): {comic.comic.autor}</p>
              <p>Año de Publicación: {comic.comic.anio_publicacion}</p>
              <p >Sinopsis: {comic.comic.sinopsis}</p>
              </div>
            </Col>
          </Row>
      ) : (
        <p className='text-center'>No se encontraron datos del cómic.</p>
      )}
  </div>
  );
}

export default VistaComic;


