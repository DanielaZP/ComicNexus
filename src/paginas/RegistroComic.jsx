import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Grid, Image, Input, TextArea, Button, Label, Message, Modal } from "semantic-ui-react";
import { Container } from 'react-bootstrap';
import Axios from 'axios';

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
  const [sinopsisCortaError, setSinopsisCortaError] = useState(false);
  const [campoObligatorioTituloError, setCampoObligatorioTituloError] = useState(false);
  const [campoObligatorioSinopsisError, setCampoObligatorioSinopsisError] = useState(false);
  const [campoObligatorioPortadaError, setCampoObligatorioPortadaError] = useState(false);
  const [campoObligatorioCategoriaError, setCampoObligatorioCategoriaError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileExtensionError, setFileExtensionError] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [campoTituloDuplicado, setCampoTituloDuplicado] = useState(false);
  
  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    setCampoObligatorioPortadaError(false);
  
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
  
      if (fileExtension === 'jpg' || fileExtension === 'png') {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target.result;
          const codificado = extractBase64Code(imageUrl);
  
          setImageUrl(imageUrl);
          setHasImage(true);
          setFileExtensionError(false);
  
          // Actualiza el estado "portada" con el valor codificado
          setData((prevData) => ({
            ...prevData,
            portada: codificado,
            selectedFile: selectedFile.name, 
          }));
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
      setData((prevData) => ({
        ...prevData,
        portada: "", 
        selectedFile: "", 
      }));
    }
  };
  
  const extractBase64Code = (dataURL) => {
    const base64Code = dataURL.split(',')[1];
    return base64Code;
  };


  
  const url = "/localhost"
  const [data, setData] = useState({
    titulo:"",
    autor:"",
    sinopsis:"",
    selectedCategorias:{},
    fechaPublicacion:"",
    selectedFile:"",
    portada:""

  })
  
  function handleSubmit(e){
    const newdata={...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
    submit(e)
    //toBase64(newdata.selectedFile)
  }


  function submit(e){
    
    e.preventDefault();

    Axios.post('http://localhost/ComicNext_laravel/public/api/registro', {
      titulo: data.titulo,
      autor: data.autor,
      sinopsis: data.sinopsis,
      anio_publicacion: data.fechaPublicacion,
      portada: data.portada,
      categoria: data.selectedCategorias
    })
    .then((response) => {
      console.log(response.data);

    })
    .catch((error) => {
      console.error(error);

    });
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
    console.log("Limpiar haciendo clic");
   // window.location.reload();
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
    setCampoObligatorioPortadaError(false);
    setCampoObligatorioCategoriaError(false);
    setImageUrl(""); 
    setHasImage(false);
  };
  
  const handleGuardarClick = () => {
    event.preventDefault();
    if (titulo.trim() === "" || sinopsis.trim()==="" || hasImage == false || data.selectedCategorias.length == 0) {
      setCampoObligatorioTituloError(true);
      setCampoObligatorioSinopsisError(true);
      setCampoObligatorioPortadaError(true);
      setCampoObligatorioCategoriaError(true);
      return; 
    }
  
    Axios.get(`https://comic-next-laravel.vercel.app/api/api/tituloExistente/${titulo}`)
    .then((response) => {
      if (response.data.exists) {
        // El título ya existe en la base de datos, muestra un mensaje de error
        setCampoTituloDuplicado(true);
        console.log("Titulo ya registrado");
      } else {
        // El título no existe en la base de datos, puedes continuar y guardar el cómic
        openModal();
      }
    })
    .catch((error) => {
      console.error(error);
    });
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
      setSinopsisExcedeLimite(false);
      setData((prevData) => ({
        ...prevData,
        sinopsis: e.target.value
      }));
  
      if (nuevoSinopsis.length < 20) {
        setSinopsisCortaError(true);
      } else {
        setSinopsisCortaError(false);
      }
    } else {
      setSinopsisExcedeLimite(true);
      setSinopsisCortaError(false); 
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
    setCampoObligatorioCategoriaError(false);
    setData((prevData) => ({
      ...prevData,
      selectedCategorias: value
    }));
  };


  
  return (

    <div className="container">
      <Container className="text-center mt-5">
        <h3 className="display-4">Registro comic</h3>
        <hr className="my-4" style={{ borderColor: 'var(--celestito)', borderWidth: '2px' }} />
      </Container>

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
              {campoObligatorioPortadaError && (
                <Message size="mini" negative>
                  <p>Por favor, complete este campo obligatorio.</p>
                </Message>
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleImageUpload} id="imagen" name="imagen" style={{ display: "none" }} />
          </div>
        </Grid.Column>

        <Grid.Column>
          <form className="formRegister">
            <div className="ui large form">
              <div className="field">
                <label>Título <span className="text-danger">*</span></label>
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
                {campoTituloDuplicado && (
                  <Message size="mini" negative>
                    <p>Ya existe un cómic con ese título.</p>
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
                  value={data.selectedCategorias}
                  onChange={handleCategoriaChange}

                  required
                />
                {campoObligatorioCategoriaError && (
                  <Message size="mini" negative>
                    <p>Por favor, seleccione al menos una categoría.</p>
                  </Message>
                )}
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
                  min="1985-01-01"  // Establece la fecha mínima
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
                    <p>La sinopsis supera el límite de caracteres.</p>
                  </Message>
                )}
                {sinopsisCortaError && (
                  <Message size="mini" negative>
                    <p>La sinopsis es demasiado corta.</p>
                  </Message>
                )}
                {campoObligatorioSinopsisError && (
                  <Message size="mini" negative>
                    <p>Por favor, complete este campo obligatorio.</p>
                  </Message>
                )}
              </div>

              <div className="d-flex justify-content-between">
                <Link className="btn Warning-btn-color" to="/">Cancelar</Link>
                <a href="#" onClick={handleLimpiarClick} className="btn custom-btn-color">Limpiar</a>
                <button onClick={handleGuardarClick} className="btn custom-btn-color">Guardar</button>
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
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}>
        <Modal.Header>¿Está seguro de añadir el cómic?</Modal.Header>
        <Modal.Actions style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <button className="btn Warning-btn-color" style={{ marginRight: '10px' }} onClick={closeModal}>
            NO
          </button>
          <button className="btn custom-btn-color" onClick={handleSubmit}>
            SÍ
          </button>
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
