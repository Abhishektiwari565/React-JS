import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../slice/todoSlice.js";

export default function Todo() {
  const dispatch = useDispatch();
  const { todos, message } = useSelector((state) => state.todos);

  return (
    <div>
      <h2>{message}</h2>
      <div>
        {todos.map((todo, index) => (
          <p key={index}>{todo}</p>
        ))}
      </div>

      <button onClick={() => dispatch(addTodo("task-1"))}>
        Add
      </button>
    </div>
  );
}
