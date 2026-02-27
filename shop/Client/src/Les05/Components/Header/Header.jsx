import React from "react";
import style from "./Header.module.css";
import Logo from "../../../images/react.png";
 export function Header() {
    return(
       
            <div className={`row ${style.underscore}`}>
                <div className="col-1 ">
                <img className={style.img} src={Logo}></img>
                </div>
                <div className="col">
                    <h1 className="text-white text-start">Contacts</h1>
                </div>
            </div>
       
    );
 }