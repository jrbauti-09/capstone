import React from "react";
import { Link } from "react-router-dom";

import "./ThoughtCard.css";

export default function ThoughtCard({ thought }) {
  let ratingValue = 0;
  const ratings = thought?.reviewRating;

  if (ratings?.length) {
    ratings?.forEach((rate) => (ratingValue = rate + ratingValue));
    ratingValue = ratingValue / ratings.length;
    // console.log(ratingValue);
  }

  return (
    <>
      <div className="one_thought_container">
        <div className="one_thought_div">
          <img
            className="one_image_div"
            src={thought?.images[0]}
            alt="thought_image"
          ></img>
        </div>
        <div className="thought_title">
          <h2 className="thought_name">{thought?.name}</h2>
          <p className="thought_user_name">By: {thought?.user?.username}</p>
        </div>
        <div className="thought_bottom_div review_div">
          <div className="thought_bottom_div">
            <p className="thought_bottom_description">
              {thought?.description.slice(0, 95)}...
            </p>
          </div>
          <div className="right_bottom_div">
            <span className="recipe-votes">
              {thought?.reviews.length} reviews
            </span>
            <span
              className="stars_rating"
              style={{ "--ratingValue": `${ratingValue}` }}
            ></span>
            <div>
              <Link
                className="get-recipe-button"
                to={`/thoughts/${thought?.id}`}
              >
                Visit Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
