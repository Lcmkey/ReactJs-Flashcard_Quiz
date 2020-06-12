import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import FlashcardList from "@components/FlashCardList";

const FlashCard = () => {
  const REFERENCE_LINK = process.env.REFERENCE_LINK;
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    const url = process.env.API_LINK + process.env.CATEGORY_API_URI;

    axios
      .get(url)
      .then((res) => {
        setCategories(res.data.trivia_categories);
      });
  }, []);

  const decodeString = (str) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;

    return textArea.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = process.env.API_LINK + process.env.DEFAULT_API_URI;

    axios
      .get(url, {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value,
        },
      })
      .then((res) => {
        const cardData = res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer);
          const options = [
            ...questionItem.incorrect_answers.map((a) => decodeString(a)),
            answer,
          ];

          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - .5),
          };
        });

        setFlashcards(cardData);
      });
  };

  const renderCategoryContent = () => {
    return categories.map((category) => {
      return <option value={category.id} key={category.id}>
        {category.name}
      </option>;
    });
  };

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <h1 className="refrence">
          <a href={REFERENCE_LINK}>
            Reference
          </a>
        </h1>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {renderCategoryContent()}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input
            type="number"
            id="amount"
            min="1"
            step="1"
            defaultValue={10}
            ref={amountEl}
          />
        </div>
        
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>

      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
};

export default FlashCard;
