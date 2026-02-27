import { type } from "@testing-library/user-event/dist/type";
import { defaultState } from "./State";

const ADD = "ADD";
const DELETE = "DELETE";
const EDIT = "EDIT";
const SETEDITID = "SETEDITID";
const SETINPUTVAL = "SETINPUTVAL";

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD:
      let arr = [...state.display, action.payload];
      localStorage.setItem("tasks", JSON.stringify(arr));
      return { ...state, display: arr };
    case DELETE:
      let display = state.display.filter((el) => el.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(display));
      return { ...state, display };
    case EDIT:
      let editDisplay = state.display.find((el) => el.id == action.payload.id);
      editDisplay.text = action.payload.text;
      localStorage.setItem("tasks", JSON.stringify(editDisplay));
      return { ...state };
    case SETEDITID:
      return { ...state, editId: action.payload };
    case SETINPUTVAL:
      return { ...state, input: action.payload };
  }
  return state;
};

export const addItem = (task) => ({ type: ADD, payload: task });
export const delItem = (id) => ({ type: DELETE, payload: id });
export const editItem = (text, id) => ({
  type: EDIT,
  payload: { text: text, id: id },
});
export const setEditId = (editId) => ({ type: SETEDITID, payload: editId });
export const setInpVal = (value) => ({ type: SETINPUTVAL, payload: value });
