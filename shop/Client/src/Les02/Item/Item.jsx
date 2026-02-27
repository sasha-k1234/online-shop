import React from "react";
import style from './Item.module.css'
export function Item(props){
    const data = props.content;
    return (
        <div className={style.container}>
            <div>
                {data.id}
            </div>
            <div>
                {data.title}
            </div>
            <div>{data.price}</div>
        </div>
    );
}