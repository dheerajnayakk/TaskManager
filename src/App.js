import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      const task = {
        id: Date.now(),
        text: newTask,
        completed: false,
        createdAt: new Date()
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };
  
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    const taskElement = document.getElementById(`task-${id}`);
    taskElement.classList.add('delete-animation');
    
    setTimeout(() => {
      setTasks(tasks.filter(task => task.id !== id));
    }, 300);
  };
  
  return (
    <div className="todo-container">
      <div className="dashboard">
        <h1>Task Dashboard</h1>
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Tasks</h3>
            <p className="stat-number">{totalTasks}</p>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <p className="stat-number">{completedTasks}</p>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <p className="stat-number">{pendingTasks}</p>
          </div>
          <div className="stat-card">
            <h3>Completion</h3>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${completionRate}%` }}></div>
              <span className="progress-text">{completionRate}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="todo-app">
        <h2>Task Manager</h2>
        <form onSubmit={addTask} className="add-task-form">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="task-input"
          />
          <button type="submit" className="add-button">Add</button>
        </form>
        
        <div className="task-list">
          {tasks.length === 0 && (
            <div className="empty-list">No tasks yet. Add one above!</div>
          )}
          
          {tasks.map(task => (
            <div 
              key={task.id} 
              id={`task-${task.id}`}
              className={`task-item ${task.completed ? 'completed' : ''}`}
            >
              <div className="task-content">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <span className="task-text">{task.text}</span>
              </div>
              <button 
                className="delete-button" 
                onClick={() => deleteTask(task.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
