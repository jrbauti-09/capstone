import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { editReview } from "../../../store/reviews";
import { getThoughts } from "../../../store/thoughts";

import "./EditReview.css";

// Gonna be similar to AddReview except fields are already filled with previous info.

export default function EditReview({ reviewId, thoughtId, setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();

  // console.log(thought_id, "Prop from thought detail component.");

  const user_id = useSelector((state) => state.session.user.id);
  const reviewToEdit = useSelector((state) => state.reviews[reviewId]);

  // console.log(setReviewIndex);

  // console.log(reviewToEdit);

  //We need our useStates for data and their default states.

  const [routeErrors, setRouteErrors] = useState([]);

  const [review, setReview] = useState(reviewToEdit?.review);
  const [rating, setRating] = useState(reviewToEdit?.rating);
  const [proxyState, setProxyState] = useState([]);
  // console.log(review, rating);

  const handleSubmitEditReview = async (e) => {
    e.preventDefault();

    const data = {
      rating: parseInt(rating),
      thought_id: thoughtId,
      user_id,
      review,
    };

    // console.log(reviewToEdit.id);

    // Will send a dispatch to edit the review upon successful post.
    const editReivew = await dispatch(editReview(data, reviewToEdit.id));

    if (editReivew?.errors) {
      setRouteErrors(editReivew.errors);
      setProxyState([]);
      // console.log(editReivew.errors, "LOOOOK HERE FOR THE ERRORS");
    } else {
      await dispatch(getThoughts());
      setShowModal(false);
      // history.push(`/thoughts/${thought_id}`);
    }
  };

  // useEffect(() => {
  //   const errors = [];

  //   if (review.length > 1000)
  //     errors.push("Review length cannot exceed 1000 characters.");
  //   if (rating === 0) errors.push("Please provide a rating between 1-5.");

  //   setRouteErrors(errors);
  // }, [review, rating]);

  const handleReset = () => {
    setReview(reviewToEdit?.review);
  };

  return (
    <div className="add_review_form_container">
      <form onSubmit={handleSubmitEditReview}>
        <h1 className="edit_review_header">Edit Review:</h1>
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
        <label className="ingredient_label">
          {" "}
          Rating
          <div
            className="rating_main_div"
            onChange={(e) => setRating(e.target.value)}
          >
            <input
              className="star_1"
              type="radio"
              name="stars"
              id="star_1"
              value="5"
              defaultChecked={parseInt(rating) == 5}
            />
            <label className="star_1 star-pseudo" htmlFor="star_1"></label>
            <input
              className="star_2"
              type="radio"
              name="stars"
              id="star_2"
              value="4"
              defaultChecked={parseInt(rating) == 4}
            />
            <label className="star_2 star-pseudo" htmlFor="star_2"></label>
            <input
              className="star_3"
              type="radio"
              name="stars"
              id="star_3"
              value="3"
              defaultChecked={parseInt(rating) == 3}
            />
            <label className="star_3 star-pseudo" htmlFor="star_3"></label>
            <input
              className="star_4"
              type="radio"
              name="stars"
              id="star_4"
              value="2"
              defaultChecked={parseInt(rating) == 2}
            />
            <label className="star_4 star-pseudo" htmlFor="star_4"></label>
            <input
              className="star_5"
              type="radio"
              name="stars"
              id="star_5"
              value="1"
              defaultChecked={parseInt(rating) == 1}
            />
            <label className="star_5 star-pseudo" htmlFor="star_5"></label>
          </div>
        </label>
        <label className="ingredient_label">
          {" "}
          Leave your thoughts on this recipe
        </label>
        <div>
          <textarea
            className="review_input_edit"
            id="review_input_field"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            autoComplete="off"
            placeholder="Review"
          />
        </div>
        <div className="btn_div_container">
          <button className="review_add_btn" type="submit">
            Edit Review
          </button>
          <button
            className="review_add_btn"
            onClick={handleReset}
            type="button"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
