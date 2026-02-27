import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import style from './Header.module.css';
import Dropdown from "react-bootstrap/Dropdown";
export default function Header() {
  return (
    <nav className={`navbar navbar-expand-md navbar-dark fixed-top bg-dark ${style.fontSize} `}>
    <div className="container-fluid d-flex">
      <Link className="navbar-brand fw-bold fs-4" to="/"><img src=''></img></Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav m-auto mb-2 mb-md-0">
          <li className="nav-item">
            <NavLink className={({isActive})=>isActive?"nav-link active text-primary fw-semibold ":"nav-link fw-semibold "} to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link fw-semibold " to="/About">About</NavLink>
          </li>
          
          <li className='nav-item'>
            <NavLink className='nav-link fw-semibold' to="/Registration">Sign In</NavLink>
          </li>

          <li class="nav-item dropdown">
            <Dropdown>
            <Dropdown.Toggle variant='' className={`${style.fontSize} fw-semibold`}>Product</Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu">
              <Dropdown.Item><NavLink className="dropdown-item" to='/product/List'>List</NavLink></Dropdown.Item>
              <Dropdown.Item><NavLink className="dropdown-item" to='/Product/Details'>Details</NavLink></Dropdown.Item>
              <Dropdown.Item><NavLink className="dropdown-item" to='/Product/Create'>Product Create</NavLink></Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>

        {/* <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form> */}
        
      </div>
    </div>
  </nav>
  )
}
