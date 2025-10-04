import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    message: "this is todo slice",
    todos: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {},
    updateTodo: (state, action) => {},
  },
});

export default todoSlice.reducer;
export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
