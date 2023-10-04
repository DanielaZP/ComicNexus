import React, { useState } from "react";
import { Dropdown, Grid, Image, Input, TextArea, Button, Label, Message } from "semantic-ui-react";

export const RegistroComic = () => {
  const [fechaPublicacion, setFechaPublicacion] = useState("");
  const [errorFecha, setErrorFecha] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [hasImage, setHasImage] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [tituloExcedeLimite, setTituloExcedeLimite] = useState(false);
  const [tituloCorto, setTituloCorto] = useState(false);
  const [autor, setAutor] = useState("");
  const [autorExcedeLimite, setAutorExcedeLimite] = useState(false);
  const [autorCorto, setAutorCorto] = useState(false);
  const [mostrarAdvertencia, setMostrarAdvertencia] = useState(false);
  const [sinopsis, setSinopsis] = useState("");
  const [sinopsisExcedeLimite, setSinopsisExcedeLimite] = useState(false);

  const handleFechaChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      setErrorFecha("La fecha no puede ser posterior a la fecha actual");
      setMostrarAdvertencia(true); 
    } else {
      setErrorFecha("");
      setMostrarAdvertencia(false); 
    }

    setFechaPublicacion(e.target.value);
  };


  const handleTituloChange = (e) => {
    const nuevoTitulo = e.target.value;
    const regex = /^[a-zA-Z0-9%$#&-'/=<>*+,;| ]*$/;

    if (nuevoTitulo.length > 60) {
      setTituloExcedeLimite(true);
    } else {
      setTituloExcedeLimite(false);
    }

    if (nuevoTitulo.length < 3) {
      setTituloCorto(true);
    } else {
      setTituloCorto(false);
    }

    if (regex.test(nuevoTitulo) && nuevoTitulo.length <= 60) {
      setTitulo(nuevoTitulo);
    }
  };

  const handleAutorChange = (e) => {
    const nuevoAutor = e.target.value;
    const regex = /^[a-zA-Z0-9-',. ]*$/;

    if (nuevoAutor.length > 100) {
      setAutorExcedeLimite(true);
    } else {
      setAutorExcedeLimite(false);
    }

    if (nuevoAutor.length < 3) {
      setAutorCorto(true);
    } else {
      setAutorCorto(false);
    }

    if (regex.test(nuevoAutor) && nuevoAutor.length <= 100) {
      setAutor(nuevoAutor);
    }
  };

  const handleSinopsisChange = (e) => {
    const nuevoSinopsis = e.target.value;
    const regex = /^[a-zA-Z-',. ]*$/;
    
    if (regex.test(nuevoSinopsis) && nuevoSinopsis.length <= 500) {
      setSinopsis(nuevoSinopsis);
      setSinopsisExcedeLimite(false); 
    } else {
      setSinopsisExcedeLimite(true);
    }
  };
  /*const estiloFondo = {
    backgroundImage: `url('/Images/fondoComicNexus.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    backgroundPosition: "center"
  };*/

  const options = [
    { key: "Terror", value: "Terror", text: "Terror" },
    { key: "Accion", value: "Accion", text: "Acción" },
    { key: "CienciaFiccion", value: "CienciaFiccion", text: "Ciencia Ficción" },
    { key: "Romance", value: "Romance", text: "Romance" },
    { key: "Comedia", value: "Comedia", text: "Comedia" },
  ];
  const [selectedCategorias, setSelectedCategorias] = useState([]);
  const handleCategoriaChange = (e, { value }) => {
    setSelectedCategorias(value);
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
        <h1 className="ui center aligned header">Registrar Comic</h1>
  
      <Grid columns={2}>
        <Grid.Column>
          <div className="form-group">
            <label htmlFor="imagen"></label>
            <div className="image-container">
              {hasImage ? (
                <Image src={imageUrl} className="imagen-previa" alt="Imagen seleccionada" />
              ) : (
                <div
                  className="empty-image-container"
                  style={{
                    width: "300px",
                    height: "470px",
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
                className="select-image-button btn custom-btn-color"
              >
                Seleccionar Imagen<span className="text-danger">*</span>
              </button>
            </div>
            <input type="file" accept="image/*" onChange={handleImageUpload} id="imagen" name="imagen" style={{ display: "none" }} />
          </div>
        </Grid.Column>

        <Grid.Column>
          <form className="formRegister">
          <div className="ui large form">
          <div className="field">
              <label>Titulo <span className="text-danger">*</span></label>
              <Input
                placeholder="Ingrese el titulo del comic"
                name="titulo"
                type="text"
                value={titulo}
                onChange={handleTituloChange}
                maxLength="80"
                required
              />
              {tituloExcedeLimite && (
                  <Message size="mini" negative>
                    <p>El título supera el límite de caracteres.</p>
                  </Message>
                )}
                {tituloCorto && (
                  <Message size="mini" negative>
                    <p>El título es demasiado corto.</p>
                  </Message>
                )}
              
            </div>

          <div className="field">
              <label>Autores </label>
              <Input 
              placeholder="Ingrese los autores" 
              name="autores" 
              type="text" 
              value={autor}
              onChange={handleAutorChange}
            />
            {autorExcedeLimite && (
                  <Message size="mini" negative>
                    <p>El nombre supera el límite de caracteres.</p>
                  </Message>
                )}
                {autorCorto && (
                  <Message size="mini" negative>
                    <p>El nombre es demasiado corto.</p>
                  </Message>
                )}
            </div>
             
            <div className="field">
              <label>Categorías <span className="text-danger">*</span></label>
              <Dropdown
                placeholder="Seleccione la o las categorias"
                /*className="form-control"*/
                name="categorias"
                options={options}
                selection
                multiple
                value={selectedCategorias}
                onChange={handleCategoriaChange}
               
                required
              />
            </div>

            <div className="field">
              <label>Año de Publicación</label>
                <Input
                  type="date"
                  placeholder="dd/mm/aaaa"
                  id="fechaPublicacion"
                  name="fechaPublicacion"
                  value={fechaPublicacion}
                  onChange={handleFechaChange}
                  max={new Date().toISOString().split("T")[0]}
                />
                {mostrarAdvertencia && (
                  <Message size="mini" negative>
                    <p>{errorFecha}</p>
                  </Message>
                )}
            </div>

            <div className="field">
              <label>Sinopsis: <span className="text-danger">*</span></label>
              <TextArea
                /*className="form-control"*/
                id="sinopsis"
                name="sinopsis"
                value={sinopsis}
                onChange={handleSinopsisChange}
                required
              />
              {sinopsisExcedeLimite && (
                <Message size="mini" negative>
                <p>La sinopsis supera el limite de caracteres.</p>
                </Message>
              )}
            </div>
            
            <div className="d-flex justify-content-between">
              <Button type="button" className="custom-button">Cancelar</Button>
              <Button type="reset" className="custom-button">Limpiar</Button>
              <Button type="submit" className="custom-button">Guardar</Button>
            </div>

          </div>
          </form>
        </Grid.Column>
      </Grid>
    </div>
    
  );
};