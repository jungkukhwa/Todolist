import React, { useState, useEffect, useRef, useCallback } from "react";
import AddForm from "./component/AddForm";
import Todos from "./component/Todos";
import TodoHeader from "./component/TodoHeader";
import "./css/master.css";

const App = () => {
  //const [todoList, setTodoList] = useState([]); // 이렇게 하면 새로고침시 로컬 저장한 정보 다 날라감!
  const [todoList, setTodoList] = useState(() => {
    const localSavetodo = localStorage.getItem("todoList");
    if (localSavetodo) {
      return JSON.parse(localSavetodo);
    } else {
      return [];
    }
  });

  const [Id, setId] = useState(""); //새로고침 후 추가시 usestate값을 1로 넣으면 id 중복 오류 !!!
  const isMount = useRef(true);

  //처음 화면이 렌더링 되었을 때 false 라면, localstorage에 'todolist'를 생성한다. todolist가 변화될 때마다.

  useEffect(() => {
    if (!isMount.current) {
      window.localStorage.setItem("todoList", JSON.stringify(todoList));
      window.localStorage.setItem("Id", Id);
      console.log("로컬의 todoList를 변경했습니다.");
    }
  }, [todoList, Id]);

  //처음 화면이 렌더링 되었을 때만 실행된다.
  useEffect(() => {
    const localTodoList = window.localStorage.getItem("todoList");
    const localTodoId = window.localStorage.getItem("Id");
    // JSON.stringify()로 저장한 로컬스트리지의 항목을 가져올 때는 JSON.parse()로 가져온다.
    if (localTodoList) {
      setTodoList(JSON.parse(localTodoList));
    }

    if (localTodoId) {
      setId(JSON.parse(localTodoId));
    }

    isMount.current = false;
  }, []);

  //addTodos에 함수 메모리지, id값이 바뀔 때만 함수 return값 다시 계산, id 값이 변하지 않으면 기존에 있던 함수 return 값을 꺼내씀.
  const addTodo = useCallback(
    (todo) => (e) => {
      console.log("todo 추가");
      e.preventDefault(); // 이벤트 발생 막기
      if (todo) {
        setTodoList((prevTodos) => [
          ...prevTodos,
          { id: Id, todo: todo, checked: false },
        ]);
        setId((prevId) => prevId + 1);
      }
    },
    [Id]
  );

  const updateTodo = useCallback(
    (Id, todo, checked) => {
      const idx = todoList.findIndex((todoInfo) => todoInfo.id === Id);
      const newTodoList = [...todoList];
      newTodoList.splice(idx, 1, {
        id: Id,
        todo: todo,
        checked: checked,
      });
      setTodoList(newTodoList);
    },
    [todoList]
  );

  const deleteTodo = useCallback(
    (Id) => () => {
      const newTodoList = todoList.filter((todoInfo) => todoInfo.id !== Id);
      setTodoList(newTodoList);
    },
    [todoList]
  );

  const toggleChecked = useCallback(
    (id) => () => {
      const idx = todoList.findIndex((todoInfo) => todoInfo.id === id);
      const newTodoList = [...todoList];

      newTodoList[idx].checked = newTodoList[idx].checked ? false : true;
      setTodoList(newTodoList);
    },
    [todoList]
  );

  return (
    <div className="content">
      <TodoHeader />
      <AddForm addTodo={addTodo} />
      <ul>
        {todoList.map((todoInfo) => {
          return (
            <Todos
              key={todoInfo.id}
              id={todoInfo.id}
              todo={todoInfo.todo}
              checked={todoInfo.checked}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
              toggleChecked={toggleChecked}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default App;
