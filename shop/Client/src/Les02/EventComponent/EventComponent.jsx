import React from "react";
export function EventComponent(props) {
    //useState
    const [count, setCount] = React.useState(0);
    let othercount = 0;


    // const Show=()=>{
    //    alert('Button Clicked!!!');
    // }
    const click = () => setCount(count + 1);
    // const click = () => {
    //     othercount+=1;
    
    // }
    return(
        <div>
            <div>{count}</div>
        <button onClick={click} >{props.text}</button>
        </div>
    );
}