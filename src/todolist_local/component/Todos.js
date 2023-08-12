import React, { useState, useRef, useEffect, memo } from "react";

const Todos = memo(
  ({ id, todo, checked, deleteTodo, updateTodo, toggleChecked }) => {
    const [inputValue, setinputValue] = useState(todo);
    const [isUpdate, setisUpdate] = useState(false);
    const input = useRef();

    useEffect(() => {
      if (isUpdate) {
        input.current.focus();
      }
    }, [isUpdate]);

    useEffect(() => {
      setisUpdate(false);
    }, [todo]);

    const onClickTodo = () => {
      setisUpdate(true);
    };

    const onChangeInput = (e) => {
      setinputValue(e.target.value);
    };

    const onFormSubmit = (e) => {
      e.preventDefault();
      setisUpdate(false);
      if (!inputValue) {
        setinputValue(todo);
      } else {
        if (todo !== inputValue) {
          updateTodo(id, inputValue, checked);
        }
      }
    };

    const onBlurInput = () => {
      setisUpdate(false);
    };

    const onKeyUpInput = (e) => {
      if (e.key === "Escape") {
        setisUpdate(false);
      }
    };

    return (
      <li>
        <span
          onClick={toggleChecked(id)}
          className={checked ? "check" : "nocheck"}
        >
          {/* {checked ? "◼" : "◻"} */}
        </span>
        {isUpdate || (
          <span
            className={`todo ${checked ? "checked" : ""}`}
            onClick={onClickTodo}
          >
            {" "}
            {todo}{" "}
          </span>
        )}

        {isUpdate && (
          <form className="update-form" onSubmit={onFormSubmit}>
            <input
              ref={input}
              value={inputValue}
              onChange={onChangeInput}
              onBlur={onBlurInput}
              onKeyUp={onKeyUpInput}
            />
          </form>
        )}

        <button onClick={deleteTodo(id)} className="delect_btn">
          <span>-</span>
        </button>
      </li>
    );
  }
);

export default Todos;
