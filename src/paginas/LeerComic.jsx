import "./styles.css";
import React, { forwardRef } from "react";
import pageFlipSFX from '../page-flip-01a.mp3';

import HTMLFlipBook from "react-pageflip";
import useSound from "use-sound";

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
      pageFlipObj.flip(0);
    } else {
      pageFlipObj.flipNext();
    }
  }, [flipbook]);

  return (
    <div className="Leer">
      <h1>Flipbook CodeSandbox</h1>
      <h2 onClick={() => setSoundOn((prev) => !prev)}>
        Click here to TURN {soundOn ? "OFF" : "ON"} audio
      </h2>
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
            width={200}
            height={500}
            size="stretch"
            showCover={true}
            drawShadow={false}
            flippingTime={750}
            useMouseEvents={false}
          >
            <div className="page">
              <h1>My awesome first article</h1>
              <p>My awesome first content</p>
            </div>
            <div className="page">
              <h1>My wonderful second article</h1>
              <p>My wonderful second content</p>
            </div>
            <div className="page">
              <h1>My excellent third article</h1>
              <p>My excellent third content</p>
              <video
                controls
                src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
                poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
                width="620"
              />
            </div>
            <div className="page">
              <h1>My excellent fourth article</h1>
              <p>My excellent fourth content</p>
            </div>
            <div className="page">
              <h1>My excellent fifth article</h1>
              <p>My excellent fifth content</p>
            </div>
          </HTMLFlipBook>
        </div>
      </span>
    </div>
  );
}
