import React, { useReducer, useEffect } from "react";
import { TaskContext } from "./TaskContext";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload, loading: false, error: null };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                status: action.payload.status,
                completedAt: action.payload.completedAt,
                originalCompletedAt: action.payload.originalCompletedAt,
              }
            : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "LOADING":
      return { ...state, loading: true, error: null };
    default:
      return state;
  }
};

const getNextStatus = (currentStatus) => {
  switch (currentStatus) {
    case "incomplete":
      return "pending";
    case "pending":
      return "complete";
    case "complete":
      return "incomplete";
    default:
      return "incomplete";
  }
};

const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    dispatch({ type: "SET_TASKS", payload: [] }); // Inicializa a lista de tarefas vazia
  }, []);

  const toggleTaskCompletion = (id) => {
    const task = state.tasks.find((task) => task.id === id);
    const newStatus = getNextStatus(task.status);
    let updatedTask = {
      ...task,
      status: newStatus,
    };

    if (newStatus === "complete") {
      updatedTask = {
        ...updatedTask,
        completedAt: new Date().toISOString(),
        originalCompletedAt:
          task.completedAt || new Date().toISOString(), // Salvar a data original de conclusão
      };
    } else {
      updatedTask = {
        ...updatedTask,
        completedAt: task.originalCompletedAt || task.completedAt, // Restaurar a data original de conclusão
      };
    }

    dispatch({ type: "TOGGLE_TASK", payload: updatedTask });
  };

  return (
    <TaskContext.Provider value={{ state, dispatch, toggleTaskCompletion }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
