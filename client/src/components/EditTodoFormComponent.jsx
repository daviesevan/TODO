import React, { useState, useEffect } from 'react';
import api from '../API';
import Button from './Button';

const EditTodoFormComponent = ({ todo, onClose, onTodoUpdated }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/todo/${todo.id}`, { title, description });
      onTodoUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating TODO:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative overflow-x-auto bg-gray-50 sm:rounded-lg w-full mx-auto max-w-5xl mt-4">
        <h2 className="text-2xl font-bold mt-4 px-6">Edit TODO</h2>
        <form onSubmit={handleSubmit} className='p-6'>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="todoTitle"
              type="text"
              placeholder="Enter your TODO"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="todoTitle"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" label="Update" className="bg-blue-500 text-white mr-2" />
            <Button onClick={onClose} label="Cancel" className="bg-gray-500 text-white" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodoFormComponent;
