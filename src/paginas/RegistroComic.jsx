import React, { useState } from "react";
import Select from "react-select";

export const RegistroComic = () => {
  const [fechaPublicacion, setFechaPublicacion] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [hasImage, setHasImage] = useState(false);

  const handleFechaChange = (e) => {
    setFechaPublicacion(e.target.value);
  };

  const options = [
    { value: "Terror", label: "Terror" },
    { value: "Accion", label: "Acción" },
    { value: "CienciaFiccion", label: "Ciencia Ficción" },
    { value: "Romance", label: "Romance" },
    { value: "Comedia", label: "Comedia" },
  ];
  const [selectedCategorias, setSelectedCategorias] = useState([]);
  const handleCategoriaChange = (selectedOptions) => {
    setSelectedCategorias(selectedOptions);
  };

 
  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImageUrl(imageUrl);
        setHasImage(true); 
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImageUrl(""); 
      setHasImage(false); 
    }
  };


  return (
    <div className="container">
      <h1 className="text-center mb-4">Registrar Comic</h1>
  
      <div className="row">
      <div className="col-6">
          <div className="form-group">
            <label htmlFor="imagen"></label>
            <div className="image-container">
              {hasImage ? (
                <img
                  src={imageUrl}
                  style={{ width: "300px", height: "310px" }}
                  alt="Imagen seleccionada"
                />
              ) : (
                <div
                  className="empty-image-container"
                  style={{
                    width: "300px",
                    height: "310px",
                    border: "1px dashed #ccc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Ingrese una imagen de tamaño:
                </div>
              )}
              <button
                onClick={() => document.getElementById("imagen").click()}
                className="select-image-button"
              >
                Seleccionar Imagen
              </button>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="imagen"
              name="imagen"
              style={{ display: "none" }}
            />
          </div>
        </div>
        
        <div className="col-6">
          <form className="formRegister">
            <div className="form-group">
              <label className="form-label" htmlFor="titulo">
                Título <span className="text-dangerous">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                id="titulo"
                name="titulo"
                maxlength="60"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="autores">Autores</label>
              <input
                className="form-control"
                type="text"
                id="autores"
                name="autores"
                maxlength="100"
              />
            </div>
            <div className="form-group">
              <label htmlFor="categorias"> Categorías<span className="text-dangerous">*</span></label>
              <Select
               name="categorias"
               options={options}
               isMulti
               value={selectedCategorias}
               onChange={handleCategoriaChange}
               />
            </div>
            
            <div className="form-group">
              <label htmlFor="fechaPublicacion">Año de Publicación</label>
              <input
                className="form-control"
                type="date"
                placeholder="dd/mm/aaaa"
                id="fechaPublicacion"
                name="fechaPublicacion"
                value={fechaPublicacion}
                onChange={handleFechaChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="sinopsis">Sinopsis: <span className="text-dangerous">*</span>
              </label>
              <textarea
                className="form-control"
                id="sinopsis"
                name="sinopsis"
                maxlength="500"
                required
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type="button">Cancelar</button>
              <button type="reset">Limpiar</button>
              <button type="submit">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
