import React from "react";

//OPTIMIZE: Функциональный компонент принимает два аргумента!
export default function Filter({ value, onChangeFilter }) {
  return (
    <div className="filter-box">
      Поиск контакта по имени:
      <input
        className="filter-input"
        type="text"
        value={value}
        onChange={(e) => onChangeFilter(e.target.value)}
      />
    </div>
  );
}
