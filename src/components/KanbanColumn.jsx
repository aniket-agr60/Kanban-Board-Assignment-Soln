import React from 'react';
import KanbanCard from './KanbanCard';
import './KanbanColumn.css';

export default function KanbanColumn({ title, tickets, users, grouping }) {
  const getColumnIcon = () => {
    switch (grouping) {
      case 'status':
        switch (title.toLowerCase()) {
          case 'backlog': return '/Backlog.svg';
          case 'todo': return '/To-do.svg';
          case 'in progress': return '/in-progress.svg';
          case 'done': return '/Done.svg';
          case 'canceled': return '/Cancelled.svg';
          default: return '/Backlog.svg';
        }
      case 'priority':
        switch (title.toLowerCase()) {
          case 'urgent': return '/SVG - Urgent Priority colour.svg';
          case 'high': return '/Img - High Priority.svg';
          case 'medium': return '/Img - Medium Priority.svg';
          case 'low': return '/Img - Low Priority.svg';
          case 'no priority': return '/No-priority.svg';
          default: return '/No-priority.svg';
        }
      default:
        return '/Backlog.svg';
    }
  };

  return (
    <div className="kanban-column">
      <div className="column-header">
        <img src={getColumnIcon()} alt={title} className="column-icon" />
        <h2>{title}</h2>
        <span className="ticket-count">{tickets.length}</span>
        <button className="add-button">
          <img src="/add.svg" alt="Add" />
        </button>
        <button className="more-button">
          <img src="/3 dot menu.svg" alt="More options" />
        </button>
      </div>
      <div className="card-container">
        {tickets.map(ticket => (
          <KanbanCard key={ticket.id} ticket={ticket} user={users.find(user => user.id === ticket.userId)} />
        ))}
      </div>
    </div>
  );
}