import React from "react";
import { Header } from "./CountOpedia/Header/Header";
import { Body } from "./CountOpedia/Body/Body";
import { Provider } from "react-redux";
import {reducer} from './CountOpedia/Store/Reducer';
import { createStore } from "redux";
const store = createStore(reducer);
export function Les03(){
    return (
        <Provider store={store}>
            <Header></Header>
            <Body></Body>
        </Provider>
    )
}