
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adding, update } from "../../Store/AddDelReducer";
import { setEditContact } from "../../Store/EditReducer";
export function AddContact(props) {
  const dispatch = useDispatch();
  const edit = useSelector(state=>state.edit.editContact)
  const [editContactLocal,setEditContactLocal] = useState(null);

  
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const phoneRef = useRef(null)

  if (nameRef.current&&emailRef.current&&phoneRef.current) {
    nameRef.current.value = edit?.name??'';
    emailRef.current.value = edit?.email??'';
    phoneRef.current.value = edit?.phone??'';
  }

  const createContact = (e) => {
    e.preventDefault();
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const phone = phoneRef.current.value.trim();

    if (name === "" || email === "" || phone === "") {
      return;

    }

    const contact = {
      id: Date.now(),
      name: name,
      email: email,
      phone: phone,
      isFavorite: false
    };

    dispatch(adding(contact))
    
    e.target.elements.name.value = "";
    e.target.elements.email.value = "";
    e.target.elements.phoneNumber.value = "";

  };

  const editContact = (e) => {
    e.preventDefault();

    // e.target.elements.name.value = "";
    // e.target.elements.email.value = "";
    // e.target.elements.phoneNumber.value = "";
    
    edit.name = nameRef.current.value;
    edit.email = emailRef.current.value;
    edit.phone = phoneRef.current.value;
    dispatch(update(edit))
    dispatch(setEditContact(null))
    nameRef.current.value = '';
    emailRef.current.value = '';
    phoneRef.current.value = '';
  };
  return (
    <div className="row border text-white p-2 mt-3">
      <form onSubmit={edit === null ? createContact : editContact}>
        <div className="col-12 text-white-50">Add New Contact</div>
        <div className="row p-2">
          <div className="col-12 p-1 col-md-4">
            <input
            ref={nameRef}
              type="text"
              placeholder="name"
              className="form-control fw-semibold"
              name="name"
              defaultValue={edit?.name ?? ''}
            ></input>
          </div>
          <div className="col-12 p-1 col-md-4 ">
            <input
              ref={emailRef}
              type="text"
              placeholder="email"
              className="form-control fw-semibold"
              name="email"
              defaultValue={edit?.email??'' }
            ></input>
          </div>
          <div className="col-12 p-1 col-md-4">
            <input
              ref={phoneRef}
              type="text"
              placeholder="Phone Number"
              className="form-control fw-semibold"
              name="phoneNumber"
              defaultValue={
                edit?.phone??''
              }
            ></input>
          </div>

 
        </div>
        <div className="col-12 col-md-6 offset-md-3">
          <button
            className={`btn ${
              edit === null
                ? "btn-primary fw-semibold"
                : "btn-success fw-semibold"
            } form-control`}
          >
            {edit === null ? "Create" : "Edit"}
          </button>
        </div>
      </form>
    </div>
  );
}
