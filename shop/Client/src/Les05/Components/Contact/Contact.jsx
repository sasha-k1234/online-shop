import React from "react";
import style from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { deleting } from "../../Store/AddDelReducer";
import { editing, setEditContact } from "../../Store/EditReducer";

export function Contact(props) {
  const dipsatch = useDispatch()
  let name = props.contact.name;
  let email = props.contact.email;
  let phoneNum = props.contact.phone;
  let favorite = props.contact.isFavorite;

  const toggleFavorite = () =>{
      props.toggleFavorite(props.contact.id);
  }

  return (
    <div className={`row ${style.container}`}>
      <div className="col-2 col-md-1 pt-2 pt-md-1">
        <img src={`https:ui-avatars.com/api/?name=${name}`} className={style.avatar}></img>
      </div>
      <div className="col-6 col-md-5 text-warning pt-0 text-start">
        <span className="h4">{name}</span>

        <div className="text-white-50">
          {phoneNum}
          <br />
          {email}
        </div>
      </div>
      <div className="col-2 col-md-2 pt-2 pt-md-3">
        <button onClick={toggleFavorite}
          className={`btn btn-sm m-1 ${
            favorite ? "btn-warning" : "btn-outline-warning"
          }` }
        >
          <i class="bi bi-star"></i>
        </button>
      </div>
      <div className="col-2 col-md-2 pt-2 pt-md-3">
          <button className="btn btn-primary btn-sm m-1" onClick={()=>dipsatch(setEditContact(props.contact))}>
          <i class="bi bi-pencil-square"></i>
          </button>
           <button onClick={()=>dipsatch(deleting(props.contact.id))}  className="btn btn-danger btn-sm m-1" >
          <i class="bi bi-trash3-fill"></i>
          </button>
      </div>
    </div>
  );
}
