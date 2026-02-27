import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleImgUpload,
  handleProfileEditing,
  showProfilePage,
} from "../../Store/UserReducer";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { environment } from "../../environment";
import { loginOperation } from "../../Store/AuthReducer";
import placeholder from "../../image/userPlaceholder.jpg";
function UsersPage() {

  const dispatch = useDispatch();
  
  const [isEdit, setIsEdit] = useState(false);
  
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [displayPassword, setDisplay] = useState(false);
  
  const [newPasswordEdit, setNewEdit] = useState(false);
  const [displayNewPassword, setNewDisplay] = useState(false);
  
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [displayConfirm, setDisplayConfirm] = useState(false);
  
  const [file, setFile] = useState();
  const [previewImage, setPreview] = useState();
  
  const emailRef = useRef(0);
  const passwordRef = useRef(0);
  const newPasswordRef = useRef(0);
  const confirmRef = useRef(0);
  const fileRef = useRef(0);
  
  const profile = useSelector((state) => state.user.info);
  const photoUrl = useSelector((state) => state.auth.photoUrl);
  

  useEffect(() => {
    dispatch(showProfilePage());
    setPreview(photoUrl);
    if (!photoUrl) {
      setPreview(placeholder);
    }
  }, []);


  const checkPasswords = () => {
    if (passwordRef.current.value !== "") {
      if (newPasswordRef.current.value !== confirmRef.current.value) {
        toast.error("Passwords dont match!");
        return false;
      }

      if (passwordRef.current.value == newPasswordRef.current.value) {
        toast.error("Password must be unique!");
        return false;
      }
    }
    return true;
  };

  const editUser = () => {
    if (isEdit == true) {
      if (checkPasswords() == false) {
        return;
      }
      setIsEdit(false);
      dispatch(
        handleProfileEditing(
          emailRef.current.value,
          passwordRef.current.value,
          newPasswordRef.current.value
        )
      );
      if (file) {
        dispatch(handleImgUpload(file));

      }
      return;
    }
    setIsEdit(true);
  };
  const icon = isEdit == true ? <i class=" bi-floppy2-fill "></i> : "Edit";

  const handleFile = (e) => {
    
    if (e.target.files) {
      setPreview(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
  };

  return (
    <div class="card mx-auto m-5" style={{ width: "30rem", height: "" }}>
      <div class="card-body text-center ">
        <h4 class="card-title">Your Profile</h4>

        <div class="form-group">
          <label for="username" class="form-label d-flex align-items-center">
            <span class="bi bi-person-fill me-2 "></span>
            Username:
          </label>
          <input
            disabled={!isEdit}
            ref={emailRef}
            class="form-control mb-3 "
            id="username"
            defaultValue={profile.email}
          />
        </div>

        <div class="form-group">
          <label for="password" class="form-label d-flex align-items-center">
            <span class="bi bi-card-image me-2 "></span>
            Image:
          </label>
          <div>
            <input
              onChange={handleFile}
              disabled={!isEdit}
              ref={fileRef}
              type={"file"}
              class="form-control mb-4 "
              id="password"
            />
            <img className="w-25 rounded" src={previewImage} alt="no img"></img>
          </div>
        </div>

        <div class="form-group">
          <label for="password" class="form-label d-flex align-items-center">
            <span class="bi bi-lock-fill me-2 "></span>
            Password:
          </label>
          <div>
            <button
              onClick={() => setDisplay(!displayPassword)}
              style={{ position: "absolute", left: "88%" }}
              className="btn"
            >
              <i class="bi bi-eye"></i>
            </button>
            <input
              onChange={() => setPasswordEdit(passwordRef.current.value !== "")}
              disabled={!isEdit}
              ref={passwordRef}
              type={displayPassword == true ? "text" : "password"}
              class="form-control mb-4"
              id="password"
            />
          </div>
        </div>

        <div style={{ display: !passwordEdit ? "none" : "block" }}>
          <div class="form-group">
            <label for="password" class="form-label d-flex align-items-center">
              <span class="bi bi-lock-fill me-2 "></span>
              New Password:
            </label>
            <button
              onClick={() => setNewDisplay(!displayNewPassword)}
              style={{ position: "absolute", left: "88%" }}
              className="btn"
            >
              <i class="bi bi-eye"></i>
            </button>
            <input
              onChange={() => setNewEdit(newPasswordRef.current.value !== "")}
              disabled={!isEdit}
              ref={newPasswordRef}
              type={displayNewPassword == true ? "text" : "password"}
              class="form-control mb-4"
              id="password"
            />
          </div>

          <div class="form-group">
            <label for="password" class="form-label d-flex align-items-center">
              <span class="bi bi-check-lg me-2 fs-5 "></span>
              Confirm Password:
            </label>
            <button
              onClick={() => setDisplayConfirm(!displayConfirm)}
              style={{ position: "absolute", left: "88%" }}
              className="btn"
            >
              <i class="bi bi-eye"></i>
            </button>
            <input
              onChange={() => setConfirmEdit(confirmRef.current.value !== "")}
              ref={confirmRef}
              disabled={!isEdit}
              type={displayConfirm == true ? "text" : "password"}
              class="form-control mb-4"
              id="password"
            />
          </div>
        </div>
        <button
          onClick={editUser}
          class="btn btn-dark w-100 "
          role="button"
        >
          {icon}
          <ToastContainer
            type="error"
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
        </button>
      </div>
    </div>
  );
}

export default UsersPage;
