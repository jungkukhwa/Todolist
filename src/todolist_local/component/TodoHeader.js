import React from "react";
import "../css/master.css";

const TodoHeader = () => {
  const todayTime = () => {
    let now = new Date(); //현재 날짜
    let todayYear = now.getFullYear(); // 현재 년도
    let todayMonth = now.getMonth() + 1; // 현재 월
    let todayDate = now.getDate(); // 현재 일
    const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let dayOfWeek = week[now.getDay()];

    return todayYear + "-" + todayMonth + "-" + todayDate + "-" + dayOfWeek;
  };

  return (
    <div className="todo_header">
      <div className="date_area">
        <div className="left_date">{todayTime().slice(7, 9)}</div>
        <div className="right_date">
          <span>{todayTime().slice(10, 13)}</span>
          <span>{todayTime().slice(0, 4)}</span>
        </div>
      </div>
      <div className="title">
        <h1>TODO LIST</h1>
      </div>
    </div>
  );
};

export default TodoHeader;
