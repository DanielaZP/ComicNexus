import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dropdown, Grid, Image, Input, TextArea, Button, Label, Message, Modal } from "semantic-ui-react";
import { Container, Row, Col } from 'react-bootstrap';
import Axios from 'axios';

function EditarComic({ selectedComic }) {
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
  const [isComicSubidoConExito, setIsComicSubidoConExito] = useState(false);
  const [errorSubidaComic, setErrorSubidaComic] = useState("");
  const [caracterNoPermitidoSinopsis, setCaracterNoPermitidoSinopsis] = useState(false);
  const [isLoading , setIsLoading] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const selectedComicData = location.state?.selectedComic || null;

  useEffect(() => {
    // Verifica si hay un cómic seleccionado
    if (selectedComicData) {
      // Actualiza el estado con los datos del cómic seleccionado
      setData({
        titulo: selectedComicData.comic.titulo,
        autor: selectedComicData.comic.autor,
        sinopsis: selectedComicData.comic.sinopsis,
        fechaPublicacion: selectedComicData.comic.anio_publicacion,
        selectedCategorias: selectedComicData.comic.categoria,
      });

      // Verifica si hay una portada y actualiza el estado correspondiente
      if (selectedComicData.portadaUrl) {
        setImageUrl(selectedComicData.portadaUrl);
        setHasImage(true);
      }
    }
  }, [selectedComicData]);
  
  const handleCloseComicSubidoConExito = () => {
    setIsComicSubidoConExito(false); // Cierra el modal de éxito
  
    // Restaura los valores iniciales de los campos
    setData({
      titulo: "",
      autor: "",
      sinopsis: "",
      fechaPublicacion: "",
      selectedCategorias: [],
    });
  
    setImageUrl(null);
    setHasImage(false);

    navigate('/lista-comics');
  };

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

  const [data, setData] = useState({
    titulo: "",
    autor: "",
    sinopsis: "",
    selectedCategorias: [],
    fechaPublicacion: "",
    selectedFile: "",
    portada: ""

  });


  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
  
    Axios.post('https://comic-next-laravel.vercel.app/api/api/editar/' + localStorage.getItem('codComic'), {
      titulo: data.titulo,
      autor: data.autor,
      sinopsis: data.sinopsis,
      anio_publicacion: data.fechaPublicacion,
      portada: data.portada,
      categoria: data.selectedCategorias
    })
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        setIsModalOpen(false); // Cierra el modal después del envío exitoso
        setIsComicSubidoConExito(true); // Muestra el mensaje de éxito
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setIsErrorModalOpen(false); // Cierra el modal de error en caso de un error
        setErrorSubidaComic("Error al subir el cómic"); // Muestra el mensaje de error
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

  const handleGuardarClick = () => {
    event.preventDefault();

    let tituloError = false;
    let sinopsisError = false;
    let portadaError = false;
    let categoriaError = false;

    if (data.titulo.trim() === "") {
      tituloError = true;
    }
    if (data.sinopsis.trim() === "") {
      sinopsisError = true;
    }
    if (!hasImage) {
      portadaError = true;
    }
    if (data.selectedCategorias.length === 0) {
      categoriaError = true;
    }

    setCampoObligatorioTituloError(tituloError);
    setCampoObligatorioSinopsisError(sinopsisError);
    setCampoObligatorioPortadaError(portadaError);
    setCampoObligatorioCategoriaError(categoriaError);

    // Si hay errores, no continuar
    if (tituloError || sinopsisError || portadaError || categoriaError) {
      return;
    }

    // Realizar la validación de título solo si el título ha sido modificado
    if (data.titulo !== selectedComicData.comic.titulo) {
      Axios.get(`https://comic-next-laravel.vercel.app/api/api/tituloExistente/${data.titulo}`)
        .then((response) => {
          if (response.data.exists) {
            setCampoTituloDuplicado(true);
            console.log("Titulo ya registrado");
          } else {
            openModal();
          }
        })
        .catch((error) => {
          console.error(error);
          // Manejar errores de la solicitud a la API
          openErrorModal();
        });
    } else {
      openModal();
    }
  };
    
  const handleFechaChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      setErrorFecha("La fecha no puede ser posterior a la fecha actual.");
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
    setCampoTituloDuplicado(false);
    const regex = /^[a-zA-Z0-9%$#&-'/=<>*+,;| áéíóúÁÉÍÓÚñÑ]*$/;

    if (nuevoTitulo.length > 60) {
      setTituloExcedeLimite(true);
    } else {
      setTituloExcedeLimite(false);
    }

    if (nuevoTitulo.length < 3 && /[a-zA-Z]/.test(nuevoTitulo)) {
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
    const regex = /^[a-zA-Z0-9-',. áéíóúÁÉÍÓÚñÑ]*$/;

    if (nuevoAutor.length > 100) {
      setAutorExcedeLimite(true);
    } else {
      setAutorExcedeLimite(false);
    }

    if (nuevoAutor.length < 3 && nuevoAutor.length != 0 ) {
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
    const regex = /^[a-zA-Z0-9-',.áéíóúÁÉÍÓÚñÑ!¡ \n]*$/;
  
    if (nuevoSinopsis.length <= 500) {
      setSinopsis(nuevoSinopsis);
      setSinopsisExcedeLimite(false);
      setData((prevData) => ({
        ...prevData,
        sinopsis: e.target.value
      }));
  
      if (nuevoSinopsis.length < 20 && /[a-zA-Z]/.test(nuevoSinopsis)) {
        setSinopsisCortaError(true);
      } else {
        setSinopsisCortaError(false);
      }
  
      if (regex.test(nuevoSinopsis)) {
        setCaracterNoPermitidoSinopsis(false); 
      } else {
        setCaracterNoPermitidoSinopsis(true); 
      }

    } else {
      setSinopsisExcedeLimite(true);
      setSinopsisCortaError(false);
    }
  };

  const handleSinopsisKeyDown = (e) => {
    const nuevoCaracter = e.key;
    const regex = /^[a-zA-Z-',.ñáéíóú!¡ \n]*$/;
  
    if (!regex.test(nuevoCaracter)) {
      e.preventDefault(); 
      setCaracterNoPermitidoSinopsis(true); 
    } else {
      setCaracterNoPermitidoSinopsis(false); 
    }
  };
  
   const estiloFondo = {
    backgroundImage: `url('src/Imagenes/Fondo.jpeg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    backgroundPosition: "center"
  };

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

    <div className="container" >
      <Container className="text-center mt-5">
        <h3 className="display-4 badabb">Editar Comic</h3>
        <hr className="my-4" style={{ borderColor: 'var(--celestito)', borderWidth: '2px' }} />
      </Container>

      <Row>
        <Col lg={6} md={12}>
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
                    //border: "1px dashed #ccc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    border: '3px solid white', 
                    borderRadius: '8px'
                  }}
                >
                  Ingrese una imagen
                </div>
              )}
              <button
                onClick={() => document.getElementById("imagen").click()}
                className="select-image-button btn custom-btn-color"
                style={{border: '3px solid white', 
                borderRadius: '8px'}}
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
        </Col>
        <Col lg={6} md={12}>
          <form className="formRegister">
            <div className="ui large form">
              <div className="field">
                <label>Título <span className="text-danger">*</span></label>
                <Input
                  placeholder="Ingrese el título del cómic"
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
                <label>Autor(es)</label>
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
                <label>Categoría<span className="text-danger">*</span></label>
                <Dropdown
                  placeholder="Seleccione la o las categorías"
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
                  value={data.fechaPublicacion}
                  onChange={handleFechaChange}
                  max={new Date().toISOString().split("T")[0]}
                  min="1986-02-16"
                  onKeyDown={(e) => e.preventDefault()}
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
                  onKeyDown={handleSinopsisKeyDown}
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
                 {caracterNoPermitidoSinopsis && (
                  <Message size="mini" negative>
                   <p>”Ingresó caracteres no permitidos.</p>
                  </Message>   
                )}

              </div>

              <div className="d-flex justify-content-between">
                <Link className="btn Warning-btn-color" to="/inicio">Cancelar</Link>
                <button onClick={handleGuardarClick} className="btn custom-btn-color">Guardar Cambios</button>
              </div>

            </div>
          </form>
        </Col>
      </Row>

      <Modal open={isModalOpen} onClose={closeModal} style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '30%',
        height: '20%',
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}>
        <Modal.Header style={{ textAlign: 'center' }}>
        <h3 style={{ fontWeight: 'bold' }}>Confirmar</h3>
        </Modal.Header>
        <Modal.Content style={{ textAlign: 'center',  marginTop: '-40px' }}>
        <p>¿Está seguro de editar el cómic?</p>
        </Modal.Content>
        <Modal.Actions style={{ display: 'flex', justifyContent: 'center'}}>
          <button className="btn Warning-btn-color" style={{ marginRight: '10px'}} onClick={closeModal}>
            NO
          </button>
          <button className="btn custom-btn-color" onClick={handleSubmit} disabled={isLoading}>
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
      <Modal open={isComicSubidoConExito} onClose={() => setIsComicSubidoConExito(false)} style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '30%',
        height: '20%',
      }}>
        <Modal.Content>
    <p>Comic editado con éxito.</p>
  </Modal.Content>
  <Modal.Actions>
    <Button color="green" onClick={handleCloseComicSubidoConExito}>
      Cerrar
    </Button>
  </Modal.Actions>

      </Modal>
      <Modal open={errorSubidaComic !== ""} onClose={() => setErrorSubidaComic("")} style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '30%',
        height: '20%',
      }}>
        <Modal.Content>
          <p>{errorSubidaComic}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setErrorSubidaComic("")}>
            Cerrar
          </Button>
        </Modal.Actions>
      </Modal>
    </div>

  );
};

export default EditarComic;