import React from "react";
import { TodoList } from "./Todo-list/TodoList";
import { createStore } from "redux";
import { reducer } from "./Store/Reducer";
import { Provider } from "react-redux";

const store = createStore(reducer)
export function Les04(){

    return (
        <Provider store={store}>
            <TodoList></TodoList>
        </Provider>
    )
}