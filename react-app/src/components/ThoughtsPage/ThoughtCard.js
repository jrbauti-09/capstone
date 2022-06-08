import React from "react";
import { Link } from "react-router-dom";

import "./ThoughtCard.css";

export default function ThoughtCard({ thought }) {
  let ratingValue = 0;
  const ratings = thought?.reviewRating;

  if (ratings?.length) {
    ratings?.forEach((rate) => (ratingValue = rate + ratingValue));
    ratingValue = ratingValue / ratings.length;
    console.log(ratingValue);
  }

  return (
    <>
      <div className="one_thought_container">
        <div className="one_thought_div">
          <img className="one_image_div" src={thought?.images[0]}></img>
        </div>
        <div className="thought_title">
          <h2 className="thought_name">{thought?.name}</h2>
          <p>By: {thought?.user?.username}</p>
        </div>
        <div className="thought_bottom_div">
          <span
            className="stars"
            style={{ "--ratingValue": `${ratingValue}` }}
          ></span>
          <div>
            <Link className="get-recipe-button" to={`/thoughts/${thought?.id}`}>
              Visit Thought
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}