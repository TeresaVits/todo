import React, { useContext, useState, useEffect, useCallback } from "react";
import { TaskContext } from "./context/TaskContext";
import { db } from './firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore'; // Importe as funções necessárias do Firestore
import "./style/TodoApp.css";
import TodoHeader from "./components/TodoHeader";
import FilterButtons from "./components/FilterButtons";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import TaskStatusLegend from "./components/TaskStatusLegend";

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

  // Função para buscar as tarefas do Firestore e ordenar por data de conclusão ascendente
  const fetchTasks = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'tasks'));
      let tasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Ordenar por data de conclusão (completedAt) de forma ascendente
      tasks.sort((a, b) => (a.completedAt || '').localeCompare(b.completedAt || ''));
      dispatch({ type: 'SET_TASKS', payload: tasks });
    } catch (error) {
      console.error("Erro ao buscar tarefas: ", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchTasks(); // Buscar as tarefas quando o componente for montado
  }, [fetchTasks]);

  const addTask = async () => {
    if (newTask.trim() !== "" && category !== "" && completionDate !== "") {
      const newTaskObject = {
        title: newTask,
        status: 'pending', // Define a tarefa como pendente por padrão
        category: category,
        completedAt: new Date(completionDate).toISOString(),
      };

      try {
        const docRef = await addDoc(collection(db, 'tasks'), newTaskObject);
        newTaskObject.id = docRef.id; // Adiciona o ID do documento ao objeto tarefa

        // Adiciona a nova tarefa ao início do array de tarefas local
        const updatedTasks = [newTaskObject, ...state.tasks];
        dispatch({ type: "SET_TASKS", payload: updatedTasks });

        setNewTask("");
        setCategory("");
        setCompletionDate(""); // Resetar a data de conclusão após adicionar a tarefa
      } catch (e) {
        console.error("Erro ao adicionar tarefa: ", e);
      }
    }
  };

  const toggleTaskCompletion = async (taskId) => {
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

    try {
      await updateDoc(doc(db, 'tasks', taskId), updatedTask);
      dispatch({ type: "UPDATE_TASK", payload: updatedTask });
    } catch (e) {
      console.error("Erro ao atualizar tarefa: ", e);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
      const updatedTasks = state.tasks.filter(task => task.id !== taskId);
      dispatch({ type: "SET_TASKS", payload: updatedTasks });
    } catch (e) {
      console.error("Erro ao deletar tarefa: ", e);
    }
  };

  // Filtrar tarefas conforme o estado selecionado
  const filteredTasks = state.tasks.filter((task) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'completed') {
      return task.status === 'complete';
    } else {
      return task.status === filter;
    }
  });

  return (
    <div className="todo-app-container">
      <div className="header">
        <TodoHeader />
        <div className="subhead">
          <FilterButtons filter={filter} setFilter={setFilter} />
        </div>
        <div className="subhead">
          <TaskStatusLegend />
        </div>
      </div>
      <div className="main">
        <div className="add-task">
          <AddTaskForm
            newTask={newTask}
            setNewTask={setNewTask}
            category={category}
            setCategory={setCategory}
            completionDate={completionDate}
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
