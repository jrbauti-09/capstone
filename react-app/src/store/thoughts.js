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
    dispatch(thoughts);
  }
};

export const addThought = (data) => async (dispatch) => {
  const response = await fetch("/api/thoughts", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const thought = await response.json();
    dispatch(add(thought));
    return ["Created", thought];
  }
};

export const editThought = (data, thoughtId) => async (dispatch) => {
  const response = await fetch(`/api/thoughts/${thoughtId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const editedThought = await response.json();
    dispatch(edit(editedThought));
    return ["Created", editedThought];
  }
};

export const deleteThought = (thoughtId) => async (dispatch) => {
  const response = await fetch(`/api/thoughts/${thoughtId}`, {
    methods: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteThought(data));
  }
};

/******* TODO: still need to create route for images ***************/

export const uploadFile = (fileForm) => async (dispatch) => {
  const { thought_id, file, newFile } = fileForm;

  const form = new FormData();
  form.append("file", file);
  form.append("thought_id", thought_id);
  form.append("newFile", newFile);

  const res = await fetch("/api/thoughts/images", {
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
    default:
      return state;
  }
};

export default thoughtReducer;