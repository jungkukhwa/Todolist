import React, { useState, useRef, useEffect, memo } from "react";

const AddForm = memo(({ addTodo }) => {
  const [inputValue, setinputValue] = useState("");
  const input = useRef(); // 'input'은 특정 엘리먼트의 주소값을 담는 변수
  //특정 태그에 ref 속성을 붙이고 미리 할당했던 useRef 객체를 넣으면, 해당 태그의 주소값을 'input'이라는 변수가 가지고 있게 된다.

  useEffect(() => {
    input.current.focus();
    setinputValue("");
  }, [addTodo]);

  const onChangeInput = (e) => {
    setinputValue(e.target.value);
  };

  return (
    <form
      style={{
        display: "flex",
        justifyContent: "space-between",
        cursor: "pointer",
      }}
    >
      {/* <label>할일을 입력하세요!</label> */}
      <input
        className="todo_add"
        ref={input}
        type="text"
        value={inputValue}
        onChange={onChangeInput}
        placeholder="할 일을 입력하세요!"
      />
      <button
        className="todo_add_btn"
        type="submit"
        onClick={addTodo(inputValue)}
      >
        +
      </button>
    </form>
  );
});

export default AddForm;
