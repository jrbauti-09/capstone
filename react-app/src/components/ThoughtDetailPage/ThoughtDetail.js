import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faXmark } from "@fortawesome/free-solid-svg-icons";

import { getThoughts } from "../../store/thoughts";

import "./ThoughtDetail.css";

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
            <button className="edit_thought_link">Delete</button>
          ) : (
            <></>
          )}
          <span
            className="stars"
            style={{ "--ratingValue": `${ratingValue}` }}
          ></span>
        </div>
      </div>
      <div className="bottom_section">
        <div className="ingredients_container_div">
          Ingredients container
          <div className="ingredients-container ing-controls">
            <div className="ing-name ing-name-head">
              <h2 className="single-h2 ing-h2">Ingredients: </h2>
            </div>
          </div>
          <div>
            {thought?.ingredients.map((ingredient) => {
              return (
                <div className="thought_ingredient" key={ingredient?.id}>
                  <div>{ingredient.name}</div>
                  <div className="thought_ingredient_buttons">
                    {user == thought?.user_id ? <div>Edit</div> : <></>}
                    {user == thought?.user_id ? <div>Delete</div> : <></>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>Review Container</div>
      </div>
    </div>
  );
}
