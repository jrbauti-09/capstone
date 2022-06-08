import React from "react";

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
    <div className="one_thought_container">
      <div className="one_thought_div">
        <img className="one_image_div" src={thought?.images[0]}></img>
      </div>
    </div>
  );
}
