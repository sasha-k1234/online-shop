import React from "react";
import { Contact } from "../Contact/Contact";
import style from "./GeneralContacts.module.css";
import { useDispatch } from "react-redux";
export function GeneralContacts(props){
  const dispatch = useDispatch()

    let contacts = props.contacts.map((obj)=>
    {
      return (<Contact 
                //handleDelete={props.handleDelete}  
                toggleFavorite={props.toggleFavorite} 
                contact={obj} 
                 handleEditing={props.handleEditing}
                 
                 />)});

    return(
    <div className={`col-12 py-2 ${style.container}`}>
      <div className="text-center text-white-50 ">General</div>
      <div className="p-2">
       {contacts}
      </div>
    </div>
    );  
}