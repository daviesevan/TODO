import React, { useState, useEffect } from "react";
import TodoFormComponent from "./TodoFormComponent";
import TodoList from "./TodoList";
import api from "../API";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await api.get("/todo");
      if (response.data && Array.isArray(response.data.todos)) {
        setTodos(response.data.todos);
      } else {
        console.error("Unexpected response format:", response.data);
        setTodos([]); // Set to an empty array if the response format is unexpected
      }
    } catch (error) {
      console.error("Error fetching TODOs:", error);
      setTodos([]); // Set to an empty array if there's an error fetching todos
    }
  };

  return (
    <div>
      <TodoFormComponent setTodos={setTodos} todos={todos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default TodoApp;
