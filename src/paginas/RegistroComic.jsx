import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Grid, Image, Input, TextArea, Button, Label, Message, Modal } from "semantic-ui-react";
import Axios from "axios"; 

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
  const [campoObligatorioTituloError, setCampoObligatorioTituloError] = useState(false);
  const [campoObligatorioSinopsisError, setCampoObligatorioSinopsisError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileExtensionError, setFileExtensionError] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  
    const url = "/localhost"
    const [data, setData] = useState({
      titulo:"",
      autor:"",
      sinopsis:"",
      categorias:{},
      fechaPublicacion:""
    })
    function handleSubmit(e){
      const newdata={...data}
      newdata[e.target.id] = e.target.value
      setData(newdata)
      console.log(newdata)
    }
    function submit(e){
      e.preventDefault();
      Axios.post(url,{
        titulo: data.titulo,
        autor: data.autor,
        sinopsis: data.sinopsis
      })
        .then(res => {
          console.log(res.date)
        })
    }
  
  const openErrorModal = () => {
    setIsErrorModalOpen(true);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLimpiarClick = () => {
    setTitulo("");
    setTituloExcedeLimite(false);
    setTituloCorto(false);
    setAutor("");
    setAutorExcedeLimite(false);
    setAutorCorto(false);
    setSelectedCategorias([]); 
    setFechaPublicacion("");
    setErrorFecha("");
    setMostrarAdvertencia(false);
    setSinopsis("");
    setSinopsisExcedeLimite(false);
    setCampoObligatorioTituloError(false);
    setCampoObligatorioSinopsisError(false);
    setImageUrl(""); 
    setHasImage(false);
  };

  const handleGuardarClick = () => {
    event.preventDefault();
    if (titulo.trim() === "" ||sinopsis.trim()==="") {
      setCampoObligatorioTituloError(true);
      setCampoObligatorioSinopsisError(true);
      return; 
    }
  
    // guardar datos bd cambiar el campoobliagatorio personalizado con varios elf is
    openModal();
  };

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

    setData((prevData) => ({
      ...prevData,
      fechaPublicacion: e.target.value
    }));

    setFechaPublicacion(e.target.value);
  };


  const handleTituloChange = (e) => {
    const nuevoTitulo = e.target.value;
    setCampoObligatorioTituloError(false);
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
      setData((prevData) => ({
        ...prevData,
        titulo: e.target.value
      }));
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
      setData((prevData) => ({
        ...prevData,
        autor: e.target.value
      }));
    }
  };

  const handleSinopsisChange = (e) => {
    const nuevoSinopsis = e.target.value;
    setCampoObligatorioSinopsisError(false);
    const regex = /^[a-zA-Z-',. ]*$/;
    
    if (regex.test(nuevoSinopsis) && nuevoSinopsis.length <= 500) {
      setSinopsis(nuevoSinopsis);
      setSinopsisExcedeLimite(false); 
      setData((prevData) => ({
        ...prevData,
        sinopsis: e.target.value
      }));
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
    { key: "1", value: "Terror", text: "Terror" },
    { key: "2", value: "Accion", text: "Acción" },
    { key: "3", value: "CienciaFiccion", text: "Ciencia Ficción" },
    { key: "4", value: "Comedia", text: "Comedia" },
  ];
  const [selectedCategorias, setSelectedCategorias] = useState([]);
  const handleCategoriaChange = (e, { value }) => {
    setSelectedCategorias(value);
  };

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

      if (fileExtension === 'jpg' || fileExtension === 'png') {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target.result;
          setImageUrl(imageUrl);
          setHasImage(true);
          setFileExtensionError(false); 
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFileExtensionError(true);
        openErrorModal();
      }
    } else {
      setImageUrl("");
      setHasImage(false);
      setFileExtensionError(false); 
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
                value={data.titulo}
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
                {campoObligatorioTituloError && (
                  <Message size="mini" negative>
                  <p>Por favor, complete este campo obligatorio.</p>
                  </Message>
                )}
              
            </div>

          <div className="field">
              <label>Autores </label>
              <Input 
              placeholder="Ingrese los autores" 
              name="autores" 
              type="text" 
              value={data.autor}
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
                  value={data.fechaPublicacion}
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
                value={data.sinopsis}
                onChange={handleSinopsisChange}
                required
              />
              {sinopsisExcedeLimite && (
                <Message size="mini" negative>
                <p>La sinopsis supera el limite de caracteres.</p>
                </Message>
              )}
              {campoObligatorioSinopsisError && (
                  <Message size="mini" negative>
                  <p>Por favor, complete este campo obligatorio.</p>
                  </Message>
                )}
            </div>
            
            <div className="d-flex justify-content-between">
            <Link class="btn Warning-btn-color" to= "/">Cancelar</Link>
            <a href="#" onClick={handleLimpiarClick} class="btn custom-btn-color">Limpiar</a>
            <button onClick={handleGuardarClick} className="btn custom-btn-color"> Guardar</button>
            </div>

          </div>
          </form>
        </Grid.Column>
      </Grid>
      <Modal open={isModalOpen} onClose={closeModal} style={{
           position: 'absolute',
           top: '50%',
           left: '50%',
           transform: 'translate(-50%, -50%)',
           width: '30%', 
           height: '20%',
        }}>
        <Modal.Header>¿Está seguro de añadir el comic?</Modal.Header>
        <Modal.Actions>
          <Button color="red" onClick={closeModal}>
            NO
          </Button>
          <Button type="submit" color="green" onClick={handleSubmit}>
            SÍ
          </Button>
          
        </Modal.Actions>
      </Modal>

      <Modal open={isErrorModalOpen} onClose={closeErrorModal} style={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '30%', 
        height: '20%',
       }}>
        <Modal.Content>
          <p>Por favor, seleccione una imagen con extensión .jpg o .png.</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={closeErrorModal}>
            Cerrar
          </Button>
        </Modal.Actions>
      </Modal>

    </div>
    
  );
};
