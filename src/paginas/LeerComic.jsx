import "./styles.css";
import React, { forwardRef , useState, useEffect} from "react";
import pageFlipSFX from '../page-flip-01a.mp3';
import { BiSolidChevronLeft, BiSolidChevronRight } from 'react-icons/bi';
import {TbBoxMultiple} from 'react-icons/tb';
import { IoArrowBackCircle } from 'react-icons/io5';
import {AiOutlineFullscreen} from 'react-icons/ai'
import HTMLFlipBook from "react-pageflip";
import useSound from "use-sound";
import { Container, Button, Spinner } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocalStorage } from 'react-use';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function LeerComic() {
  const [isLoading, setIsLoading] = useState(true); 
  const codcontenido = localStorage.getItem('cod_contenido');
  const [imageUrls, setImageUrls] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  let navigate = useNavigate();
  // Variables de estado para controlar la visibilidad de los botones
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);

  const toggleFullScreen = () => {
    const flipBookContainer = document.querySelector('.flipbook');
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      if (flipBookContainer) {
        flipBookContainer.requestFullscreen();
      }
    } };
  
  const changemode = (e) =>{
    alert("sin funcionamiento")
  }
  const [soundOn, setSoundOn] = React.useState(true);
  const [play] = useSound(pageFlipSFX);
  const flipbook = React.useRef(null);
  console.log(forwardRef);

  const onFlip = React.useCallback(
    (e) => {soundOn && play(); },
    [play, soundOn]
  );

  const flipBack = React.useCallback(() => {
    const pageFlipObj = flipbook.current.pageFlip();
      pageFlipObj.flipPrev();
      setShowPrevButton(pageFlipObj.getCurrentPageIndex() > 1);  
      setShowNextButton(true)
      setCurrentPage(pageFlipObj?.getCurrentPageIndex());
  }, [flipbook]);

  const flipForward = React.useCallback(() => {
    const pageFlipObj = flipbook.current.pageFlip();
    if (
      !(pageFlipObj?.getCurrentPageIndex() + 2 ===
      pageFlipObj?.getPageCount())
    ) {
      pageFlipObj.flipNext();
      setShowPrevButton(true);  
      setShowNextButton(pageFlipObj.getCurrentPageIndex() + 4 !==
        pageFlipObj.getPageCount());
        let array = [pageFlipObj?.getCurrentPageIndex()+2, pageFlipObj?.getCurrentPageIndex()+3]; // array es [1, 2]
        let separador = "-";
        let cadena = array.join(separador); // cadena es "1-2"
      setCurrentPage(cadena);
    }
  }, [flipbook]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 37) { // Tecla de flecha izquierda
        flipBack();
      } else if (event.keyCode === 39) { // Tecla de flecha derecha
        flipForward();
      }
    };
    
    // Agregar el evento keydown al documento
    document.addEventListener('keydown', handleKeyPress);
  
    // Remover el evento keydown al desmontar el componente
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [flipBack, flipForward]);

  const backpage = (e)=>{
    navigate(-1)
  }

  const handlePageChange = (e) => {
    setCurrentPage(parseInt(e.target.value));
    const pageFlipObj = flipbook.current.pageFlip();
    pageFlipObj.flip(e)
  };

  useEffect(() => {
    // Llamar a la API de Laravel para obtener las imágenes
    axios.get(`https://comic-next-laravel.vercel.app/api/api/getpaginas/${codcontenido}`)
      .then((response) => {
        // axios ya transforma la respuesta JSON automáticamente
        setImageUrls(response.data);
        
      })
      .catch((error) => {
        console.error("Error al obtener las imágenes del comic:", error);
      })
      .finally(() => {
        // Establece isLoading en false una vez que la solicitud se ha completado (ya sea con éxito o con error)
        setIsLoading(false);
      });
  }, []);
  

  return (
    <div className="Leer">
      <Container className="text-center my-5">
        <div className="button-container">
          <Button variant="link" className="control-button" onClick={backpage}>
            <IoArrowBackCircle  />
            <span>Atrás</span>
          </Button>
          <Button variant="link" className="control-button" onClick={changemode}>
            <TbBoxMultiple /> 
            <span>Cascada</span>
          </Button>
          <Button variant="link" className="control-button" onClick={toggleFullScreen}>
            <AiOutlineFullscreen /> 
            <span>Pantalla Completa</span>
          </Button>
        </div>
      </Container>
      <Container className="text-center my-5">
      <hr className="my-4 custom-divider"  />
      </Container>
      <div className="flipbook-container">
        <div className="persistent-buttons">
          {showPrevButton && (<Button variant="link" className="prev-button" onClick={flipBack}>
            <BiSolidChevronLeft size="5em"/>
          </Button>)}
          </div>
        <div className="flipbook">
        {isLoading ? (
        <Container className="text-center my-5" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '50%', width: '200px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Spinner animation="border" variant="primary" role="status">
            <span className="sr-only"></span>
          </Spinner>
          <p className="mt-2">Cargando paginas...</p>
        </Container>
      ) :   imageUrls.length === 1 ? (
        <Container className="text-center my-5" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '50%', width: '450px', height: '75px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ fontSize: "20px"}}>
          El cómic seleccionado no tiene contenido subido.
        </p>
        </Container>
      ) : 
      (<HTMLFlipBook 
            ref={flipbook}
            onFlip={onFlip}
            width={450}
            height={530}
            size="fixed"
            showCover={true}
            drawShadow={false}
            flippingTime={750}
            useMouseEvents={false}
            autoSize={true}
            mobileScrollSupport={true}
          >
          {imageUrls.map((imageUrl, index) => (
          <div key={index} className="page">
            <LazyLoadImage
          key={index}
          src={imageUrl.pagina}
          alt={`Page ${index}`}
          effect="blur" // Efecto de carga (puedes cambiarlo según tu preferencia)
          width={450}
          height={530}
          className="full-image"
          placeholderSrc={imageUrl.pagina}
        />
            
            <img src={imageUrl.pagina} className="full-image" alt={`Page ${index}`} loading="lazy"/>
          </div> ))}
          </HTMLFlipBook>) }
        </div>
          {showNextButton && <Button variant="link" className="next-button" onClick={flipForward}>
          <BiSolidChevronRight size="5em" />
        </Button>}
      </div>
      <Container className="select-page">
        <div className="numero-page">
          <h2>
            <span className="badge rounded-pill text-bg-light">
              {currentPage} / {imageUrls.length} page
            </span>
          </h2>
        </div>
        <select
          className="form-select"
          aria-label="Default select example"
          value={currentPage}
          onChange={handlePageChange}
        >
          {imageUrls.map((_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </Container>
    </div>
  );
}
