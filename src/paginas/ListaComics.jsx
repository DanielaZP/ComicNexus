
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// import imagenError from '../ruta/de/tu/imagen-de-error.jpg'; // Ruta de tu imagen de error

function ListaComics() {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    // Hacer la solicitud HTTP a tu servidor Laravel
    axios.get('http://127.0.0.1:8000/api/comics')
      .then(response => {
        setComics(response.data);
      })
      .catch(error => {
        console.error('Error fetching comics:', error);
      });
  }, []);

  return (
    
    <div className='container'>
      <div className="row row-cols-1 row-cols-md-4 g-4 mt-4">
        {comics.map(comic => (
          <div className="col" key={comic.cod_comic}>
            {/* Utiliza la interpolación de cadenas para obtener la URL de la imagen */}
            <img
              src={`http://127.0.0.1:8000/api/images/${comic.cod_comic}`}
              alt='Comic Cover'
              onError={(e) => {
                // e.target.onerror=null;
                e.target.src='http://127.0.0.1:8000/api/images/1'; // Establece la imagen de reserva si hay un problema al cargar la imagen
                // e.target.alt = 'Imagen no encontrada'; // Cambia el texto alternativo
              }}
            />
           <h5 class="card-title">{comic.titulo}</h5>
           <p class="card-text">{comic.sinopsis}</p>
           <a href="#" class="btn custom-btn-color">Ver comic</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaComics;
