import logo from "./logo.svg";
import "./App.css";
import { Provider, useDispatch } from "react-redux";
import productReducer from "./Store/Reducer";
import authReducer, { createRefresh } from "./Store/AuthReducer";
import { thunk } from "redux-thunk";
import { applyMiddleware, combineReducers, createStore } from "redux";
import Main from "./Components/Main/Main";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Login/Login";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Registration from "./Components/Registartion/Registration";
import Users from "./Components/Users/Users";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import UsersPage from "./Components/UsersPage/UsersPage";
import userReducer from './Store/UserReducer';
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import Orders from "./Components/Orders/Orders";
import { orderReducer } from "./Store/OrderReducer";
import { environment } from "./environment";
import { useEffect } from "react";


const routeReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  user: userReducer,
  order:orderReducer,
});
const store = createStore(routeReducer, applyMiddleware(thunk));
function App() {
 
  return (
    
    <Provider store={store}>
      <BrowserRouter >
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/registration" element={<Registration/>}></Route>
        <Route path="/admin" element={<AdminPanel/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/userPage" element={<UsersPage/>}></Route>
        <Route path="/orders" element={<Orders/>}></Route>
      </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
