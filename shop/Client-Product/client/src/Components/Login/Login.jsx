import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { loginOperation } from "../../Store/AuthReducer";
import { useNavigate } from "react-router";
import { environment } from "../../environment";
function Login() {
  const emailRef = useRef(0);
  const passwordRef = useRef(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginClick = () => {
    dispatch(loginOperation(emailRef.current.value, passwordRef.current.value));
    navigate("/products");
  };
  useEffect(() => {

    if (!!environment.accessToken) {
      navigate("/products");
    }
  }, []);

  return (
    <main class="form-signin w-50 m-auto">
      <form>
        <img
          class="mb-4"
          src="/docs/5.3/assets/brand/bootstrap-logo.svg"
          alt=""
          width="72"
          height="57"
        />
        <h1 class="h3 mb-3 fw-normal">Login</h1>

        <div class="form-floating">
          <input
            ref={emailRef}
            type="email"
            class="form-control mb-3"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input
            ref={passwordRef}
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label for="floatingPassword">Password</label>
        </div>

        <div class="form-check text-start my-3">
          <input
            class="form-check-input"
            type="checkbox"
            value="remember-me"
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            Remember me
          </label>
        </div>
        <button
          class="btn btn-primary w-100 py-2"
          type="submit"
          onClick={loginClick}
        >
          Login
        </button>
        <p class="mt-5 mb-3 text-body-secondary">© 2024</p>
      </form>
    </main>
  );
}

export default Login;
