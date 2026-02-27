import React from "react"
import s from './RedCub.module.css'

export function RedCub(props){

    let count = props.count;
    let subtitles = [];
    for (let i = 0; i < count; i++) {
        subtitles.push(<h3>{props.second_text}</h3>)
    }

    return (
        <div className={s.container}>
            <h1 className={s.red}>{props.text}</h1>
            {subtitles}
            {/* <h3 className={s.red}>{props.second_text}</h3> */}
        </div>
    );
}