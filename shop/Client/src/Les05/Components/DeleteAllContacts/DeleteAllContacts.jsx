import React from "react";
import { useDispatch } from "react-redux";
import { deleteAll } from "../../Store/AddDelReducer";

export function DeleteAllContacts(props) {
    const dispatch = useDispatch()
        
    return(
        <div>
            <button className="btn btn-danger form-control fw-semibold" onClick={()=>dispatch(deleteAll())}>
            Delete All Contacts
            </button>
        </div>
    );
}