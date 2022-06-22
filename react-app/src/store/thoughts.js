const LOAD_THOUGHTS = "thoughts/LOAD";
const ADD_THOUGHT = "thought/ADD";
const EDIT_THOUGHT = "thought/EDIT";
const DELETE_THOUGHT = "thought/DELETE";

// action creators

const load = (thoughts) => {
  return {
    type: LOAD_THOUGHTS,
    thoughts: thoughts.thoughts,
  };
};

const add = (thought) => {
  return {
    type: ADD_THOUGHT,
    thought,
  };
};

const edit = (thought) => {
  return {
    type: EDIT_THOUGHT,
    thought,
  };
};

const thoughtToDelete = (deletedThought) => {
  return {
    type: DELETE_THOUGHT,
    deletedThought,
  };
};

// Thunks.

export const getThoughts = () => async (dispatch) => {
  const response = await fetch("/api/thoughts");

  if (response.ok) {
    const thoughts = await response.json();
    dispatch(load(thoughts));
  }
};

export const addThought = (data) => async (dispatch) => {
  const response = await fetch("/api/thoughts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const thought = await response.json();
    dispatch(add(thought));
    return ["Created", thought];
  } else {
    const data = await response.json();
    if (data.errors) {
      return { errors: data.errors };
    }
  }
};

export const editThought = (data, thoughtId) => async (dispatch) => {
  // console.log(data, thoughtId, "LOOK HERE ******************");

  const response = await fetch(`/api/thoughts/${thoughtId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const editedThought = await response.json();
    // console.log(editedThought, "THIS IS THE EDITED THOUGHT");
    dispatch(edit(editedThought));
    return ["Created", editedThought];
  } else {
    const data = await response.json();
    if (data.errors) {
      return { errors: data.errors };
    }
  }
};

export const deleteThought = (thoughtId) => async (dispatch) => {
  // console.log(thoughtId, "LOOK HERE THOUGHT ID");

  const response = await fetch(`/api/thoughts/${thoughtId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(thoughtToDelete(data));
  }
};

/******* TODO: still need to create route for images ***************/

export const uploadFile = (fileForm) => async (dispatch) => {
  const { thought_id, user_id, file, newFile } = fileForm;

  // console.log(file, "THIS IS FROM THE THUNK");
  const form = new FormData();
  form.append("file", file);
  form.append("thought_id", thought_id);
  form.append("user_id", user_id);
  form.append("newFile", newFile);
  // eslint-disable-next-line
  const res = await fetch("/api/thoughts/images", {
    method: "POST",
    body: form,
  });
};

export const uploadUrl = (data) => async (dispatch) => {
  const { url, thought_id, user_id } = data;

  // console.log(data);

  const form = new FormData();
  form.append("url", url);
  form.append("thought_id", thought_id);
  form.append("user_id", user_id);
  // eslint-disable-next-line
  const response = fetch("/api/thoughts/image", {
    method: "POST",
    body: form,
  });
};

// Reducer and initial state

const initialState = {};

const thoughtReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_THOUGHTS:
      const allThoughts = {};
      action.thoughts.forEach((thought) => {
        allThoughts[thought.id] = thought;
      });

      return {
        ...state,
        ...allThoughts,
      };
    case ADD_THOUGHT:
      const newState = {
        ...state,
        [action.thought.id]: action.thought,
      };
      return newState;
    case DELETE_THOUGHT:
      const newstate = {
        ...state,
      };
      delete newstate[action.deletedThought.id];
      return newstate;
    case EDIT_THOUGHT:
      const editState = {
        ...state,
        [action.thought.id]: action.thought,
      };
      return editState;
    default:
      return state;
  }
};

export default thoughtReducer;
