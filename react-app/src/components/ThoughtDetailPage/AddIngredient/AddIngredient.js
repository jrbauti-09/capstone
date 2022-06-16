import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { addIngredient } from "../../../store/ingredient";
import { getThoughts } from "../../../store/thoughts";

import "./AddIngredient.css";

export default function AddIngredient({ thoughtId, setShowModal }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const user_id = useSelector((state) => state.session.user.id);

  const [errors, setErrors] = useState([]);
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
      setErrors(newIngredient.errors);
      return;
    } else {
      await dispatch(getThoughts());
      setToggle(!toggle);
      setShowModal(false);
      // console.log(toggle, "LOOOK HERE IN THE CONSOLE!!");
      setIngredientName("");
      setErrors([]);
    }
  };

  const handleCancel = () => {
    setToggle(!toggle);
    setErrors([]);
    setIngredientName("");
  };

  return (
    <div className="ingredient_form_container">
      <form className="new-ing-form" onSubmit={handleSubmit}>
        {errors?.length && toggle === false ? (
          <div className="error-container">
            <ul>
              {errors.map((error, ind) => (
                <li className="li_error" key={ind}>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <></>
        )}
        <div>
          <label className="ingredient_label">
            {" "}
            Add an ingredient
            <input
              className="add_ingredient_input"
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
              required
              autoComplete="off"
              placeholder="Ingredient"
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
