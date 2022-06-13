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

import "./ThoughtDetail.css";
import { deleteIngredient } from "../../store/ingredient";
import { getIngredients } from "../../store/ingredient";

// TODO, will need to add components for review forms etc.

export default function ThoughtDetail() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { thoughtId } = useParams();

  const [showEdit, setShowEdit] = useState(false);
  const [ingredientIndex, setIngredientIndex] = useState(-1);
  const [reviewIndex, setReviewIndex] = useState(-1);

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

  //TODO still need to figure out editing and deleting ingredient.

  return (
    <div className="thought_container">
      <div className="thought_container_div thought_name">
        <div className="thought_title_detail">{thought?.name}</div>
        <div className="thought_user_name">By: {thought?.user.username}</div>
      </div>
      <div className="thought_image">
        <div className="thought_container_div">
          <div className="thought_image_container">
            <img className="one_image_div" src={thought?.images[0]}></img>
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
            <h4>Category:</h4>
            <span className="thought_category_span">{thought?.category}</span>
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
            className="stars"
            style={{ "--ratingValue": `${ratingValue}` }}
          ></span>
        </div>
      </div>
      <div className="bottom_section">
        <div className="ingredients_container_div">
          <div className="ingredients-container ing-controls">
            <div className="ing-name ing-name-head">
              <h2 className="single-h2 ing-h2">
                <span>{thought?.ingredients.length}</span> Ingredients:{" "}
              </h2>
            </div>
          </div>
          <div>
            {thought?.ingredients.map((ingredient, idx) => {
              return (
                <>
                  <div className="thought_ingredient" key={ingredient?.id}>
                    <div>{ingredient.name}</div>
                    <div className="thought_ingredient_buttons">
                      {user == thought?.user_id ? (
                        <div
                          className="ingredient_button"
                          onClick={() => setIngredientIndex(idx)}
                        >
                          <FontAwesomeIcon icon={faPencil} className="fa-ing" />
                        </div>
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
                  {ingredientIndex === idx ? (
                    <EditIngForm
                      thoughtId={thought?.id}
                      ingredientId={ingredient.id}
                      setIngredientIndex={setIngredientIndex}
                    />
                  ) : (
                    <></>
                  )}
                </>
              );
            })}
            <div>
              {user == thought?.user_id ? (
                <AddIngredient thoughtId={thought?.id} />
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
          <div className="review_container">
            <h2 className="review_header">Reviews:</h2>
            {thought?.reviews.map((review, idx) => {
              return (
                <div className="single-review" key={idx}>
                  <p className="single-review-user">
                    <span>Review By: </span>
                    {review?.user?.username}
                  </p>
                  <span className="recipe-votes">
                    {review?.time_created.slice(0, 16)}
                  </span>
                  <p>{review?.review}</p>
                  <div className="review_options">
                    {user == review?.user_id ? (
                      <button onClick={() => setReviewIndex(idx)}>Edit</button>
                    ) : (
                      <></>
                    )}
                    {reviewIndex === idx && user == review?.user_id ? (
                      <button onClick={() => setReviewIndex(-1)}>Cancel</button>
                    ) : (
                      <></>
                    )}
                    {user == review?.user_id ? (
                      <button onClick={handleDelete(review.id)}>Delete</button>
                    ) : (
                      <></>
                    )}
                    <span
                      className="stars"
                      style={{ "--ratingValue": `${review?.rating}` }}
                    ></span>
                  </div>
                  <div>
                    {reviewIndex === idx ? (
                      <EditReview
                        reviewId={review.id}
                        thought_id={thought?.id}
                        setReviewIndex={setReviewIndex}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              );
            })}
            <div>
              <AddReview thoughtId={thought?.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
