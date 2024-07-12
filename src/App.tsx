import React from 'react';
import './App.css';
import Calendar from './components/Calendar/Calendar';
import { RecoilRoot } from 'recoil';

const App = () => {
  return (
    <div className="App">
      <RecoilRoot>
        <Calendar />
      </RecoilRoot>
    </div>
  );
};

export default App;

