import React, { useMemo } from 'react';
import KanbanColumn from './KanbanColumn';
import './KanbanBoard.css';

export default function KanbanBoard({ tickets, users, grouping, ordering }) {
  const groupedTickets = useMemo(() => {
    const groups = {};

    if (!tickets || !Array.isArray(tickets)) {
      return groups;
    }

    tickets.forEach(ticket => {
      let key;
      switch (grouping) {
        case 'status':
          key = ticket.status;
          break;
        case 'user':
          key = users.find(user => user.id === ticket.userId)?.name || 'Unassigned';
          break;
        case 'priority':
          key = getPriorityLabel(ticket.priority);
          break;
        default:
          key = 'Other';
      }

      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(ticket);
    });

    // Sort tickets within each group
    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => {
        if (ordering === 'priority') {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });

    return groups;
  }, [tickets, users, grouping, ordering]);

  if (!tickets || tickets.length === 0) {
    return <div className="kanban-board">No tickets available</div>;
  }

  return (
    <div className="kanban-board">
      {Object.entries(groupedTickets).map(([group, groupTickets]) => (
        <KanbanColumn key={group} title={group} tickets={groupTickets} users={users} grouping={grouping} />
      ))}
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