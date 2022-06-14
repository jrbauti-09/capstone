import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useHistory, Link } from "react-router-dom";

import { uploadFile } from "../../store/thoughts";
import { addThought } from "../../store/thoughts";
import { addIngredient } from "../../store/ingredient";
import ImageUploading from "react-images-uploading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPencil } from "@fortawesome/free-solid-svg-icons";

import "./AddThought.css";

export default function AddThought() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user.id);

  const [errors, setErrors] = useState([]);

  const [category, setCategory] = useState("Breakfast");
  const [instructions, setInstructions] = useState("");
  const [description, setDescription] = useState("");
  // Remember this is required, max length is 255.
  const [name, setName] = useState("");
  const [images, setImages] = useState();
  const [ingredientArray, setIngredientArray] = useState([]);

  const [ingredientErrors, setIngredientErrors] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [editIngredientState, setEditIngredientState] = useState(false);
  const [ingredientIndex, setIngredientIndex] = useState(-1);
  const [currentIngredientEdit, setCurrentIngredientEdit] = useState("");
  const [proxyState, setProxyState] = useState([]);

  const handleAddThought = async (e) => {
    e.preventDefault();

    if (!images?.length) {
      window.alert("Please provide an image");
      return;
    }

    let cleanImage = images.map((image) => image.file);

    // if (ingredientArray) {
    //   console.log(ingredientArray);
    //   return;
    // }

    const data = {
      name,
      description,
      instructions,
      category,
      user_id: user,
    };

    const thoughtData = await dispatch(addThought(data));

    if (thoughtData?.errors) {
      setErrors(thoughtData.errors);
      return;
    }

    // create a for loop that adds the ingredient to the thought.

    for (let i = 0; i < ingredientArray.length; i++) {
      let ingredient = ingredientArray[i];

      await dispatch(
        addIngredient({
          thought_id: thoughtData[1].id,
          user_id: user,
          name: ingredient,
        })
      );
    }

    await addImage(cleanImage[0], thoughtData[1].id, user);
    history.push(`/thoughts/${thoughtData[1].id}`);
  };

  // const updateImage = (e) => {
  //   const file = e.target.files[0];
  //   setImage(file);
  // };

  const addImage = async (image, thought_id, user_id) => {
    const obj = {
      file: image,
      thought_id: thought_id,
      user_id,
      newFile: true,
    };
    // Will need to add.
    await dispatch(uploadFile(obj));
  };

  const handleAddIngredient = (e) => {
    //setProxyState will cause a rerender of the component.

    if (!ingredient.length) {
      setIngredientErrors(["Cannot add an empty ingredient."]);
      console.log(ingredientErrors);
      setProxyState([]);
      return;
    }

    if (ingredient.length > 30) {
      setIngredientErrors(["Ingredient name cannot exceed 30 letters."]);
      setProxyState([]);
      return;
    }

    if (ingredient.length === 1) {
      setIngredientErrors(["Ingredient cannot be 1 letter."]);
      setProxyState([]);
      return;
    }

    ingredientArray.push(ingredient);
    console.log(ingredientArray);

    setIngredient("");
    setIngredientErrors([]);
    setProxyState([]);
  };

  const handleEditIngredient = (idxToEdit) => {
    // console.log(idxToEdit, currentIngredientEdit);
    //User clicks edit and should show an input.

    if (!currentIngredientEdit.length) {
      setIngredientErrors(["Cannot add an empty ingredient."]);
      setProxyState([]);
      return;
    }

    if (currentIngredientEdit.length > 30) {
      setIngredientErrors(["Ingredient name cannot exceed 30 letters."]);
      setProxyState([]);
      return;
    }

    if (currentIngredientEdit.length === 1) {
      setIngredientErrors(["Ingredient cannot be 1 letter."]);
      setProxyState([]);
      return;
    }

    ingredientArray.splice(idxToEdit, 1, currentIngredientEdit);
    setEditIngredientState(!editIngredientState);
    setProxyState([]);
    setIngredientErrors([]);
  };

  const toogleEdit = (idxToEdit) => {
    setEditIngredientState(!editIngredientState);
    setCurrentIngredientEdit(ingredientArray[idxToEdit]);
    setIngredientIndex(idxToEdit);
  };

  const cancelEdit = (index) => {
    setEditIngredientState(!editIngredientState);
    setCurrentIngredientEdit(ingredientArray[index]);
    setIngredientIndex(-1);
  };

  const handleDeleteIngredient = (idxToDelete) => {
    // console.log(idxToDelete);

    // Working and deleting the right ingredients from the array.
    ingredientArray.splice(idxToDelete, 1);
    // console.log(ingredientArray);
    setProxyState([]);
  };

  const currentEdit = (e) => {
    console.log(e);
    setProxyState([]);
  };

  return (
    <div className="thought_form_main">
      <div className="experiment_box">
        <div className="right">
          <form className="form_container_div" onSubmit={handleAddThought}>
            <h1 className="new_thought">Please share your thought!</h1>
            {errors.length ? (
              <div>
                <ul>
                  {errors.map((error, idx) => {
                    return <li key={idx}>{error}</li>;
                  })}
                </ul>
              </div>
            ) : (
              <></>
            )}
            <div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="new_thought_input"
                placeholder="Name* (max 255 chars)"
                required
              ></input>
            </div>
            <label className="label_input">
              Count: {description.length} (min: 100 limit: 1000)
            </label>
            <div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea_description_add"
                placeholder="Description*"
                required
              ></textarea>
            </div>
            <label className="label_input">
              Count: {instructions.length} min: 50 limit: 500
            </label>
            <div>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="textarea_description_add"
                placeholder="Instructions*"
                required
              ></textarea>
            </div>
            <div className="input_div">
              <label>Select category:*</label>
              <select
                className="new-recipe-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Soup">Soup</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverages">Beverages</option>
                <option value="Salad">Salad</option>
              </select>
            </div>
            {ingredientErrors?.length ? (
              ingredientErrors.map((error, idx) => {
                return (
                  <div key={idx}>
                    <ul>
                      <li key={idx}>{error}</li>
                    </ul>
                  </div>
                );
              })
            ) : (
              <></>
            )}
            {ingredientArray.length ? <h4>Ingredients:</h4> : <></>}
            {ingredientArray?.map((ingredient, index) => {
              return (
                <>
                  <div style={{ display: "flex" }} className="div_ingredient">
                    <div className="ingredient_container">
                      <div key={index} style={{ marginRight: "2em" }}>
                        {index + 1}
                        {". "}
                        {ingredient}
                      </div>
                      <div className="div_ingredient_buttons">
                        <div
                          style={{ marginRight: "2em" }}
                          onClick={() => toogleEdit(index)}
                          className="ingredient_buttons"
                        >
                          Edit
                        </div>
                        <div
                          onClick={() => handleDeleteIngredient(index)}
                          className="ingredient_buttons"
                        >
                          DELETE
                        </div>
                      </div>
                    </div>
                    {ingredientIndex === index && editIngredientState ? (
                      <>
                        <div className="edit_input_thought">
                          <input
                            value={currentIngredientEdit}
                            className="new_thought_input_edit"
                            onChange={(e) => {
                              setCurrentIngredientEdit(e.target.value);
                            }}
                          ></input>
                          <div className="div_ingredient_buttons edit_buttons_div">
                            <div onClick={() => cancelEdit(index)}>Cancel</div>
                            <div onClick={() => handleEditIngredient(index)}>
                              Confirm
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              );
            })}
            <div>
              <div>
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => setIngredient(e.target.value)}
                  className="ingredient_input"
                  placeholder="Add Ingredient here (optional)"
                ></input>
                <div className="container-div">
                  <div
                    onClick={handleAddIngredient}
                    className="add-div-thought"
                  >
                    Add
                  </div>
                </div>
              </div>
            </div>
            <div></div>
            <div>
              <button type="submit" className="post-thought-button">
                Post Thought
              </button>
            </div>
          </form>
          <ImageUploading
            multiple
            value={images}
            onChange={(imageList) => setImages(imageList)}
            maxNumber={20}
            dataURLKey="data_url"
            acceptType={["jpg", "png", "jpeg"]}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              <div className="upload__image-wrapper">
                <div
                  style={isDragging ? { color: "rgb(192, 53, 22)" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                  className="add_images_container"
                >
                  Click or Drag Image Here
                </div>
                {/* <div onClick={onImageRemoveAll}>Remove all images</div> */}
                <div className="images_container">
                  {imageList.map((image, index) => (
                    <div key={index} className="image_container">
                      <img src={image["data_url"]} alt="" height="230" />
                      <div className="editPhotoButtons">
                        <div
                          className="change_image"
                          onClick={() => onImageUpdate(index)}
                        >
                          Change
                        </div>
                        <div
                          className="remove_image"
                          onClick={() => onImageRemove(index)}
                        >
                          Remove
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ImageUploading>
        </div>
      </div>
    </div>
  );
}
