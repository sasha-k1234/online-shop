import React from "react";
import style from "./Header.module.css"
import logo from "../../../images/react.png"
export function Header() {
  return (
    <div className={style.headerContainer+" text-center"}>
      <div className="row">
        <div className="col-2">
          <img className={style.image} src={logo} ></img>
        </div>
        <div className="col text-start">
          <h1>CountOpedia</h1>
        </div>
      </div>
    </div>
  );
}
