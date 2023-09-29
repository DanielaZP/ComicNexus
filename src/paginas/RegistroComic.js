import React, { useState } from 'react';

export const RegistroComic = () => {
  const [fechaPublicacion, setFechaPublicacion] = useState('');

  const handleFechaChange = (e) => {
    setFechaPublicacion(e.target.value);
  };

  return (
<div>
      <h1>Registrar Comic</h1>
      <form className='formRegister'>
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input type="text" id="titulo" name="titulo" />
        </div>
        <div className="form-group">
          <label htmlFor="autores">Autores:</label>
          <input type="text" id="autores" name="autores" />
        </div>
        <div className="form-group">
          <label htmlFor="categorias">Categorías:</label>
          <input type="text" id="categorias" name="categorias" />
        </div>
        <div className="form-group">
          <label htmlFor="fechaPublicacion">Año de Publicación:</label>
          <input
            type="date"
            id="fechaPublicacion"
            name="fechaPublicacion"
            value={fechaPublicacion}
            onChange={handleFechaChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sinopsis">Sinopsis:</label>
          <textarea id="sinopsis" name="sinopsis" rows="4" cols="50" />
        </div>
        <div className="button-group">
          <button type="submit">Cancelar</button>
          <button type="reset">Limpiar</button>
          <button type="button">Guardar</button>
        </div>
      </form>
    </div>
  );
};


