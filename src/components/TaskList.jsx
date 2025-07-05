import { useState } from 'react';

const TaskList = ({ tasks, onUpdate, onDelete }) => {
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [error, setError] = useState('');

  const handleEditClick = (task) => {
    setEditTaskId(task.id);
    setEditTitle(task.title);
    setEditDesc(task.description || '');
    setError('');
  };

  const handleSave = () => {
    if (!editTitle.trim()) {
      setError('Title is required.');
      return;
    }

    onUpdate({
      id: editTaskId,
      title: editTitle.trim(),
      description: editDesc.trim(),
      completed: tasks.find((t) => t.id === editTaskId).completed,
      createdAt: tasks.find((t) => t.id === editTaskId).createdAt,
    });

    setEditTaskId(null);
    setEditTitle('');
    setEditDesc('');
    setError('');
  };

  const toggleStatus = (task) => {
    onUpdate({ ...task, completed: !task.completed });
  };

  return (
    <div className="mt-4 space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`p-4 rounded-lg border shadow-sm transition-all
            ${task.completed
              ? 'bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700'
              : 'bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700'}
          `}
        >
          {editTaskId === task.id ? (
            <div className="space-y-2">
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Title"
                className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
              />
              <input
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                placeholder="Description"
                className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => setEditTaskId(null)}
                  className="px-4 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2 ">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">{task.title}</h3>
              {/* <p className="text-gray-700 dark:text-gray-300">{task.description}</p> */}
              <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed break-words whitespace-pre-line max-w-full">
  {task.description}
</p>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                Status: {task.completed ? '✅ Completed' : '⏳ Pending'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Created: {task.createdAt}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  onClick={() => toggleStatus(task)}
                  className="px-3 py-1 text-sm rounded bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  Toggle Status
                </button>
                <button
                  onClick={() => handleEditClick(task)}
                  className="px-3 py-1 text-sm rounded bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="px-3 py-1 text-sm rounded bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
