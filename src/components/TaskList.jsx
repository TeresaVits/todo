import React from "react";

const TaskList = ({ tasks, toggleTaskCompletion, deleteTask }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return date.toLocaleDateString("pt-BR", options);
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <div className="task">
            <input
              type="checkbox"
              className={`custom-checkbox ${task.status}`}
              checked={task.status === "complete"}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <span className={`category-task ${task.status}`}>
              <span className="task-title">{task.title}</span>
              <span className="hyphen"> -</span>
              <span className={`task-category ${task.category.toLowerCase()}`}>
                {task.category}
              </span>
            </span>
            {task.completedAt && (
              <div className="completion-date">
                Conclusão: {formatDate(task.completedAt)}
              </div>
            )}
          </div>
          <div className="task-buttons">
            <button className="delete-button" onClick={() => deleteTask(task.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4H2.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v1zM5.118 4 5 4h6l-.118-.118H5.118zM5 4v9a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V4H5z"
                />
              </svg>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
