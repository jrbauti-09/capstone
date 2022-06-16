import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faXmark, faTrash } from "@fortawesome/free-solid-svg-icons";

// Thunks here.
import { getThoughts } from "../../store/thoughts";
import { getReviews } from "../../store/reviews";
import { deleteReview } from "../../store/reviews";
import { deleteThought } from "../../store/thoughts";
//
//
//
//
//
// Components here.
import AddReview from "./AddReview/AddReview";
import EditReview from "./EditReview/EditReview";
import AddIngredient from "./AddIngredient/AddIngredient";
import EditIngForm from "./EditIngredient/EditIngredient";
import AddReviewModal from "./AddReview/AddReviewModal";
import EditReviewModal from "./EditReview/EditReviewModal";
import AddIngredientModal from "./AddIngredient/AddIngredientModal";
import EditIngredientModal from "./EditIngredient/EditIngredientModal";

import "./ThoughtDetail.css";
import { deleteIngredient } from "../../store/ingredient";
import { getIngredients } from "../../store/ingredient";

// TODO, will need to add components for review forms etc.

export default function ThoughtDetail() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { thoughtId } = useParams();

  // This will grab our needed thought recipe
  const thought = useSelector((state) => state.allThoughts[thoughtId]);
  //   console.log(thought, "working");

  // let's grab user_id
  const user = useSelector((state) => state.session.user.id);

  // array of reviews
  const reviews = thought?.reviews;

  let ratingValue = 0;
  const ratings = thought?.reviewRating;

  if (ratings?.length) {
    ratings?.forEach((rate) => (ratingValue = rate + ratingValue));
    ratingValue = ratingValue / ratings.length;
    // console.log(ratingValue);
    // working
  }

  useEffect(() => {
    dispatch(getThoughts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const handleDelete = (review_id) => async (e) => {
    e.preventDefault();
    // console.log("Look");
    await dispatch(deleteReview(review_id));
    await dispatch(getThoughts());
  };

  const handleDeleteThought = async (e) => {
    await dispatch(deleteThought(thought?.id));
    history.push("/");
  };

  const handleDeleteIngredient = (ingredient_id) => async (e) => {
    // console.log(ingredient_id, "LOOOOOK HERE DUDE");
    await dispatch(deleteIngredient(ingredient_id));
    await dispatch(getThoughts());
  };

  let thoughtOrdered = thought?.reviews;
  thoughtOrdered?.sort(function (a, b) {
    return b.id - a.id;
  });

  // console.log(thoughtOrdered, "LOOK HERE");

  return (
    <div className="thought_container">
      <div className="thought_container_div thought_name">
        <div className="thought_title_detail">{thought?.name}</div>
        <div className="thought_user_name">By: {thought?.user.username}</div>
      </div>
      <div className="thought_image">
        <div className="thought_container_div">
          <div className="thought_image_container">
            <img className="one_image_div_" src={thought?.images[0]}></img>
          </div>
          <div className="thought_container">
            <h2 className="thought_header">Description:</h2>
            <p className="thought_description">{thought?.description}</p>
          </div>
        </div>
      </div>
      <div className="category_div">
        <div className="category_header_div">
          <div className="category_name">
            <h4 className="category_header">Category:</h4>
            <Link
              to={`/categories/${thought?.category}`}
              className="category_link"
            >
              <span className="thought_category_span">{thought?.category}</span>
            </Link>
          </div>
        </div>
        <div className="category_rating">
          {user == thought?.user_id ? (
            <Link
              className="edit_thought_link"
              to={`/thoughts/${thought?.id}/edit`}
            >
              Edit
            </Link>
          ) : (
            <></>
          )}
          {user == thought?.user_id ? (
            <button className="edit_thought_link" onClick={handleDeleteThought}>
              Delete
            </button>
          ) : (
            <></>
          )}
          <span className="number_of_reviews">
            {thought?.reviewRating.length} total reviews
          </span>
          <span
            className="stars_rating"
            style={{ "--ratingValue": `${ratingValue}` }}
          ></span>
        </div>
      </div>
      <div className="bottom_section">
        <div className="ingredients_container_div">
          <div className="">
            <div className="">
              <h2 className="ingredients_header">
                <span>{thought?.ingredients.length}</span> Ingredients:{" "}
              </h2>
            </div>
          </div>
          <div>
            {thought?.ingredients.map((ingredient, idx) => {
              return (
                <>
                  <div className="thought_ingredient" key={ingredient?.id}>
                    <div className="thought_ingredient_name">
                      {ingredient.name}
                    </div>
                    <div className="thought_ingredient_buttons">
                      {user == thought?.user_id ? (
                        <EditIngredientModal
                          thoughtId={thought?.id}
                          ingredientId={ingredient?.id}
                        />
                      ) : (
                        <></>
                      )}
                      {user == thought?.user_id ? (
                        <div
                          className="ingredient_button"
                          onClick={handleDeleteIngredient(ingredient.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} className="fa-tra" />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </>
              );
            })}
            <div>
              {user == thought?.user_id ? (
                <>
                  <AddIngredientModal thoughtId={thought?.id} />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="thought_instructions_container">
            <h2 className="instructions_header">
              Instructions to make Thought:
            </h2>
            <p className="thought_instructions_p">{thought?.instructions}</p>
          </div>
          <h2 className="review_header">Reviews:</h2>
          <div className="review_container">
            {thoughtOrdered?.map((review, idx) => {
              return (
                <div className="single-review" key={idx}>
                  <div className="single-review-top">
                    <p className="single-review-user">
                      <span className="review-by">Review By: </span>
                      {review?.user?.username}
                    </p>
                    <div className="review_options">
                      {user == review?.user_id ? (
                        <EditReviewModal
                          thought_id={thought?.id}
                          reviewId={review?.id}
                        />
                      ) : (
                        <></>
                      )}
                      {user == review?.user_id ? (
                        <div
                          onClick={handleDelete(review.id)}
                          className="div_btn"
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="review-btn"
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div>
                    <span
                      className="stars_rating"
                      style={{ "--ratingValue": `${review?.rating}` }}
                    ></span>
                  </div>
                  <span className="recipe-votes">
                    {review?.time_created.slice(0, 16)}
                  </span>
                  <p>{review?.review}</p>
                  <div></div>
                </div>
              );
            })}
          </div>
          <div>
            <AddReviewModal thoughtId={thought?.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
