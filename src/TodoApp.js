import React, { useContext, useState } from "react";
import { TaskContext } from "./context/TaskContext";
import "./style/TodoApp.css";
import TodoHeader from "./components/TodoHeader";
import FilterButtons from "./components/FilterButtons";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";


const TodoApp = () => {
  const { state, dispatch } = useContext(TaskContext);
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("");
  const [completionDate, setCompletionDate] = useState(""); // Adicionar estado para a data de conclusão
  const [filter, setFilter] = useState("all");

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'incomplete':
        return 'pending';
      case 'pending':
        return 'complete';
      case 'complete':
        return 'incomplete';
      default:
        return 'incomplete';
    }
  };

  const filteredTasks = (() => {
    let tasksToDisplay = state.tasks;

    switch (filter) {
      case "completed":
        tasksToDisplay = tasksToDisplay.filter((task) => task.status === 'complete');
        break;
      case "incomplete":
        tasksToDisplay = tasksToDisplay.filter((task) => task.status === 'incomplete');
        break;
      case "pending":
        tasksToDisplay = tasksToDisplay.filter((task) => task.status === 'pending');
        break;
      default:
        break;
    }

    return tasksToDisplay.sort((a, b) => b.id - a.id);
  })();

  const addTask = () => {
    if (newTask.trim() !== "" && category !== "" && completionDate !== "") {
      const newTaskObject = {
        id: Date.now(),
        title: newTask,
        status: 'pending', // Define a tarefa como pendente por padrão
        category: category,
        completedAt: new Date(completionDate).toISOString(),
      };
      dispatch({ type: "ADD_TASK", payload: newTaskObject });
      setNewTask("");
      setCategory("");
      setCompletionDate(""); // Resetar a data de conclusão após adicionar a tarefa
    } 
  };

  const toggleTaskCompletion = (taskId) => {
    const taskToUpdate = state.tasks.find((task) => task.id === taskId);
    const newStatus = getNextStatus(taskToUpdate.status);
    let updatedCompletionDate = taskToUpdate.completedAt;
    let originalCompletedAt = taskToUpdate.originalCompletedAt || taskToUpdate.completedAt;

    if (newStatus === 'complete') {
      updatedCompletionDate = new Date().toISOString(); // Data de conclusão atualizada para o dia de hoje ao marcar como completa
      originalCompletedAt = taskToUpdate.completedAt || new Date().toISOString(); // Salva a data original de conclusão
    } else {
      updatedCompletionDate = taskToUpdate.originalCompletedAt || taskToUpdate.completedAt; // Mantém a data original se for pendente ou incompleta
    }

    const updatedTask = {
      ...taskToUpdate,
      status: newStatus,
      completedAt: updatedCompletionDate,
      originalCompletedAt: originalCompletedAt
    };

    dispatch({ type: "UPDATE_TASK", payload: updatedTask });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: "DELETE_TASK", payload: taskId });
  };

  return (
    <div className="todo-app-container">
      <div className="header">
        <div className="subhead">
          <TodoHeader />
          <FilterButtons filter={filter} setFilter={setFilter} />
        </div>
      </div>
      <div className="main">
        <div className="add-task">
          <AddTaskForm
            newTask={newTask}
            setNewTask={setNewTask}
            category={category}
            setCategory={setCategory}
            completionDate={completionDate} // Passar a data de conclusão como prop
            setCompletionDate={setCompletionDate} // Passar o setter da data de conclusão como prop
            addTask={addTask}
          />
        </div>
        <div className="tasks-list">
          <TaskList
            tasks={filteredTasks}
            toggleTaskCompletion={toggleTaskCompletion}
            deleteTask={deleteTask}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
