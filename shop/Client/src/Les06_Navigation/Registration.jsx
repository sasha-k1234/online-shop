import React from 'react'
import style from './Registration.module.css'
 export default function Registration() {
  return (
    <div className='mainCont'>
    <div className="container mt-5">
    <h2 className="mb-4">Sign In</h2>

    <form className="needs-validation" noValidate>
      <div className="mb-3">
        <label htmlFor="validationCustom01" className="form-label">
          First name
        </label>
        <input
          type="text"
          className="form-control"
          id="validationCustom01"
          placeholder="First name"
          required
        />
        <div className="invalid-feedback">Please enter your first name.</div>
      </div>

      <div className="mb-3">
        <label htmlFor="validationCustom02" className="form-label">
          Last name
        </label>
        <input
          type="text"
          className="form-control"
          id="validationCustom02"
          placeholder="Last name"
          required
        />
        <div className="invalid-feedback">Please enter your last name.</div>
      </div>

      <div className="mb-3">
        <label htmlFor="validationCustomUsername" className="form-label">
          
        </label>
        <div className="input-group has-validation">
          <span className="input-group-text" id="inputGroupPrepend">
          <i class="bi bi-lock"></i>
          </span>
          <input
            type="text"
            className="form-control"
            id="validationCustomUsername"
            placeholder="Username"
            aria-describedby="inputGroupPrepend"
            required
          />
          <div className="invalid-feedback">Please choose a username.</div>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="validationCustom03" className="form-label">
          City
        </label>
        <input
          type="text"
          className="form-control"
          id="validationCustom03"
          placeholder="City"
          required
        />
        <div className="invalid-feedback">Please provide a valid city.</div>
      </div>

      <div className="mb-3">
        <label htmlFor="validationCustom05" className="form-label">
          Zip
        </label>
        <input
          type="text"
          className="form-control color-grey"
          id="validationCustom05"
          placeholder="Zip"
          required
        />
        <div className="invalid-feedback">Please provide a valid zip.</div>
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="invalidCheck"
          required
        />
        <label className="form-check-label" htmlFor="invalidCheck">
          Agree to terms and conditions
        </label>
        <div className="invalid-feedback">
          You must agree before submitting.
        </div>
      </div>
    
      <button className="btn btn-primary" type="submit">
        Submit form
      </button>
    </form>
  </div>
  </div>
);
};
  

