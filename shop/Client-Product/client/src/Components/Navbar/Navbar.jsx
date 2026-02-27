import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { UseDispatch } from "react-redux";
import { logout, logoutFetch, setUsers } from "../../Store/AuthReducer";
import Cart from "../Cart/Cart";
import { clearCart } from "../../Store/Reducer";
import Admin from "../AdminPanel/AdminPanel";
import { useEffect } from "react";
import { createRefresh } from "../../Store/AuthReducer";
import { environment } from "../../environment";

function Navbar() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLoggedIn);

  const isAdmin = useSelector((state) => state.auth.isAdmin);
  useEffect(() => {
    dispatch(createRefresh());
    window.addEventListener("storage", (e) => {
      //2

      if (e.storageArea == localStorage) {


        if (localStorage.getItem("logout")) {

          dispatch(logoutFetch());
          dispatch(setUsers([]));
          dispatch(clearCart());
        }
      }
    });
  }, []);
  
  const logoutClick = () => {
    //1
    localStorage.setItem("logout", ",");
    dispatch(logoutFetch());
    dispatch(setUsers([]));
    dispatch(clearCart());
    setTimeout(() => {
      localStorage.removeItem("logout");
    }, 1000);
  };

  const cartLength = useSelector((state) => state.product.cart).length;

  const cartNums = () => {
    let cartArr = Array.from(cartLength.toString());
    return cartArr.map((num) => <i className={`bi bi-${num}-square fs-6`}></i>);
  };



  const admin = isAdmin ? (
    <li className="nav-item">
      <NavLink to="/admin" className="nav-link">
        Admin
      </NavLink>
    </li>
  ) : (
    ""
  );

  return (
    <nav
      className="navbar navbar-expand-sm navbar-dark bg-dark fw-medium"
      aria-label="Third navbar example"
    >
      <div className="container-fluid ">
        <Link className="navbar-brand" to="/">
          <i class="bi bi-shop-window fs-4"></i>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample03"
          aria-controls="navbarsExample03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse " id="navbarsExample03">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>

            {admin}

            <li className="nav-item">
              <NavLink
                to={"/products"}
                className="nav-link"
                aria-disabled="true"
              >
                Products
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={"/orders"}>
                    Orders
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <div style={{ display: "flex", alignItems: "center" }}>
            <NavLink to={"/userPage"}>
              <i
                class="bi bi-person fs-4"
                style={isLogged ? { color: "white" } : { display: "none" }}
              ></i>
            </NavLink>

            <button
              style={isLogged ? {} : { display: "none" }}
              className="btn btn-dark fs-5 "
              onClick={logoutClick}
            >
              <i class="bi bi-box-arrow-right"></i>
            </button>

            <NavLink to={"/cart"} style={{ display: environment.accessToken? "block":"none" }}>
              <i class="bi bi-cart m-3 fs-5" style={{ color: "white" }}>
                {cartNums()}
              </i>
            </NavLink>
          </div>
          <form role="search">
            <input
              className="form-control "
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
