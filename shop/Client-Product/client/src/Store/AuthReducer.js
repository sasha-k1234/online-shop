import authStore from "./AuthStore";
import { environment } from "../environment";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getCartAction } from "./Reducer";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const REGISTRATION = "REGISTRATION";
const USERS = "USERS";
const USERSPAGE = "USERSPAGE";
const REFRESH = "REFRESH";

function callRefresh() {
  const decode = jwtDecode(environment.accessToken);
  let expires = (environment.expiresIn = decode.exp * 1000);
  let currTime = expires - Date.now(); //- 1000*60;

  const intervalId = setInterval(() => {
    refresh();

  }, currTime);
  environment.intervalsId.push(intervalId);
}

const authReducer = (state = authStore, action) => {
  switch (action.type) {
    case REGISTRATION:
      return { ...state, regStatus: action.payload };
    case LOGIN:
      const decode = jwtDecode(action.payload.token);
      environment.accessToken = action.payload.token;
      let expires = (environment.expiresIn = decode.exp * 1000);
      let currTime = expires - Date.now(); //- 1000*60;
      callRefresh();
      
      
      

      return {
        ...state,
        token: action.payload.token,
        regStatus: false,
        isAdmin: decode.role === "admin",
        photoUrl: !action.payload.photoUrl
          ? null
          : environment.apiUrl + action.payload.photoUrl,
        isLoggedIn: true,
      };
    case USERS:
      return { ...state, users: action.payload };
    case LOGOUT:
      environment.accessToken = "";
      environment.intervalsId.forEach((id)=>clearInterval(id));
      return { ...state, isLoggedIn: false, isAdmin: false };
    case USERSPAGE:
      return { ...state, cart: action.payload };
    case REFRESH:
      const decodeToken = jwtDecode(action.payload.token);
      callRefresh();
      return {
        ...state,
        token: action.payload.token,
        regStatus: false,
        isAdmin: decodeToken.role === "admin",
        photoUrl: !action.payload.photoUrl
          ? null
          : environment.apiUrl + action.payload.photoUrl,
        isLoggedIn: true,
      };
  }
  return state;
};

export default authReducer;

export const loginAction = (token) => ({ type: LOGIN, payload: token });
export const registration = (status) => ({
  type: REGISTRATION,
  payload: status,
});
export const setUsers = (users) => ({ type: USERS, payload: users });
export const logout = () => ({ type: LOGOUT });
export const usersPage = (user) => ({ type: USERSPAGE, payload: user });
export const refreshToken = (token) => ({ type: REFRESH, payload: token });

export const regOperation = (email, password) => {
  return async (dispatch) => {
    try {
      //debugger;
      const response = await fetch(environment.apiUrl + "auth/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.text();
      // alert('reg');
      
      alert(JSON.stringify(response));
      dispatch(registration(response));
    } catch (err) {

    }
  };
};

export const loginOperation = (login, password) => {
  return async (dispatch) => {
    try {
      //  const response = await fetch(environment.apiUrl+'auth/login',{
      //    method:'POST',
      //    headers:{
      //      "Content-Type":"application/json"
      //    },
      //    body:JSON.stringify({login,password})
      //  })

      const response = await axios({
        method:'post',
        url:environment.apiUrl + "auth/login",
        data:{
          login,
          password,
        },
        // withCredentials:true
      });

      dispatch(
        loginAction({
          token: response.data.accessToken,
          photoUrl: response.data.photoUrl,
        })
      );
      //alert(response.data.accessToken);
      dispatch(getCartAction());
    } catch (err) {

    }
  };
};

export const getUsersAction = () => {
  return async (dispatch) => {
    try {
      // const response = await axios.get(environment.apiUrl + "users");
      const response = await fetch(environment.apiUrl + "admin/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${environment.accessToken}`,
        },
      });

      const data = await response.json();
      dispatch(setUsers(data));
    } catch (err) {

    }
  };
};

export const createRefresh = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(environment.apiUrl + "auth/refresh");
      if (response.ok) {
        const token = await response.text();
        environment.accessToken = token;
        dispatch(refreshToken({ token }));
      }
    } catch (err) {

    }
  };
};

export const logoutFetch = () => {
  return async (dispatch) => {
    const response = await fetch(environment.apiUrl+'auth/logout',{
      method:"POST",
      headers: {
        Authorization: `Bearer ${environment.accessToken}`,
      },
    });
    if (response.ok) {
      dispatch(logout());
    }
  };
};

async function refresh() {
  try {
    const response = await fetch(environment.apiUrl + "auth/refresh",{
      method:"GET",
      credentials:'include',
    });
    if (response.ok) {
      const token = await response.text();
      environment.accessToken = token;
    } else{
      environment.accessToken = null;

    }
  } catch (err) {

  }
}
