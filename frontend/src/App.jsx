import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')

  // Fetch all tasks when page loads
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/api/tasks')
    const data = await res.json()
    setTasks(data)
  }

  // Add a new task
  const addTask = async () => {
    if (!title) return
    await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
    setTitle('')
    fetchTasks()
  }

  // Toggle complete/incomplete
  const toggleTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'PUT'
    })
    fetchTasks()
  }

  // Delete a task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE'
    })
    fetchTasks()
  }

  return (
    <div className="container">
      <h1>Task Manager</h1>

      {/* Add Task */}
      <div className="input-row">
        <input
          type="text"
          placeholder="Enter a task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleTask(task._id)}>
              {task.completed ? '✅' : '⬜'} {task.title}
            </span>
            <button onClick={() => deleteTask(task._id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App