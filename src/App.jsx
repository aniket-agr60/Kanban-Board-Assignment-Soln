import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import DisplayOptions from './components/DisplayOptions';
import './App.css';

export default function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status');
  const [ordering, setOrdering] = useState(localStorage.getItem('ordering') || 'priority');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('grouping', grouping);
    localStorage.setItem('ordering', ordering);
  }, [grouping, ordering]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleGroupingChange = (newGrouping) => {
    setGrouping(newGrouping);
  };

  const handleOrderingChange = (newOrdering) => {
    setOrdering(newOrdering);
  };

  return (
    <div className="app">
      <DisplayOptions
        grouping={grouping}
        ordering={ordering}
        onGroupingChange={handleGroupingChange}
        onOrderingChange={handleOrderingChange}
      />
      <KanbanBoard
        tickets={tickets}
        users={users}
        grouping={grouping}
        ordering={ordering}
      />
    </div>
  );
}