import React from 'react'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { addDelReducer } from './Store/AddDelReducer'
import { Provider } from 'react-redux';
import { ContactIndex } from './Components/ContactIndex/ContactIndex';
import { EditReducer } from './Store/EditReducer';
import {thunk} from 'redux-thunk';
const root = combineReducers({
    addDel:addDelReducer,
    edit:EditReducer
})
const store = createStore(root, applyMiddleware(thunk));

function Main() {
  return (
   <Provider store={store}>
    <ContactIndex></ContactIndex>
   </Provider>
  )
}

export default Main