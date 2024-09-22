import React, { useState } from 'react';
import './DisplayOptions.css';

export default function DisplayOptions({ grouping, ordering, onGroupingChange, onOrderingChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="display-options">
      <button onClick={toggleDropdown} className="display-button">
        <span className="icon">☰</span> Display <span className="arrow">▼</span>
      </button>
      {isOpen && (
        <div className="dropdown">
          <div className="option">
            <label>Grouping</label>
            <select value={grouping} onChange={(e) => onGroupingChange(e.target.value)}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="option">
            <label>Ordering</label>
            <select value={ordering} onChange={(e) => onOrderingChange(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}