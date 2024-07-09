import React from "react";

const TaskStatusLegend = () => {
  return (
    <div className="task-status-legend">
      <div className="legend-item">
        <span className="legend-icon complete">✓</span>
        <span className="legend-text">Completo</span>
      </div>
      <div className="legend-item">
        <span className="legend-icon incomplete">!</span>
        <span className="legend-text">Incompleto</span>
      </div>
    </div>
  );
};

export default TaskStatusLegend;