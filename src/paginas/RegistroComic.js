import React, { useState } from "react";

export const RegistroComic = () => {
  const [fechaPublicacion, setFechaPublicacion] = useState("");

  const handleFechaChange = (e) => {
    setFechaPublicacion(e.target.value);
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">Registrar Comic</h1>
      <div className="row">
        <div className="col-6">
          <img
            src="./heroes/marvel-iron.jpg"
            class="img-thumbnail mx-auto d-block"
            style={{ width: "300px" }}
            alt="..."
          />
        </div>
        <div className="col-6">
          <form className="formRegister">
            <div className="form-group">
              <label className="form-label" htmlFor="titulo">
                Título
              </label>
              <input
                className="form-control"
                type="text"
                id="titulo"
                name="titulo"
              />
            </div>
            <div className="form-group">
              <label htmlFor="autores">Autores</label>
              <input
                className="form-control"
                type="text"
                id="autores"
                name="autores"
              />
            </div>
            <div className="form-group">
              <label htmlFor="categorias">Categorías</label>
              <input
                className="form-control"
                type="text"
                id="categorias"
                name="categorias"
              />
            </div>
            <div className="form-group">
              <label htmlFor="fechaPublicacion">Año de Publicación</label>
              <input
                className="form-control"
                type="date"
                id="fechaPublicacion"
                name="fechaPublicacion"
                value={fechaPublicacion}
                onChange={handleFechaChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="sinopsis">Sinopsis:</label>
              <textarea
                className="form-control"
                id="sinopsis"
                name="sinopsis"
                rows="4"
                cols="50"
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit">Cancelar</button>
              <button type="reset">Limpiar</button>
              <button type="button">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
