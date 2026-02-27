import React from 'react'
import Les07Redux from './Les07Redux'
import { Provider } from "react-redux";
import {combineReducers, createStore} from "redux";
import {reducer} from './Store/Reducer' 

  //action = {type: "INCREMENT", payload: ..}
  const initialIncState = {incValue: 0 };
  function incReducer(state = initialIncState, 
                      action){
    switch(action.type){
      case 'INC':
          return {...state, incValue: state.incValue+1};
    }
    return state;
  }

  const initilaDecState = {decValue: 0};
  function decReducer(state = initilaDecState, 
                      action){
    switch(action.type){
      case 'DEC':
        return {...state, decValue: state.decValue-1};
    }
    return state;
  }

  const rootReducer = combineReducers({
    inc: incReducer,
    dec: decReducer
  });

const store = createStore(rootReducer);

function Les07Index() {
  return (
    <Provider store={store}>
        <Les07Redux/>
    </Provider>
  )
}

export default Les07Index