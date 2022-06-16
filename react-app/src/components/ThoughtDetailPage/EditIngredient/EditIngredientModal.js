import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditIngForm from "./EditIngredient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

export default function EditIngredientModal({
  thoughtId,
  ingredientId,
  // setIngredientIndex,
  // idx,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <FontAwesomeIcon
        icon={faPencil}
        // className="add_review_modal_button"
        onClick={() => handleClick()}
        style={{ cursor: "pointer", marginRight: "1em" }}
        className="ingredient_button"
      ></FontAwesomeIcon>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditIngForm
            thoughtId={thoughtId}
            ingredientId={ingredientId}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </>
  );
}
