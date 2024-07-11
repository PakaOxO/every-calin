import React from 'react';
import './App.css';
import useCalendar from './hooks/useCalendar';

const App = () => {
  const { getThisMonth } = useCalendar();
  const today = new Date();
  const prev = new Date(today.getFullYear(), today.getMonth() - 1, 1);

  const dates = getThisMonth(prev, 6);
  console.log(dates.join('\n'));

  return <div className="App"></div>;
};

export default App;

