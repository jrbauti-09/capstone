import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addThought } from "../../store/thoughts";
import { useHistory, Link } from "react-router-dom";

import { uploadFile } from "../../store/thoughts";
import ImageUploading from "react-images-uploading";

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

  const handleAddThought = async (e) => {
    e.preventDefault();

    if (!images?.length) {
      window.alert("Please provide an image");
      return;
    }

    let cleanImage = images.map((image) => image.file);

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

    await addImage(cleanImage[0], thoughtData[1].id, user);
    history.push("/");
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
              <label>Name:*</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="new_thought_input"
                required
              ></input>
            </div>
            <div>
              <label>Description:*</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="new_thought_input"
                required
              ></textarea>
            </div>
            <div>
              <label>Instructions:*</label>
              <input
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="new_thought_input"
                required
              ></input>
            </div>
            <div>
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
                <option value="Drinks">Drinks</option>
                <option value="Salad">Salad</option>
              </select>
            </div>
            <div></div>
            <div>
              <button type="submit">Post Thought</button>
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
                  Click or Drag Images Here
                </div>
                {/* <div onClick={onImageRemoveAll}>Remove all images</div> */}
                <div className="images_container">
                  {imageList.map((image, index) => (
                    <div key={index}>
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
