import React, { useState } from "react";

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    // prevent default action
    e.preventDefault();
    const todoBtn = document.getElementsByClassName("todo-btn");
    todoBtn[0].style.background = "lightgray";
    if (value) {
      // add todo
      addTodo(value);
      // clear form after submission
      setValue("");
    }
    setTimeout(() => {
      todoBtn[0].style.background = "#8758ff";
    }, 100);
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="What is the task today?"
        required
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};
