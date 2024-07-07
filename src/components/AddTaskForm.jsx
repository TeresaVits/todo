import React from "react";

const AddTaskForm = ({ newTask, setNewTask, category, setCategory, completionDate, setCompletionDate, addTask }) => {
  return (
    <div className="add-task-container">
      <input
        type="text"
        placeholder="Novas tarefas"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="task-category-select"
      >
        <option value="" disabled hidden>Selecione a categoria</option>
        <option value="Estudo" className="estudo">Estudo</option>
        <option value="Trabalho" className="trabalho">Trabalho</option>
        <option value="Casa" className="casa">Casa</option>
      </select>
      <input
        type="date"
        value={completionDate}
        onChange={(e) => setCompletionDate(e.target.value)}
      />
      <button className="add-task-button" onClick={addTask}>
        Adicionar
      </button>
    </div>
  );
};

export default AddTaskForm;
