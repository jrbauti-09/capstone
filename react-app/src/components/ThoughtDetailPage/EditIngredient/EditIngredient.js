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
  setShowModal,
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
      setShowModal(false);
      setIngredientName("");
      setErrors([]);
    }
  };

  const handleCancel = () => {
    setIngredientIndex(-1);
    setIngredientName(ingredientToEdit?.name);
  };

  return (
    <div className="ingredient_form_container">
      <form className="new-ing-form" onSubmit={handleSubmit}>
        {errors?.length ? (
          <div className="error_div">
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
          <label className="ingredient_label">
            {" "}
            Edit your ingredient:
            <input
              className=""
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
              required
              autoComplete="off"
              placeholder="Ingredient"
            />
          </label>
        </div>
        <div className="">
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
