const LOAD_REVIEWS = "reviews/LOAD";
const ADD_REVIEW = "review/ADD";
const EDIT_REVIEW = "review/EDIT";
const DELETE_REVIEW = "review/DELETE";

// action creators

const load = (reviews) => {
  return {
    type: LOAD_REVIEWS,
    reviews: reviews.reviews,
  };
};

const add = (review) => {
  return {
    type: ADD_REVIEW,
    review,
  };
};

const edit = (review) => {
  return {
    type: EDIT_REVIEW,
    review,
  };
};

const reviewToDelete = (deletedReview) => {
  return {
    type: DELETE_REVIEW,
    deletedReview,
  };
};

// Thunks.

export const getReviews = () => async (dispatch) => {
  const response = await fetch("/api/reviews/");

  if (response.ok) {
    const reviews = await response.json();
    dispatch(load(reviews));
  }
};

export const addReview = (data) => async (dispatch) => {
  //   console.log(data);

  const response = await fetch("/api/reviews/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // console.log(response);

  if (response.ok) {
    const review = await response.json();
    dispatch(add(review));
  } else {
    const data = await response.json();
    // check if there are errors.
    return { errors: data.errors };
  }
};

export const editReview = (data, review_id) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${review_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const editedReview = await response.json();
    dispatch(edit(editedReview));
  } else {
    const data = await response.json();
    if (data.errors) {
      return { errors: data.errors };
    }
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(reviewToDelete(data));
  }
};

const initialState = {};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      const allReviews = {};
      action.reviews.forEach((review) => {
        allReviews[review.id] = review;
      });

      return {
        ...state,
        ...allReviews,
      };
    case ADD_REVIEW:
      const newState = {
        ...state,
        [action.review.id]: action.review,
      };
      return newState;
    case EDIT_REVIEW:
      const editState = {
        ...state,
        [action.review.id]: action.review,
      };
      return editState;
    case DELETE_REVIEW: {
      const newState = {
        ...state,
      };
      //   console.log(action.review);
      delete newState[action.deletedReview.id];
      return newState;
    }
    default:
      return state;
  }
};

export default reviewReducer;
