import React from 'react';
import { Link } from 'react-router-dom';

function CardCat({ comic }) {
  const { cod_comic, titulo, sinopsis } = comic.comic; // Datos del cómic
  const portadaUrl = comic.portadaUrl; // URL de la portada

  // Crear la URL con el ID del cómic
  const url = `/vista-comic/${cod_comic}`;

  return (
    <div className="card">
      <img
        src={portadaUrl}
        className="card-img-top"
        alt="Portada"
        style={{ width: '100%', objectFit: 'cover', aspectRatio: '293/470' }}
      />
      <div className="card-body" style={{ overflow: 'hidden' }}>
        <h5 className="card-title">{titulo}</h5>
        <hr style={{ margin: '4px 0' }} />
        <p className="card-text" style={{ height: '70px' }}>
          {sinopsis.length > 150 ? `${sinopsis.substring(0, 150)}...` : sinopsis}
        </p>
        {/* Usar Link con la URL que incluye el ID del cómic */}
        <Link to={url} className="btn custom-btn-color">
          Ver cómic
        </Link>
      </div>
    </div>
  );
}

export default CardCat;
