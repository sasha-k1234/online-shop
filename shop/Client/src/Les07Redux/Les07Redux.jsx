import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { doIncrement } from "./Store/Reducer";
import { doDecrement } from "./Store/Reducer";
function Les07Redux() {

      const state = useSelector(state=>state);

//     const count = 0;//useSelector(state=>state.count);
     const dispatch = useDispatch();
 
    const Inc =()=>{
      dispatch({type: "INC"});
          //dispatch(doIncrement(1));
      //     dispatch({type: "INCREMENT", payload: 1});
    }
    const Dec =()=>{
      dispatch({type: "DEC"});

      //     dispatch(doDecrement(1));
    }
  return (
    <div className="container">
      <div className="h1">{state.inc.incValue} | {state.dec.decValue}</div>
      <button className="btn btn-primary"
            onClick={Inc}>+</button>
      <button className="btn btn-primary"
            onClick={Dec}>-</button>
    </div>
  );
}

export default Les07Redux;
