const LOAD_INGREDIENTS = "ingredients/LOAD";
const ADD_INGREDIENTS = "ingredients/ADD";
const EDIT_INGREDIENTS = "ingredients/EDIT";
const DELETE_INGREDIENTS = "ingredients/DELETE";

// action creators

const load = (ingredients) => {
  return {
    type: LOAD_INGREDIENTS,
    ingredients,
  };
};

const add = (ingredient) => {
  return {
    type: ADD_INGREDIENTS,
    ingredient,
  };
};

const edit = (ingredient) => {
  return {
    type: EDIT_INGREDIENTS,
    ingredient,
  };
};

const ingredientToDelete = (deletedIngredient) => {
  return {
    type: DELETE_INGREDIENTS,
    deletedIngredient,
  };
};

// Thunk

export const getIngredients = () => async (dispatch) => {
  const response = await fetch("/api/ingredients/");

  if (response.ok) {
    const ingredients = await response.json();
    dispatch(load(ingredients.ingredients));
  }
};

export const addIngredient = (data) => async (dispatch) => {
  const response = await fetch("/api/ingredients/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const ingredient = await response.json();
    dispatch(add(ingredient));
  } else {
    const data = await response.json();
    if (data.errors) {
      return { errors: data.errors };
    }
  }
};

export const editIngredient = (data, ingredient_id) => async (dispatch) => {
  const response = await fetch(`/api/ingredients/${ingredient_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const editedIngredient = await response.json();
    dispatch(edit(editedIngredient));
  } else {
    const data = await response.json();
    if (data.errors) {
      return { errors: data.errors };
    }
  }
};

export const deleteIngredient = (ingredient_id) => async (dispatch) => {
  const response = await fetch(`/api/ingredients/${ingredient_id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(ingredientToDelete(data));
  }
};

const initialState = {};

const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_INGREDIENTS:
      const allIngredients = {};
      action.ingredients.forEach((ingredient) => {
        allIngredients[ingredient.id] = ingredient;
      });

      return {
        ...state,
        ...allIngredients,
      };
    case ADD_INGREDIENTS:
      const newState = {
        ...state,
        [action.ingredient.id]: action.ingredient,
      };
      return newState;
    case EDIT_INGREDIENTS:
      const editState = {
        ...state,
        [action.ingredient.id]: action.ingredient,
      };
      return editState;
    case DELETE_INGREDIENTS:
      const deleteState = {
        ...state,
      };
      delete deleteState[action.deletedIngredient.id];
      return deleteState;
    default:
      return state;
  }
};

export default ingredientReducer;
