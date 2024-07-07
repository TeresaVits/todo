import React from "react";
import TodoApp from "./TodoApp";
import TaskProvider from "./context/TaskProvider";

const App = () => {
  return (
    <TaskProvider>
      <TodoApp />
    </TaskProvider>
  );
};

export default App;
