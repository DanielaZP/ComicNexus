import React, { useEffect, useState } from 'react';
import { Container, Spinner, Row, Col, Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Favoritos = () => {
  const [comicsData, setComicsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedComic, setSelectedComic] = useState(null);

  useEffect(() => {
    // Lógica para obtener la lista de cómics favoritos (puedes mantener esta lógica si es necesario)
    // axios
    //   .get(`https://comic-next-laravel.vercel.app/api/api/comicFavorites/${codUsuario}`)
    //   .then((response) => {
    //     console.log(response.data);
    //     setComicsData(response.data);
    //   })
    //   .catch((error) => {
    //     console.error('Error al obtener datos de favoritos:', error);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });

    // Para propósitos de demostración, utilizamos un array vacío
    setComicsData([]);
    setIsLoading(false);
  }, []); // Dependencias vacías para ejecutar solo una vez al montar el componente

  const handleShowModal = (comic) => {
    setSelectedComic(comic);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedComic(null);
    setShowModal(false);
  };

  const handleDeleteComic = () => {
    // Lógica para eliminar el cómic de la lista de favoritos (puedes mantener esta lógica si es necesario)
    // axios
    //   .delete('https://comic-next-laravel.vercel.app/api/api/deleteComicFavorites', {
    //     data: {
    //       cod_comic: selectedComic.comic.cod_comic,
    //       cod_usuario: codUsuario,
    //     },
    //   })
    //   .then((response) => {
    //     console.log('Éxito al eliminar el cómic', response.data);
    //     setComicsData((prevComicsData) =>
    //       prevComicsData.filter((comic) => comic.comic.cod_comic !== selectedComic.comic.cod_comic)
    //     );
    //   })
    //   .catch((error) => {
    //     console.error('Error al eliminar el cómic de favoritos:', error);
    //   })
    //   .finally(() => {
    //     handleCloseModal();
    //   });

    // Para propósitos de demostración, simplemente cerramos el modal
    handleCloseModal();
  };

  return (
    <div>
      {isLoading ? (
        <Container className="text-center my-5" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '50%', width: '200px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Spinner animation="border" variant="primary" role="status">
            <span className="sr-only"></span>
          </Spinner>
          <p className="mt-2">Cargando favoritos...</p>
        </Container>
      ) : (
        <Row className="align-items-center">
          <Col md={4} className='text-center' style={{ marginTop: '50px' }}>
            <div
              style={{
                width: '230px',
                height: '200px',
                objectFit: 'cover',
                border: '0px solid white',
                borderRadius: '8px',
                backgroundImage:  'url(/LogoComicsNexus.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginLeft: '200px',
                marginTop: '0px'
              }}
            />
                <div style={{ marginTop: '-40px', textAlign: 'center' }}>
      {isLoading ? (
        <Container className="text-center my-5" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '50%', width: '200px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Spinner animation="border" variant="primary" role="status">
            <span className="sr-only"></span>
          </Spinner>
          <p className="mt-2">Cargando favoritos...</p>
        </Container>
      ) : (
        // Aquí puedes agregar tu contenido cuando no está cargando
        <>
          {/* Línea que deseas agregar */}
          <Container className="text-center my-4">
            <hr className="my-5" style={{ borderColor: 'var(--celestito)', borderWidth: '1px', marginLeft: 'px', }} />
          </Container>
        </>
      )}
    </div>
          </Col>
          <Col md={6}>
            <div className="content-container custom-form-container">
              <h1 className="display-4 badabb">
                <strong>Mis Favoritos</strong>
              </h1>
              <h3>Lista de favoritos variados</h3>
            </div>
          </Col>
          {/* Resto del código para mostrar la lista de cómics */}
        </Row>
      )}
      {/* Resto del código para mostrar la lista de cómics y el modal */}
    </div>
  );
};

export default Favoritos;
