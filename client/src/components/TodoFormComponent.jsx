import React, { useState } from "react";
import api from "../API";
import toast, { Toaster } from "react-hot-toast";

const TodoFormComponent = ({ setTodos, todos }) => {
  const [todo, setTodo] = useState({ title: "", description: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await api.post("/todo", todo);
      toast.success("Todo created successfully!");
      
      // Ensure the new todo has the same structure as the existing todos
      const newTodo = response.data;
      setTodos([...todos, newTodo]);

      setTodo({ title: "", description: "" }); // Clear the form
    } catch (error) {
      setError("Something went wrong!");
      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex justify-center items-center bg-white">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded px-8 pt-16 pb-8 mb-4 w-full max-w-md"
        >
          <div className="mb-4">
            <h2 className="mb-3 text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create your todos
            </h2>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="todoTitle"
            >
              Add a new todo
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="todoTitle"
              type="text"
              placeholder="Enter your TODO"
              value={todo.title}
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            />
            <label
              className="block mb-2 mt-3 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="todoDescription"
            >
              Description
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="todoDescription"
              type="text"
              placeholder="Enter description"
              value={todo.description}
              onChange={(e) =>
                setTodo({ ...todo, description: e.target.value })
              }
            />
            {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none"
            >
              <svg
                className="h-3.5 w-3.5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                />
              </svg>
              {loading ? "Loading..." : "Add todo"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TodoFormComponent;
