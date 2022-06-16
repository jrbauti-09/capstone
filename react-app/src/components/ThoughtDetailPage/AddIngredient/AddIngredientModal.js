import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import AddIngredient from "./AddIngredient";

export default function AddIngredientModal({ thoughtId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="add_review_modal_button"
        onClick={() => setShowModal(true)}
      >
        Add Ingredient
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddIngredient thoughtId={thoughtId} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}
