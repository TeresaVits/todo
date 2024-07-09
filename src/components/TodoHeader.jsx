import React from "react";


const TodoHeader = () => {
  return (
    <div className="logo-container">
      <div className="logo">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 19V5h14v14H5zM7 15h2v-2H7v2zm0-4h2V9H7v2zm0-4h2V5H7v2zm8 8h2v-2h-2v2zm0-4h2V9h-2v2zm0-4h2V5h-2v2z"/></svg>
      </div>
      <h1>To-do list</h1>
  
    </div>
  );
};

export default TodoHeader;