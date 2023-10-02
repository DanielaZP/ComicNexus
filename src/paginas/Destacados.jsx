import React from 'react';

const comicArray = [
  {
    imagenUrl: './heroes/marvel-iron.jpg',
    titulo: 'Marvel Iron Man',
    descripcion: 'Descripción corta del cómic Iron Man'
  },
  {
    imagenUrl: './heroes/dc-batman.jpg',
    titulo: 'DC Batman',
    descripcion: 'Descripción corta del cómic Batman'
  },
  {
    imagenUrl: './heroes/dc-black.jpg',
    titulo: 'DC Black',
    descripcion: 'Descripción corta del cómic DC Black'
  }
];

const Destacados = () => {
  return (
    <div style={{ marginTop: '50px', height: '600px', overflowY: 'scroll', textAlign: 'center' }}>
      {comicArray.map((comic, index) => (
        <div key={index} style={{ marginBottom: '30px', width: '70%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ marginRight: '20px' }}>
            <img src={comic.imagenUrl} alt={`Comic ${index + 1}`} style={{ width: '200px', height: '300px' }} />
          </div>
          <div>
            <h2>{comic.titulo}</h2>
            <p>{comic.descripcion}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Destacados;
