import React from 'react';

const FilterBar = ({ filter, setFilter }) => (
  <div className="card filter-bar">
    <h2>Filter Tasks</h2>
    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
      <option value="All">All</option>
      <option value="Open">Open</option>
      <option value="Completed">Completed</option>
    </select>
  </div>
);

export default FilterBar;