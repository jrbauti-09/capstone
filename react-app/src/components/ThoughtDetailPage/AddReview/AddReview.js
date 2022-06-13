import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { addReview } from "../../../store/reviews";
import { getThoughts } from "../../../store/thoughts";

import "./AddReview.css";

export default function AddReview({ thoughtId }) {
  //   console.log(thoughtId, "I'm here at the thought Id");
  const dispatch = useDispatch();
  const history = useHistory();

  const user_id = useSelector((state) => state.session.user.id);

  //We need our useStates for the data we will post.

  const [routeErrors, setRouteErrors] = useState([]);
  // boolean state for oppossite functions
  const [flip, setFlip] = useState(true);
  // default review value and setting it.
  const [review, setReview] = useState("");
  // default rating value and setting it.
  const [rating, setRating] = useState(0);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const data = {
      rating: parseInt(rating),
      thought_id: thoughtId,
      user_id: user_id,
      review,
    };

    const newReview = await dispatch(addReview(data));

    // console.log(newReview, "NEW REVIEW");

    if (newReview?.errors) {
      setRouteErrors(newReview.errors);
      // console.log(rating, "RATING");
    } else {
      await dispatch(getThoughts());
      setRating(0);
      setReview("");
      setFlip(true);
      setRouteErrors([]);
      window.scrollTo({ top: 10, behavior: "smooth" });
      // history.push(`/thoughts/${thoughtId}`);
    }
  };

  const cancelFunction = async (e) => {
    setFlip(!flip);
    // set values back to default state.
    setRating(0);
    setReview("");
    setRouteErrors([]);
  };

  return (
    <div className="add_review_form_container">
      <form onSubmit={handleSubmitReview}>
        <h1>Post A Review:</h1>
        {routeErrors.length ? (
          <div>
            <ul>
              {routeErrors.map((error, idx) => {
                return <li key={idx}>{error}</li>;
              })}
            </ul>
          </div>
        ) : (
          <></>
        )}
        {flip === false ? (
          <label className="new-review-label" htmlFor="rating">
            {" "}
            Rating
            <div
              className="rating"
              id="rating"
              onChange={(e) => setRating(e.target.value)}
            >
              <input
                className="star star-1"
                type="radio"
                name="stars"
                id="star-1"
                value="5"
              />
              <label
                className="star star-1 star-label"
                htmlFor="star-1"
              ></label>
              <input
                className="star star-2"
                type="radio"
                name="stars"
                id="star-2"
                value="4"
              />
              <label
                className="star star-2 star-label"
                htmlFor="star-2"
              ></label>
              <input
                className="star star-3"
                type="radio"
                name="stars"
                id="star-3"
                value="3"
              />
              <label
                className="star star-3 star-label"
                htmlFor="star-3"
              ></label>
              <input
                className="star star-4"
                type="radio"
                name="stars"
                id="star-4"
                value="2"
              />
              <label
                className="star star-4 star-label"
                htmlFor="star-4"
              ></label>
              <input
                className="star star-5"
                type="radio"
                name="stars"
                id="star-5"
                value="1"
              />
              <label
                className="star star-5 star-label"
                htmlFor="star-5"
              ></label>
            </div>
          </label>
        ) : (
          <></>
        )}
        <div>
          {flip === true ? (
            <button
              className="new-review-label review-toggle"
              onClick={() => setFlip(!flip)}
            >
              Leave your thoughts on this recipe? ▼
            </button>
          ) : (
            <label className="new-review-label">
              {" "}
              Leave your thoughts on this recipe
              <textarea
                className="new-review-input"
                id="review-text"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                autoComplete="off"
                placeholder="Post your review here.."
              />
            </label>
          )}
        </div>
        <div className="buttons-container">
          {flip === false ? (
            <button className="add-review-button" type="submit">
              Add Review
            </button>
          ) : (
            <></>
          )}
          {flip === false ? (
            <button
              className="add-review-button cancel-review"
              onClick={cancelFunction}
              type="button"
            >
              Cancel
            </button>
          ) : (
            <></>
          )}
        </div>
      </form>
    </div>
  );
}
