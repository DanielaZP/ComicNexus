import React from 'react'
import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios'; // Importa Axios
import CardCat from '../componentes/CardCat'// Importa tu componente Card
import { Spinner } from 'react-bootstrap';

function Comedia() {
  const [comicsData, setComicsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Inicialmente, isLoading se establece en true
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

useEffect(() => {
  // Realiza una solicitud GET a la API de Laravel para obtener los datos de los cómics
  axios.get('https://comic-next-laravel.vercel.app/api/api/categoria/Comedia')
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
const getCurrentComics = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return comicsData.slice(startIndex, endIndex);
  };

  return (
    <div>
      <Container className="text-center my-5">
      <h1 className="display-4 badabb">Sección de comedia</h1>
      <p className="lead">Explora y descubre contenido increíble</p>
      <hr className="my-4" style={{ borderColor: 'var(--celestito)', borderWidth: '2px' }} />
    </Container>
    <div className="container">
        {isLoading ? (
         <div className="text-center my-3">
         <Spinner animation="border" variant="primary" role="status">
           <span className="sr-only">.</span>
         </Spinner>
         <p className="mt-2">Cargando cómics...</p>
       </div>
        ) : comicsData.length === 0 ? (
          <p>No se encontraron cómics en esta categoría.</p>
        ) : (
          <div>
            <div className="row row-cols-1 row-cols-md-4 g-4 mt-4">
              {getCurrentComics().map((comic) => (
                <div className="col-md-4" key={comic.comic.cod_comic}>
                  <CardCat comic={comic} />
                </div>
              ))}
            </div>
            {comicsData.length > itemsPerPage && (
              <div className="mt-4 text-center">
                <button
                  className="btn custom-btn-color mx-2"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Página Anterior
                </button>
                <button
                  className="btn custom-btn-color mx-2"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage * itemsPerPage >= comicsData.length}
                >
                  Siguiente Página
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    
  )
}

export default Comedia