import React, { useState, useEffect, useRef } from "react";

const FlashCardItem = ({ flashcard }) => {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("initial");

  const frontEl = useRef();
  const backEl = useRef();

  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);

    return () => window.removeEventListener("resize", setMaxHeight);
  }, []);

  useEffect(() => {
    setMaxHeight();
  }, [flashcard.question, flashcard.answer, flashcard.options]);

  const setMaxHeight = () => {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;

    setHeight(Math.max(frontHeight, backHeight, 100));
  };

  const renderCardOptionsContent = () => {
    return flashcard.options.map((option, index) => {
      return <div className="flashcard-option" key={option}>
        {index + 1} : {option}
      </div>;
    });
  };
  
  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      style={{ height: height }}
      onClick={() => setFlip(!flip)}
    >
      <div className="front" ref={frontEl}>
        {flashcard.question}

        <div className="flashcard-options">
          {renderCardOptionsContent()}
        </div>
      </div>

      <div className="back" ref={backEl}>{flashcard.answer}</div>
    </div>
  );
};

export default FlashCardItem;
