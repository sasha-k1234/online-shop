import React from "react";
import style from "./Favorite.module.css";
import { Contact } from "../Contact/Contact";
export function FavouriteContact(props) {
  let contacts = props.contacts.map((obj)=><Contact handleDelete={props.handleDelete}  toggleFavorite={props.toggleFavorite} contact={obj} handleEditing={props.handleEditing}/>);
  return (
    <div className={`col-12 py-2 ${style.container}`}>
      <div className="text-center text-white-50">Favorite</div>
      <div className="p-2">
       {contacts}
      </div>
    </div>
  );
}
