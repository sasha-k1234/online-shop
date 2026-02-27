import userStore from "./UserStore";
import { environment } from "../environment";
const PROFILE = "PROFILE";
const EDIT = "EDIT";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";

const userReducer = (state = userStore, action) => {
  switch (action.type) {
    case PROFILE:
      return { ...state, info: action.payload };
    case EDIT:
      return {
        ...state,
        info: {
          email: action.payload.email,
        },
      };
    case UPLOAD_IMAGE:
      return { ...state };
  }
  return state;
};

export const usersPage = (user) => ({ type: PROFILE, payload: user });
export const editProfile = (editUser) => ({ type: EDIT, payload: editUser });
export const setProfileImage = (file) => ({
  type: UPLOAD_IMAGE,
  payload: file,
});

export const showProfilePage = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(environment.apiUrl + "user/userPage", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${environment.accessToken}`,
        },
      });
      
      const data = await response.json();
      
      dispatch(usersPage(data));
    } catch (err) {

    }
  };
};

export const handleProfileEditing = (email, oldPassword, newPassword) => {
  return async (dispatch) => {

    try {

      const response = await fetch(environment.apiUrl + "user/editProfile", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${environment.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          oldPassword,
          newPassword,
        }),
      });
      
      if (response.ok) {
        dispatch(editProfile({ email }));
      }
    } catch (err) {

    }
  };
};

export const handleImgUpload = (file) => {
  return async (dispatch) => {
    try {
      const token = `Bearer ${environment.accessToken}`;

      const data = new FormData();
      data.append("photo", file);
      const response = await fetch(environment.apiUrl + "user/upload", {
        method: "PUT",
        headers: {
          "Authorization": token,
        },
        body: data,
      });
      dispatch(setProfileImage(file));
    } catch (err) {

    }
  };
};

export default userReducer;
