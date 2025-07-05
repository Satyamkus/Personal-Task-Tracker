import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  // console.log(tasks);
  const [countAll, setcountAll] = useState(tasks.length);
  const [countPending, setCountPending] = useState(0);
  const [countComplete, setcountComplete] = useState(0);
  const counttask = (tasks) => {
    console.log(tasks);
    let complete = 0;
    let pending = 0;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].completed === true) {
        complete++;
      } else {
        pending++;
      }
    }
    setCountPending(pending);
    setcountComplete(complete);
    setcountAll(tasks.length);
  };
  // counttask(tasks);

  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const { username, logout } = useAuth();

  useEffect(() => {
    const stored = localStorage.getItem(`tasks_${username}`);
    setTasks(stored ? JSON.parse(stored) : []);
  }, [username]);

  useEffect(() => {
    localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
    counttask(tasks);
  }, [tasks, username]);

  const addTask = (task) => setTasks([...tasks, task]);
  const updateTask = (updatedTask) =>
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  const  deleteTask = (id) => {
    // alert("Are u sure to delete task");
    if(confirm ("Are u sure to delete task")){
      setTasks(
        tasks.filter((t) => t.id !== id))
    }
    
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  return (
    <>
    <div className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Welcome,{" "}
          <span className="text-indigo-600 dark:text-indigo-400">
            {username}
          </span>
        </h2>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="mt-4 md:mt-0 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
        >
          Logout
        </button>
      </div>
    <div className="max-w-4xl mx-auto px-4 py-6">
      

      <TaskForm onAdd={addTask} />

      <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
        <button
          onClick={() => setFilter("All")}
          className={`px-4 py-2 rounded-md ${
            filter === "All"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          }`}
        >
          All {countAll}
        </button>
        <button
          onClick={() => setFilter("Completed")}
          className={`px-4 py-2 rounded-md ${
            filter === "Completed"
              ? "bg-green-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          }`}
        >
          Completed {countComplete}
        </button>
        <button
          onClick={() => setFilter("Pending")}
          className={`px-4 py-2 rounded-md ${
            filter === "Pending"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          }`}
        >
          Pending {countPending}
        </button>
      </div>

      <TaskList
        tasks={filteredTasks}
        onUpdate={updateTask}
        onDelete={deleteTask}
      />
    </div>
    </>
  );
  
};


export default Dashboard;
