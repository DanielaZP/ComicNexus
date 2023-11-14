import "./styles.css";
import React, { forwardRef } from "react";
import pageFlipSFX from '../page-flip-01a.mp3';
import { BiSolidChevronLeft, BiSolidChevronRight } from 'react-icons/bi';
import {TbBoxMultiple} from 'react-icons/tb';
import { IoArrowBackCircle } from 'react-icons/io5';
import {AiOutlineFullscreen} from 'react-icons/ai'
import HTMLFlipBook from "react-pageflip";
import useSound from "use-sound";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

export default function LeerComic() {
  let navigate = useNavigate();

  const toggleFullScreen = () => {
    const flipBookContainer = document.querySelector('.flipbook');
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      if (flipBookContainer) {
        flipBookContainer.requestFullscreen();
      }
    }
  };
  
  const changemode = (e) =>{
    alert("XD falta tiempo")
  }
  const [soundOn, setSoundOn] = React.useState(true);
  const [play] = useSound(pageFlipSFX);
  const flipbook = React.useRef(null);
  console.log(forwardRef);

  const onFlip = React.useCallback(
    (e) => {
      // console.log(e.object);
      // console.log("Current page: " + e.data);
      soundOn && play();
    },
    [play, soundOn]
  );

  const flipBack = React.useCallback(() => {
    const pageFlipObj = flipbook.current.pageFlip();
    if (pageFlipObj?.getCurrentPageIndex() === 0) {
      pageFlipObj.flip(pageFlipObj?.getPageCount() - 1);
    } else {
      pageFlipObj.flipPrev();
    }
  }, [flipbook]);

  const flipForward = React.useCallback(() => {
    const pageFlipObj = flipbook.current.pageFlip();
    if (
      pageFlipObj?.getCurrentPageIndex() + 2 ===
      pageFlipObj?.getPageCount()
    ) {
      // pageFlipObj.flip(0);
      console.log("Final")
    } else {
      pageFlipObj.flipNext();
    }
  }, [flipbook]);

  const backpage = (e)=>{
    navigate(-1)
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      flipBack();
    }else if(event.key === 'ArrowRight'){
      flipForward();
    }
  });

  return (
    <div className="Leer">
      <Container className="text-center my-5">
        <div className="button-container">
          <Button variant="link" className="control-button" onClick={backpage}>
            <IoArrowBackCircle  />
            <span>Atras</span>
          </Button>
          <Button variant="link" className="control-button" onClick={changemode}>
            <TbBoxMultiple /> 
            <span>Cascada</span>
          </Button>
          <Button variant="link" className="control-button" onClick={toggleFullScreen}>
            <AiOutlineFullscreen /> 
            <span>Pantalla Completo</span>
          </Button>
        </div>
      </Container>
      <Container className="text-center my-5">
      <hr className="my-4 custom-divider"  />
      </Container>
      
      <div className="flipbook-container">
        <Button variant="link" className="prev-button" onClick={flipBack}>
          <BiSolidChevronLeft size="5em"/>
        </Button>
        <div className="flipbook">
          <HTMLFlipBook 
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
          >
            <div className="page">
              <img src='/LogoComicsNexus.png'/>
            </div>
            <div className="page">
              <img src='heroes/dc-arrow.jpg'  alt='Descripción de la imagen'/>
            </div>
            <div className="page">
            <img src='heroes/dc-flash.jpg'  alt='Descripción de la imagen'/>
            </div>
            <div className="page">
            <img src='heroes/marvel-hulk.jpg'  alt='Descripción de la imagen'/>
            </div>
            <div className="page">
            <img src='heroes/marvel-silver.jpg'  alt='Descripción de la imagen'/>
            </div>
          </HTMLFlipBook>
        </div>
          <Button variant="link" className="next-button" onClick={flipForward}>
          <BiSolidChevronRight size="5em" />
        </Button>
      </div>
    </div>
  );
}
