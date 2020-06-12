import React from "react";

import FlashCardItem from "@components/FlashCardItem";

const FlashCardList = ({ flashcards }) => {
  const renderContent = () => {
    return flashcards.map((flashcard) => {
      return <FlashCardItem flashcard={flashcard} key={flashcard.id} />;
    });
  };

  return (
    <div className="card-grid">
      {renderContent()}
    </div>
  );
};

export default FlashCardList;
