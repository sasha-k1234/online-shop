import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { regOperation } from '../../Store/AuthReducer';

function Registration() {
  const emailRef = useRef(0);
  const passwordRef = useRef(0);
  const dispatch = useDispatch();

  const registartionEvent = () =>{
    dispatch(regOperation(emailRef.current.value,passwordRef.current.value));
  }


  return (
    <main className="form-signin w-50 m-auto">
  <form>
    <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
    <h1 className="h3 mb-3 fw-normal">Registration</h1>

    <div className="form-floating">
      <input ref={emailRef} type="email" className="form-control mb-3" id="floatingInput" placeholder="name@example.com"/>
      <label htmlFor="floatingInput">Username</label>
    </div>
    <div className="form-floating">
      <input ref={passwordRef} type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
      <label htmlFor="floatingPassword">Password</label>
    </div>

    <div className="form-check text-start my-3">
      <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
      <label className="form-check-label" htmlFor="flexCheckDefault">
        Remember me
      </label>
    </div>
    <button className="btn btn-primary w-100 py-2" type="submit" onClick={registartionEvent}>Sign in</button>
    <p className="mt-5 mb-3 text-body-secondary">© 2024</p>
  </form>
</main>
  )
}

export default Registration