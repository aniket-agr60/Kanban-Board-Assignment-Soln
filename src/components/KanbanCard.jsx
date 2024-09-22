import React from 'react';
import './KanbanCard.css';

export default function KanbanCard({ ticket, user }) {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4: return '/SVG - Urgent Priority colour.svg';
      case 3: return '/Img - High Priority.svg';
      case 2: return '/Img - Medium Priority.svg';
      case 1: return '/Img - Low Priority.svg';
      default: return '/No-priority.svg';
    }
  };

  return (
    <div className="kanban-card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        {user && <UserAvatar user={user} />}
      </div>
      <h3 className="ticket-title">{ticket.title}</h3>
      <div className="ticket-tags">
        <img src={getPriorityIcon(ticket.priority)} alt={getPriorityLabel(ticket.priority)} className="priority-icon" />
        {ticket.tag.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}

function UserAvatar({ user }) {
  const colors = ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'];
  const colorIndex = user.id.charCodeAt(0) % colors.length;
  const backgroundColor = colors[colorIndex];

  return (
    <div className="user-avatar" style={{ backgroundColor: 'blue' }} title={user.name}>
      <svg viewBox="0 0 24 24" fill="currentColor" className="person-icon">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    </div>
  );
  
}

function getPriorityLabel(priority) {
  switch (priority) {
    case 4: return 'Urgent';
    case 3: return 'High';
    case 2: return 'Medium';
    case 1: return 'Low';
    default: return 'No priority';
  }
}