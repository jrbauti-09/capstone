import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getThoughts } from "../../store/thoughts";

import "./FeaturedThought.css";

//May need to import images.

export default function FeaturedThought() {
  // Array of all the thoughts(recipes)
  const dispatch = useDispatch();
  const history = useHistory();
  const allThoughts = useSelector((state) => Object.values(state.allThoughts));

  const [proxyState, setProxyState] = useState([]);

  const totalLengthIndex = allThoughts.length - 1;
  // randomly select an index to show random recipes
  let featuredThought =
    allThoughts[Math.floor(Math.random() * totalLengthIndex)];

  // setInterval(async function () {
  //   await dispatch(getThoughts());
  // }, 2000);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     featuredThought =
  //       allThoughts[Math.floor(Math.random() * totalLengthIndex)];
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [featuredThought]);

  useEffect(() => {
    const myInterval = setInterval(() => {
      setProxyState([]);
      // console.log("Is this working?");
    }, 7000);
    // console.log("Hi, there");
    return () => clearInterval(myInterval);
  }, []);

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

  const goToCateogry = (category) => {
    history.push(`/categories/${category}`);
  };

  const goToDetailPage = (id) => {
    history.push(`/thoughts/${id}`);
  };

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
              <span
                class="recipe-tag"
                onClick={() => goToDetailPage(featuredThought?.id)}
              >
                Featured Thought
              </span>
              <span
                class="recipe-tag"
                onClick={() => goToCateogry(featuredThought?.category)}
              >
                Category: {featuredThought?.category}
              </span>
            </p>

            <h1 class="recipe-title">
              <Link to={`/thoughts/${featuredThought?.id}`}>
                {featuredThought?.name}
              </Link>
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
              <Link to={`/thoughts/${featuredThought?.id}`}>
                Click here to visit{" "}
                <span className="featured-thought-span">
                  {featuredThought?.name}
                </span>{" "}
                detail page.
              </Link>
            </button>
          </div>
        </article>
      </div>
    </>
  );
}
