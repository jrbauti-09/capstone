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
  const response = await fetch("/api/ingredients");
};
