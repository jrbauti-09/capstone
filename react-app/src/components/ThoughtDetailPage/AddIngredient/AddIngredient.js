/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { addIngredient } from "../../../store/ingredient";
import { getThoughts } from "../../../store/thoughts";

import "./AddIngredient.css";

export default function AddIngredient({ thoughtId, setShowModal }) {
  const history = useHistory();

  const user_id = useSelector((state) => state.session.user.id);
  const dispatch = useDispatch();

  const [errorsIngredient, setErrorsArray] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [toggle, setToggle] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: ingredientName,
      thought_id: thoughtId,
      user_id,
    };

    // console.log(data);

    const newIngredient = await dispatch(addIngredient(data));

    if (newIngredient?.errors) {
      // If there are errors in the return, then we set the errors array.
      setErrorsArray(newIngredient.errors);
      // We break code and return here with further notification in the front end that errors need to be addressed.
      return;
    } else {
      // re update store, trigger a re-render of the component.
      await dispatch(getThoughts());
      setShowModal(false);
      setIngredientName("");
      setErrorsArray([]);
    }
  };

  const handleCancel = () => {
    setErrorsArray([]);
    setIngredientName("");
  };

  return (
    <div className="ingredient_form_container">
      <form className="ingredient_form" onSubmit={handleSubmit}>
        {errorsIngredient?.length ? (
          <div className="error_contents">
            <ul>
              {errorsIngredient.map((error, ind) => (
                <li className="list_error" key={ind}>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <></>
        )}
        <div className="ingredient_input_div">
          <label className="ingredient_label">
            {" "}
            Add an ingredient
            <input
              className="add_ingredient_input"
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
              placeholder="Ingredient"
              autoComplete="off"
              required
            />
          </label>
        </div>
        <div className="">
          <button className="add_ingredient_button" type="submit">
            Add Ingredient
          </button>
        </div>
      </form>
    </div>
  );
}
