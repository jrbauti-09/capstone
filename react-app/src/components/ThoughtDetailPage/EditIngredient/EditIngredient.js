import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { addIngredient } from "../../../store/ingredient";
import { getThoughts } from "../../../store/thoughts";
import { editIngredient } from "../../../store/ingredient";

export default function EditIngForm({
  thoughtId,
  ingredientId,
  setIngredientIndex,
}) {
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
      setIngredientIndex(-1);
      //   console.log(toggle, "LOOOK HERE IN THE CONSOLE!!");
      setIngredientName("");
      setErrors([]);
    }
  };

  const handleCancel = () => {
    setIngredientIndex(-1);
  };

  return (
    <div className="new-ing-form-container">
      <form className="new-ing-form" onSubmit={handleSubmit}>
        {errors?.length ? (
          <div className="error-container">
            <ul>
              {errors?.map((error, ind) => (
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
          <label className="new-review-label">
            {" "}
            Edit your ingredient:
            <input
              className="new-ing-input"
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
              required
              autoComplete="off"
              placeholder="Ingredient"
            />
          </label>
        </div>
        <div className="ing-buttons-container">
          <>
            <button className="add-ing-button" type="submit">
              Confirm Edit
            </button>
          </>
          <button
            className="add-ing-button cancel-review"
            onClick={handleCancel}
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
