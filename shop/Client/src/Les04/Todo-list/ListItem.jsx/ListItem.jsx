import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, delItem, editItem, setEditId, setInpVal } from "../../Store/Reducer";
export function ListItem(props) {
const dispatch = useDispatch();
  return (
    <div className="row text-center">
      <div className="col-6 p-2">{props.text}</div>
      <div className="col text-end">
        <button className="btn btn-outline-warning" 
          onClick={()=>
          {
            dispatch(setInpVal(props.text));
            dispatch(setEditId(props.id));
          }}>
          <i className="bi bi-pencil-square"></i>
        </button>
      </div>
      <div className="col text-start">
        <button onClick={()=>dispatch(delItem(props.id))} className="btn btn-outline-danger">
          <i className="bi bi-trash-fill"></i>
        </button>
      </div>
    </div>
  );
}
