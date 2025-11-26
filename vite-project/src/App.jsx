import { useState } from "react";
import "./App.css";

let nextId = 0;

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  function handleNewTaskChange(e) {
    setNewTaskText(e.target.value);
  }

  function handleAddTask() {
    if (newTaskText.trim() === "") return;

    const newTask = {
      id: nextId++,
      text: newTaskText,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskText("");
  }

  function handleDeleteTask(idToDelete) {
    setTasks(tasks.filter((task) => task.id !== idToDelete));
  }

  function handleEdit(task) {
    setEditingId(task.id);
    setEditText(task.text);
  }

  function handleEditChange(e) {
    setEditText(e.target.value);
  }

  function handleSaveEdit() {
    if (editText.trim() === "") return;

    setTasks(
      tasks.map((task) =>
        task.id === editingId ? { ...task, text: editText } : task
      )
    );
    setEditingId(null);
    setEditText("");
  }

  return (
    <div className="todo-container">
      <h2>My To Do List</h2>

      <div className="input-area">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTaskText}
          onChange={handleNewTaskChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddTask();
          }}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="no-tasks">🎉 No tasks yet. Start adding!</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-item">
              {editingId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={handleEditChange}
                    className="edit-input"
                  />
                  <button onClick={handleSaveEdit} className="save-btn">
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div className="task-text">{task.text}</div>
                  <button
                    onClick={() => handleEdit(task)}
                    className="icon-btn edit-btn"
                    aria-label="Edit Task"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="icon-btn delete-btn"
                    aria-label="Delete Task"
                  >
                    🗑️
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
