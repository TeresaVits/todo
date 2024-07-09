import React from "react";

const FilterButtons = ({ filter, setFilter }) => {
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="filter-buttons">
      <button
        className={filter === "all" ? "active" : ""}
        onClick={() => handleFilterChange("all")}
      >
        Tudo
      </button>
      <button
        className={filter === "completed" ? "active" : ""}
        onClick={() => handleFilterChange("completed")}
      >
        Completo
      </button>
      <button
        className={filter === "incomplete" ? "active" : ""}
        onClick={() => handleFilterChange("incomplete")}
      >
        Incompleto
      </button>
      <button
        className={filter === "pending" ? "active" : ""}
        onClick={() => handleFilterChange("pending")}
      >
        Pendente
      </button>
    </div>
  );
};

export default FilterButtons;