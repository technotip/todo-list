import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState(
    localStorage.getItem("todos") === null
      ? []
      : JSON.parse(localStorage.getItem("todos"))
  );

  const Storage = (newTodos) => {
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const addTodo = (todo) => {
    const newTodos = [
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
      ...todos,
    ];
    Storage(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    Storage(newTodos);
  };

  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    Storage(newTodos);
  };

  const editTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    );
    Storage(newTodos);
  };

  const editTask = (task, id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    );
    Storage(newTodos);
  };

  return (
    <div className="TodoWrapper">
      <div className="part1">
        <h5>Get Things Done</h5>
        <TodoForm addTodo={addTodo} />
      </div>
      <div className="part2">
        {/* display todos */}
        {todos.map((todo, index) =>
          todo.isEditing ? (
            <EditTodoForm
              editTodo={editTask}
              task={todo}
              key={index + "edit"}
            />
          ) : (
            <Todo
              key={todo.id}
              task={todo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              toggleComplete={toggleComplete}
            />
          )
        )}
      </div>
    </div>
  );
};
