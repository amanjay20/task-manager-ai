import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import API from './api';



function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch tasks
  useEffect( ()=>{
    API.get("/tasks").then( res => setTasks(res.data))
  })

  // Add task
  const addTask = async()=>{
    if (!title.trim()) return;
    const res  = await API.post("/tasks", {title})
    setTasks([...tasks , res.data])
    setTitle()
  }

  // Toggle task status
  const toggleTask = async (task) => {
    const updated = { ...task, status: task.status === "pending" ? "completed" : "pending" };
    const res = await API.put(`/tasks/${task._id}`, updated);
    setTasks(tasks.map(t => (t._id === task._id ? res.data : t)));
  };

  // Delete task
  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter task"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <ul className="mt-4">
        {tasks.map(task => (
          <li
            key={task._id}
            className="flex justify-between items-center border p-2 rounded mt-2"
          >
            <span
              onClick={() => toggleTask(task)}
              className={`cursor-pointer ${
                task.status === "completed" ? "line-through text-gray-500" : ""
              }`}
            >
              {task.title}
            </span>
            <button
              onClick={() => deleteTask(task._id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default App
