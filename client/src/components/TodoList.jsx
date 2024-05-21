import React, { useState, useEffect } from "react";
import api from "../API";
import TodoFormComponent from "./TodoFormComponent";

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

      // Update the TODO status on the server
      await api.put(`/todo/${id}`, { completed: updatedTodos.find(todo => todo.id === id).completed });
    } catch (error) {
      console.error("Error updating TODO:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col items-center mt-5 mb-5">
      <h2 className="text-2xl font-bold mb-4">TODO List</h2>
      <TodoFormComponent onTodoCreated={fetchTodos} /> 
      <div className="relative overflow-x-auto sm:rounded-lg w-full mx-auto max-w-5xl mt-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            TODOs
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Browse your list of TODOs.
            </p>
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Todo Title
              </th>
              <th scope="col" className="px-6 py-3">
                Todo Description
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Completed
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id} className="bg-white dark:bg-gray-800">
                <td
                  className={`px-6 py-4 font-medium text-gray-900 dark:text-white ${
                    todo.completed ? "line-through" : ""
                  }`}
                >
                  {todo.title}
                </td>
                <td
                  className={`px-6 py-4 ${
                    todo.completed ? "line-through" : ""
                  }`}
                >
                  {todo.description}
                </td>
                <td className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleCheckboxChange(todo.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
