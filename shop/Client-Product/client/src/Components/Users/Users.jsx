import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAction } from "../../Store/AuthReducer";

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);
  const isAdmin = useSelector((state)=>state.auth.isAdmin);
  //const admins = useSelector((state)=>state.auth.admins);
 

  useEffect(() => {
    dispatch(getUsersAction());
  }, []);
      
  // const cards =admins ? users.map((el) => (
  //   <div className="row fs-5">
  //     <div className="col">email: {el.email}</div>
  //     <div className="col">role: {el.role}</div>
  //   </div>
  // )):<div style={{display:"none"}}></div>
  
  const cards = users.map((el) => (
      <div className="row fs-5">
        <div className="col">email: {el.email}</div>
        <div className="col">role: {el.role}</div>
      </div>
    ));

    
   return (isAdmin?<div><h2>For admins Only</h2>{cards}</div>:<div style={{"display":"none"}}></div>)
}


export default Users;
