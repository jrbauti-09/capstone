import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditReview from "./EditReview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

export default function EditReviewModal({
  thought_id,
  reviewId,
  setReviewIndex,
  idx,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
    setReviewIndex(idx);
    // console.log(thought_id);
  };

  return (
    <>
      <FontAwesomeIcon
        icon={faPencil}
        // className="add_review_modal_button"
        onClick={() => handleClick()}
        style={{ cursor: "pointer" }}
      ></FontAwesomeIcon>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReview
            thoughtId={thought_id}
            reviewId={reviewId}
            setReviewIndex={setReviewIndex}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </>
  );
}
