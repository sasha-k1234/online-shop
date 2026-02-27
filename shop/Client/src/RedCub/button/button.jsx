import React from "react";
import Style from "./button.module.css";

export function MyButton(props) {
    return(
    <button className={Style.btn}>{props.text}</button>      
    );
}