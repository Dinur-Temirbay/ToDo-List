import { useState } from "react";
import styles from "./App.module.css";

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [hasError, setHasError] = useState(false);

  function handleInputChange(event) {
    setTask(event.target.value);
    setHasError(event.target.value.trim().length === 0);
  }

  function handleAddTask() {
    if (task.trim()) {
      setTaskList([...taskList, { text: task, completed: false }]);
      setTask("");
    }
  }

  function handleCompleteTask(indexToComplete) {
    const updatedTasks = [...taskList];
    updatedTasks[indexToComplete].completed =
      !updatedTasks[indexToComplete].completed;
    setTaskList(updatedTasks);
  }

  function handleEditTask(index) {
    setEditingIndex(index); // Start editing the clicked task
    setEditedTask(taskList[index].text); // Set the current task text for editing
  }

  function handleSaveTask(index) {
    const updatedTasks = [...taskList];
    updatedTasks[index].text = editedTask; // Save the edited text
    setTaskList(updatedTasks);
    setEditingIndex(null); // Exit editing mode
  }

  function handleDeleteTask(indexToDelete) {
    const updatedTasks = taskList.filter((_, index) => index !== indexToDelete);
    setTaskList(updatedTasks);
  }

  return (
    <section className={styles.toDoSection}>
      <div className={styles.inputSection}>
        <h1 className={styles.mainName}>ToDo-List !</h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Add your task"
            value={task}
            onChange={handleInputChange}
            className={styles.pole}
            style={hasError ? { border: "1px solid red" } : undefined}
          />
          <button
            className={styles.addBtn}
            onClick={handleAddTask}
            disabled={hasError}
          >
            Add Task
          </button>
        </div>
        <ul>
          {taskList.map((task, index) => (
            <li key={index} className={styles.taskItem}>
              {editingIndex === index ? (
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                  className={styles.pole}
                />
              ) : (
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </span>
              )}
              <div className="flex">
                {editingIndex !== index && (
                  <>
                    <button
                      onClick={() => handleCompleteTask(index)}
                      className={styles.completeBtn}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteTask(index)}
                      className={styles.deleteBtn}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </button>
                  </>
                )}
                <button
                  onClick={() =>
                    editingIndex === index
                      ? handleSaveTask(index)
                      : handleEditTask(index)
                  }
                  className={styles.editBtn}
                >
                  {editingIndex === index ? (
                    <span className="font-medium ml-3">Save</span>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default App;
