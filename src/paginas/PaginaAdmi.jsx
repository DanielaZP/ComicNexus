import { Container, Modal, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocalStorage } from 'react-use'; 

function PaginaAdmi() {
    const [showModal, setShowModal] = useState(false);
    const [selectedComic, setSelectedComic] = useState(null);
    const [comicsData, setComicsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const navigate = useNavigate();
    const [nuevo, setNuevo ]= useLocalStorage('codComic');
    //conexion
    useEffect(() => {
        axios.get('https://comic-next-laravel.vercel.app/api/api/listascomics') 
          .then((response) => {
            console.log(response.data);
            setComicsData(response.data);
          })
          .catch((error) => {
            console.error('Error al obtener datos:', error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, []);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSelectComic = (comic) => {
      setSelectedComic(comic);
      handleCloseModal();
      localStorage.setItem('codComic', comic.comic.cod_comic);
      navigate(`/editar-comic/${comic.comic.cod_comic}`, { state: { selectedComic: comic } });
    };
    
    if (isLoading) {
        return <p>Cargando...</p>; 
      }

  return (
    <div  style={{ margin: '20px' }}>
        <Container className="text-center my-5">
            <h1 className="display-4 badabb">Panel administrador</h1>
            <hr className="my-4" style={{ borderColor: 'var(--celestito)', borderWidth: '2px' }}/>
        </Container>
        <div class="row">
        <div class="col-sm-6 mb-4 mb-sm-0">
            <div class="card text-center">
            <div class="card-body">
                <h5 class="card-title">Añadir nuevo cómic a la plataforma</h5>
                <p class="card-text">Para registrar un nuevo cómic y agregar sus datos presione el botón de abajo.</p>
                <Link class="btn custom-btn-color" to="/registro-comic">Añadir cómic</Link>
            </div>
            </div>
        </div>
         <div class="col-sm-6 mb-4">
            <div class="card text-center">
            <div class="card-body">
                <h5 class="card-title">Añadir nuevo contenido de cómic a la plataforma</h5>
                <p class="card-text">Para agregar nuevo contenido de un cómic presione el botón de abajo.</p>
                <Link class="btn custom-btn-color" to="/contenido-comic">Añadir contenido</Link>
            </div>
            </div>
        </div> 
        <div class="col-sm-6 mb-4 mx-auto">
            <div class="card text-center">
            <div class="card-body">
                <h5 class="card-title">Editar un cómic de la plataforma</h5>
                <p class="card-text">Para editar datos de un cómic ya registrado presione el botón de abajo.</p>
                <button class="btn custom-btn-color" onClick={handleShowModal} >Editar cómic</button>
            </div>
            </div>
        </div> 
        </div>
        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>¿A que cómic le gustaría editar la información?</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: 'calc(80vh - 20px)', overflowY: 'auto' }}>
          <ul className='playlist-list'>
            {comicsData.map((comic) => (
              <li key={comic.comic.id}>
                <div className='playlist-item'>
                  <img
                    src={comic.portadaUrl}
                    alt={comic.comic.titulo}
                    className='contenido-image'
                  />
                  <span className='playlist-title'>{comic.comic.titulo}</span>
                  <Link to='editar-comic'></Link>
                  <button
                    className='btn custom-btn-color'
                    onClick={() => handleSelectComic(comic)}
                  >
                    Seleccionar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn Warning-btn-color" onClick={handleCloseModal}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default PaginaAdmi