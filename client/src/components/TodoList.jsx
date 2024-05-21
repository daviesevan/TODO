import React, { useState, useEffect } from "react";
import api from "../API";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTodos();
  }, [currentPage]); // Fetch todos when currentPage changes

  const fetchTodos = async () => {
    try {
      const response = await api.get(`/todo?page=${currentPage}`);
      setTodos(response.data.todos);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching TODOs:", error);
    }
  };

  const handleCheckboxChange = async (id) => {
    try {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      setTodos(updatedTodos);
      // If you want to update the TODO status on the server, you can make a PUT request here
      // await api.put(`/todos/${id}`, { completed: !todo.completed });
    } catch (error) {
      console.error("Error updating TODO:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold mb-4">TODO List</h2>
      <ul className="w-full max-w-md">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-white rounded px-4 py-2 mb-2"
          >
            <div className="flex">
              <div className="flex items-center h-5">
                <input
                  id="helper-checkbox"
                  aria-describedby="helper-checkbox-text"
                  type="checkbox"
                  checked={todo.completed || false} // Ensure a default value
                  onChange={() => handleCheckboxChange(todo.id)}
                  className="mr-2"
                />
                <div className="ms-2 text-sm">
                  <span
                    className={`${
                      todo.completed
                        ? "line-through text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        : ""
                    }`}
                  >
                    {todo.title}
                  </span>
                </div>
                <br />
                <p
                  id="helper-checkbox-text"
                  className="text-xs font-normal text-gray-500 dark:text-gray-300"
                >
                  {todo.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`mx-1 px-3 py-1 rounded ${
              page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
