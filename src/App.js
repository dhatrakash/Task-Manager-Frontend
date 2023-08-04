import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/">Task Manager</a>
        </nav>

        <div style={{ marginTop: '20px' }}>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/new" element={<TaskForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
