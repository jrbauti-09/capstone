import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useHistory, Link, useParams } from "react-router-dom";

import { uploadFile } from "../../store/thoughts";
import ImageUploading from "react-images-uploading";
import { editThought } from "../../store/thoughts";
import { uploadUrl } from "../../store/thoughts";
import "./AddThought.css";

export default function EditThought() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { thoughtId } = useParams();

  const user = useSelector((state) => state.session.user.id);
  const thoughtToEdit = useSelector((state) => state.allThoughts[thoughtId]);

  const [errors, setErrors] = useState([]);

  const [category, setCategory] = useState(thoughtToEdit?.category);
  const [instructions, setInstructions] = useState(thoughtToEdit?.instructions);
  const [description, setDescription] = useState(thoughtToEdit?.description);
  // Remember this is required, max length is 255.
  const [name, setName] = useState(thoughtToEdit?.name);
  const [images, setImages] = useState(thoughtToEdit?.images);

  // console.log(thoughtToEdit?.images[0]);

  const handleEditThought = async (e) => {
    e.preventDefault();

    if (!images?.length) {
      window.alert("Please provide an image.");
      return;
    }

    if (images.length > 2) {
      window.alert("Please only add one image.");
      return;
    }

    // console.log(images, "Look here");
    let cleanImage = images.map((image) => image.file);

    const data = {
      name,
      description,
      instructions,
      category,
      user_id: user,
    };

    // console.log(
    //   data,
    //   "LOOOOOOOOOOOOOOOOOOOOOOK HEEEEEEEEEEEEEEEEEEEEEEREEEEEEEEEEEEEEEEEEEEEEEEEE"
    // );

    const thoughtData = await dispatch(editThought(data, thoughtToEdit?.id));

    if (thoughtData?.errors) {
      setErrors(thoughtData.errors);
      return;
    }

    if (cleanImage[0] == undefined) {
      // console.log("LOOOOOOOOOOOOOOOOOOOOOK HEEEEEEEEEEEEEEEEEEEEEEERE");
      await dispatch(
        uploadUrl({
          url: images[0],
          thought_id: thoughtToEdit?.id,
          user_id: user,
        })
      );
    }

    await addImage(cleanImage[0], thoughtData[1].id, user);
    history.push(`/thoughts/${thoughtData[1].id}`);
  };

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
          <form
            className="form_container_div form_edit_thought"
            onSubmit={handleEditThought}
          >
            <h1 className="new_thought">
              Edit details for {thoughtToEdit?.name}
            </h1>
            {errors.length ? (
              <div>
                <ul>
                  {errors.map((error, idx) => {
                    return (
                      <li className="error_list" key={idx}>
                        {error}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <></>
            )}
            <div className="div_edit_thought">
              <label className="label_edit">Name:</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="new_thought_input"
                placeholder="Name* (max 255 chars)"
              ></input>
            </div>
            <label className="label_input">
              Description: Count {description.length} (min: 100 limit: 1000)
            </label>
            <div className="div_edit_thought">
              {/* <label className="label_edit">Description:</label> */}
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea_description"
                placeholder="Description*"
              ></textarea>
            </div>
            <label className="label_input">
              Instructions: Count {instructions.length} (min: 50 limit: 500)
            </label>
            <div className="div_edit_thought">
              {/* <label className="label_edit">Instructions:</label> */}
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="textarea_description"
                placeholder="Instructions*"
              ></textarea>
            </div>
            <div className="div_edit_thought">
              <label>Select category:*</label>
              <select
                className="category_select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverages">Beverages</option>
              </select>
            </div>
            <div></div>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
              <button type="submit" className="post-thought-button">
                Edit Thought
              </button>
              <Link to={`/thoughts/${thoughtId}`} className="edit_link_div">
                <div className="post-thought-button">Cancel Edit</div>
              </Link>
            </div>
          </form>
          <ImageUploading
            multiple
            value={images}
            onChange={(imageList) => setImages(imageList)}
            maxNumber={1}
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
                      {image["data_url"] ? (
                        <img src={image["data_url"]} alt="" height="230" />
                      ) : (
                        <img src={image} alt="" height="230" />
                      )}
                      {/* <img src={image["data_url"]} alt="" height="230" /> */}
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
