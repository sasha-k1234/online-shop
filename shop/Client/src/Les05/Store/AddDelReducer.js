import axios from 'axios' 
const AddDelState = {
  contacts: JSON.parse(localStorage.getItem("contacts"))
    ? JSON.parse(localStorage.getItem("contacts"))
    : [],
};

const ADDING = "ADDING";
const DELETING = "DELETING";
const DELALL = "DELALL";
const UPDATE = "UPDATE";
const RANDOM = "RANDOM";

export const addDelReducer = (state = AddDelState, action) => {
  switch (action.type) {
    case ADDING:
      let add = (state.contacts = [...state.contacts, action.payload]);
      localStorage.setItem("contacts", JSON.stringify(state.contacts));
      return { ...state, add };
    case DELETING:
      let del = state.contacts.filter((el) => el.id !== action.payload);
      return { ...state, contacts: del };
    case DELALL:
      return { ...state, contacts: [] };
    case UPDATE:
      const index = state.contacts.findIndex(
        (el) => el.id === action.payload.id
      );
      const newArr = [...state.contacts];
      newArr[index] = { ...action.payload };
      return { ...state, contacts: newArr };
  }
  return state;
};

export const adding = (contact) => ({ type: ADDING, payload: contact });
export const deleting = (id) => ({ type: DELETING, payload: id });
export const deleteAll = (contact) => ({ type: DELALL, payload: contact });
export const update = (contact) => ({ type: UPDATE, payload: contact });
export const random = () => ({ type: RANDOM });

export const getRandomContact = () => {
  return async (dispatch) => {
    let response = await axios.get(
      "https://random-data-api.com/api/v2/users?size=1&response_type=json"
    );
    const json = response.data;
    const contact = {
      id: Date.now(),
      name: json.first_name + " " + json.last_name,
      email: json.email,
      phone: json.phone_number,
    };
    dispatch(adding(contact));
  };
};
