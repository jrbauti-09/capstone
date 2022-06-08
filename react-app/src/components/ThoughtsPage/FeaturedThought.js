import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { getThoughts } from "../../store/thoughts";

import "./FeaturedThought.css";

//May need to import images.

export default function FeaturedThought() {
  // Array of all the thoughts(recipes)
  const dispatch = useDispatch();
  const allThoughts = useSelector((state) => Object.values(state.allThoughts));

  const totalLengthIndex = allThoughts.length - 1;
  // randomly select an index to show random recipes
  const featuredThought =
    allThoughts[Math.floor(Math.random() * totalLengthIndex)];

  //   console.log(featuredThought);

  let ratingValue = 0;
  const ratings = featuredThought?.reviewRating;

  if (ratings?.length) {
    ratings?.forEach((rate) => (ratingValue = rate + ratingValue));
    ratingValue = ratingValue / ratings.length;
    // console.log(ratingValue);
  }

  useEffect(() => {
    dispatch(getThoughts());
  }, [dispatch]);

  return (
    <>
      <div class="big">
        <article class="recipe">
          <div class="pizza-box">
            <img
              src={featuredThought?.images[0]}
              width="1500"
              height="1368"
              alt=""
            />
          </div>
          <div class="recipe-content">
            <p class="recipe-tags">
              <span class="recipe-tag">Featured Thought</span>
              <span class="recipe-tag">
                Category: {featuredThought?.category}
              </span>
            </p>

            <h1 class="recipe-title">
              <a href="#">{featuredThought?.name}</a>
            </h1>

            <p class="recipe-metadata">
              <span class="recipe-rating">
                <span
                  className="stars"
                  style={{ "--ratingValue": `${ratingValue}` }}
                ></span>
              </span>
              <span class="recipe-votes">
                {featuredThought?.reviewRating.length} reviews
              </span>
            </p>

            <p class="recipe-desc">{featuredThought?.description}</p>

            <button class="recipe-save" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#000000"
              >
                <path
                  d="M 6.0097656 2 C 4.9143111 2 4.0097656 2.9025988 4.0097656 3.9980469 L 4 22 L 12 19 L 20 22 L 20 20.556641 L 20 4 C 20 2.9069372 19.093063 2 18 2 L 6.0097656 2 z M 6.0097656 4 L 18 4 L 18 19.113281 L 12 16.863281 L 6.0019531 19.113281 L 6.0097656 4 z"
                  fill="currentColor"
                />
              </svg>
              Check Thought. TODO: add link here to recipe page
            </button>
          </div>
        </article>
      </div>
    </>
  );
}
