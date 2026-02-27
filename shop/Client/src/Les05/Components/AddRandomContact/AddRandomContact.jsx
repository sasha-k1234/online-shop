import React from "react";
import { useDispatch } from "react-redux";
import { random } from "../../Store/AddDelReducer";
import { getRandomContact } from "../../Store/AddDelReducer";
export function AddRandomContact() {
  const dispatch = useDispatch();
  
const click = ()=>{
  dispatch(getRandomContact());
}

  return (
    <div>
      <button className="btn btn-secondary form-control fw-semibold" onClick={click}>
        Add Random Contact
      </button>
    </div>
  );
}
