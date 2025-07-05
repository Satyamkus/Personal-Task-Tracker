import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/DashBoard";

import { useAuth } from "./Context/AuthContext";
import { useTheme } from "./Context/ThemeContext";
// import 'App.css';

const PrivateRoute = ({ children }) => {
  const { username } = useAuth();
  return username ? children : <Navigate to="/" />;
};

const App = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
     <div className="flex justify-between items-center px-4 py-4 bg-gray-100 dark:bg-gray-900 shadow-md">
  <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
    Personal Task Tracker App
  </h1>

  <button
    className="px-4 py-2 rounded-md border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white transition-colors"
    onClick={toggleTheme}
  >
    {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
  </button>
</div>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
