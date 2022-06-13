import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { editReview } from "../../../store/reviews";
import { getThoughts } from "../../../store/thoughts";

import "./EditReview.css";

// Gonna be similar to AddReview except fields are already filled with previous info.

export default function EditReview({ reviewId, thought_id, setReviewIndex }) {
  const dispatch = useDispatch();
  const history = useHistory();

  // console.log(thought_id, "Prop from thought detail component.");

  const user_id = useSelector((state) => state.session.user.id);
  const reviewToEdit = useSelector((state) => state.reviews[reviewId]);

  // console.log(setReviewIndex);

  // console.log(reviewToEdit);

  //We need our useStates for data and their default states.

  const [routeErrors, setRouteErrors] = useState([]);

  const [flip, setFlip] = useState(true);

  const [review, setReview] = useState(reviewToEdit?.review);
  const [rating, setRating] = useState(reviewToEdit?.rating);
  // console.log(review, rating);

  const handleSubmitEditReview = async (e) => {
    e.preventDefault();

    const data = {
      rating: parseInt(rating),
      thought_id,
      user_id,
      review,
    };

    // Will send a dispatch to edit the review upon successful post.
    const editReivew = await dispatch(editReview(data, reviewToEdit.id));

    if (editReview?.errors) {
      setRouteErrors(editReivew.errors);
    } else {
      await dispatch(getThoughts());
      setReviewIndex(-1);
      history.push(`/thoughts/${thought_id}`);
    }
  };

  return (
    <div className="add_review_form_container">
      <form onSubmit={handleSubmitEditReview}>
        <h1>Edit Review:</h1>
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
              defaultChecked={parseInt(rating) == 5}
            />
            <label className="star star-1 star-label" htmlFor="star-1"></label>
            <input
              className="star star-2"
              type="radio"
              name="stars"
              id="star-2"
              value="4"
              defaultChecked={parseInt(rating) == 4}
            />
            <label className="star star-2 star-label" htmlFor="star-2"></label>
            <input
              className="star star-3"
              type="radio"
              name="stars"
              id="star-3"
              value="3"
              defaultChecked={parseInt(rating) == 3}
            />
            <label className="star star-3 star-label" htmlFor="star-3"></label>
            <input
              className="star star-4"
              type="radio"
              name="stars"
              id="star-4"
              value="2"
              defaultChecked={parseInt(rating) == 2}
            />
            <label className="star star-4 star-label" htmlFor="star-4"></label>
            <input
              className="star star-5"
              type="radio"
              name="stars"
              id="star-5"
              value="1"
              defaultChecked={parseInt(rating) == 1}
            />
            <label className="star star-5 star-label" htmlFor="star-5"></label>
          </div>
        </label>
        <div>
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
              placeholder="Review"
            />
          </label>
        </div>
        <div className="buttons-container">
          <button className="add-review-button" type="submit">
            Edit Review
          </button>
        </div>
      </form>
    </div>
  );
}
