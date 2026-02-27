import React, { useState, useRef, useEffect } from "react";
import style from "./TodoList.module.css";
import { ListItem } from "./ListItem.jsx/ListItem";
import { useDispatch, useSelector } from "react-redux";
import { addItem, delItem, editItem, setEditId } from "../Store/Reducer";

export function TodoList() {
  const display = useSelector((state) => state.display);
  const editId = useSelector((state) => state.editId);
  const inputVal = useSelector((state) => state.input);
  const dispatch = useDispatch();
  const input = useRef(null);

  useEffect(() => input.current.focus(), []);

  if (input !== null && input.current !== null) {
    input.current.value = inputVal;
  }

  const handleClick = () => {
    const newItem = {
      id: display.length + 1,
      text: input.current.value,
    };

    dispatch(addItem(newItem));
    if (newItem.text === "") {
      return;
    }

    input.current.value = "";
  };

  const saveChange = () => {
    dispatch(editItem(input.current.value, editId));
    dispatch(setEditId(-1));
    input.current.value = "";
  };

  return (
    <div
      className={` mt-3  border border-light border-3 rounded  container text-center`}
    >
      <h1 className="p-3 fw-medium">Tasks</h1>
      <div className="row">
        <div className="col-9 text-end ">
          <input ref={input} className={"form-control"} type="text" />
        </div>
        <div className="col text-start">
          <button
            className={`btn ${editId !== -1 ? "btn-success" : "btn-primary"}`}
            onClick={editId !== -1 ? saveChange : handleClick}
          >
            <i
              className={`bi ${
                editId !== -1 ? "bi-floppy" : "bi-plus-circle-dotted"
              }`}
            ></i>
          </button>
        </div>
      </div>
      <ul className="list-group list-group-flush mt-3">
        {display.map((obj) => (
          <li className="list-group-item fs-3">
            <ListItem id={obj.id} text={obj.text}></ListItem>
          </li>
        ))}
      </ul>
    </div>
  );
}
