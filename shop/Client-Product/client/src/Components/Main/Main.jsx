import React from 'react'
import { Link } from 'react-router-dom'

function Main() {
  return (
    <div>
        <div className="row py-lg-5">
      <div className="col-lg-6 col-md-8 mx-auto">
        <h1 className="fw-light">Sign in into your account</h1>
        <p className="lead text-body-secondary">For comfortable shopping</p>
        <p>
          <Link to={'/login'} className="btn btn-dark my-2 m-3">Login</Link>
          <Link to={'/registration'} className="btn btn-secondary my-2">Registration</Link>
        </p>
      </div>
    </div>
    </div>
  )
}

export default Main