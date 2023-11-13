import "./styles.css";
import React, { forwardRef } from "react";
import pageFlipSFX from '../page-flip-01a.mp3';

import HTMLFlipBook from "react-pageflip";
import useSound from "use-sound";
import { Container } from "react-bootstrap";

export default function LeerComic() {

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

  return (
    <div className="Leer">
      <Container className="text-center my-5">
      <h1 className="display-4 badabb">Temporal</h1>
      <hr className="my-4 custom-divider"  />
    </Container>
      <span>
        <div
          style={{ width: "fit-content", margin: "8px auto" }}
          onClick={flipBack}
        >
          {" "}
          Prev Page
        </div>
        <div
          style={{ width: "fit-content", margin: "8px auto" }}
          onClick={flipForward}
        >
          {" "}
          Next Page{" "}
        </div>
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
      </span>
    </div>
  );
}
