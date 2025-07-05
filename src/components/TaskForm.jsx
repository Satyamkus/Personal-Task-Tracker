import { useState } from 'react';

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd({
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date().toLocaleString(),
    });
    setTitle('');
    setDescription('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-6 mb-6 shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Add a New Task</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title (required)"
        className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        className="w-full mb-4 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskForm;
