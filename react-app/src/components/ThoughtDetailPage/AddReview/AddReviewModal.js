import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import AddReview from "./AddReview";

import "./AddReviewModal.css";

export default function AddReviewModal({ thoughtId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="add_review_modal_button"
        onClick={() => setShowModal(true)}
      >
        Add Review
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddReview thoughtId={thoughtId} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}
