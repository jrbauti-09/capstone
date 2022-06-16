import React, { useState, useEffect } from "react";

import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { addReview } from "../../../store/reviews";
import { getThoughts } from "../../../store/thoughts";

import "./AddReview.css";

export default function AddReview({ thoughtId, setShowModal }) {
  //   console.log(thoughtId, "I'm here at the thought Id");

  const history = useHistory();
  const dispatch = useDispatch();

  const user_id = useSelector((state) => state.session.user.id);

  //We need our useStates for the data we will post.

  const [routeErrors, setRouteErrors] = useState([]);
  // default review value and setting it.
  const [review, setReview] = useState("");
  // default rating value and setting it.
  const [rating, setRating] = useState(0);

  // console.log(review, rating, "LOOK HERE!!!");

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const data = {
      rating: parseInt(rating),
      thought_id: thoughtId,
      user_id: user_id,
      review,
    };

    // console.log(data, "LOOOK HERE MAN");

    const newReview = await dispatch(addReview(data));

    // console.log(newReview, "NEW REVIEW");

    if (newReview?.errors) {
      // If there are errors, will set errors to the errors from the flask form validation check.
      setRouteErrors(newReview.errors);
      // console.log(rating, "RATING");
    } else {
      await dispatch(getThoughts());
      // After successful dispatch will reset the values.
      // Will set modal to false.
      setShowModal(false);
      setRating(0);
      setReview("");
      // reset errors to empty array.
      setRouteErrors([]);
    }
  };

  const cancelFunction = async (e) => {
    // set values back to default state.
    setRating(0);
    setReview("");
    setRouteErrors([]);
  };

  return (
    <div className="add_review_form_container">
      <form onSubmit={handleSubmitReview}>
        <h1 className="add_review_header">Post A Review:</h1>
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
            />
            <label className="star_1 star-pseudo" htmlFor="star_1"></label>
            <input
              className="star_2"
              type="radio"
              name="stars"
              id="star_2"
              value="4"
            />
            <label className="star_2 star-pseudo" htmlFor="star_2"></label>
            <input
              className="star_3"
              type="radio"
              name="stars"
              id="star_3"
              value="3"
            />
            <label className="star_3 star-pseudo" htmlFor="star_3"></label>
            <input
              className="star_4"
              type="radio"
              name="stars"
              id="star_4"
              value="2"
            />
            <label className="star star_4 star-pseudo" htmlFor="star_4"></label>
            <input
              className="star_5"
              type="radio"
              name="stars"
              id="star_5"
              value="1"
            />
            <label className="star star_5 star-pseudo" htmlFor="star_5"></label>
          </div>
        </label>
        <div>
          <label className="ingredient_label">
            {" "}
            Leave a review on this thought.
          </label>
          <textarea
            className="review_input"
            id="review_input_field"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            placeholder="Post review of thought here.."
          />
        </div>
        <div className="btn_div_container_add">
          <button className="review_add_btn" type="submit">
            Post Review
          </button>
          {/* <button
            className="add-review-button "
            onClick={cancelFunction}
            type="button"
          >
            Cancel
          </button> */}
        </div>
      </form>
    </div>
  );
}
