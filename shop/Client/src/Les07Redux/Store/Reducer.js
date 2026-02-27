import {defaultState} from './State'


const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
      case INCREMENT:
        return { ...state, count: state.count + action.payload };
      case DECREMENT:
        return { ...state, count: state.count - action.payload };
      default:
        return state;
    }
  };

 export const doIncrement = value =>({type:INCREMENT, payload: value })
 export const doDecrement =(value)=>({type:DECREMENT,payload:value})