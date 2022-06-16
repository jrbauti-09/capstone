import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { addIngredient } from "../../../store/ingredient";
import { getThoughts } from "../../../store/thoughts";
import { editIngredient } from "../../../store/ingredient";

import "./EditIngredient.css";

export default function EditIngForm({ thoughtId, ingredientId, setShowModal }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const user_id = useSelector((state) => state.session.user.id);
  const ingredientToEdit = useSelector(
    (state) => state.ingredients[ingredientId]
  );

  const [errors, setErrors] = useState([]);
  const [ingredientName, setIngredientName] = useState(ingredientToEdit?.name);
  const [toggle, setToggle] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: ingredientName,
      thought_id: thoughtId,
      user_id,
    };

    // console.log(data);

    //Dispatch to edit thunk.
    const newIngredient = await dispatch(editIngredient(data, ingredientId));

    if (newIngredient?.errors) {
      setErrors(newIngredient.errors);
      return;
    } else {
      await dispatch(getThoughts());
      setShowModal(false);
      setIngredientName("");
      setErrors([]);
    }
  };

  const handleCancel = () => {
    setIngredientName(ingredientToEdit?.name);
  };

  return (
    <div className="ingredient_form_container">
      <form className="ingredient_form" onSubmit={handleSubmit}>
        {errors?.length ? (
          <div className="error_div">
            <ul>
              {errors?.map((error, ind) => (
                <li className="list_error" key={ind}>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <></>
        )}
        <label className="ingredient_label"> Edit your ingredient:</label>
        <div className="ingredient_input_div">
          <input
            className=""
            value={ingredientName}
            onChange={(e) => setIngredientName(e.target.value)}
            required
            autoComplete="off"
            placeholder="Ingredient"
          />
        </div>
        <div className="edit_btn_container">
          <>
            <button className="add_ingredient_button" type="submit">
              Confirm Edit
            </button>
          </>
          <button
            className="add_ingredient_button"
            onClick={handleCancel}
            type="button"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
