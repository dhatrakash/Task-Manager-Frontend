import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      })
  }, []);

  function updateStatus(task) {
    axios.put(`http://localhost:3000/tasks/${task._id}`, {
      status: task.status === 'In Progress' ? 'Completed' : 'In Progress'
    })
      .then(response => {
        setTasks(tasks.map(t => t._id === task._id ? response.data : t));
      })
      .catch(error => {
        console.error('Error updating task: ', error);
      });
  }

  function deleteTask(task) {
    axios.delete(`http://localhost:3000/tasks/${task._id}`)
      .then(() => {
        setTasks(tasks.filter(t => t._id !== task._id));
      })
      .catch(error => {
        console.error('Error deleting task: ', error);
      });
  }

  return (
    <div className="container">
      <h2 className="text-center mt-4">TASKS</h2>
      <Link to="/new" className="btn btn-primary mb-3">NEW TASK + </Link>
      <div className="row">
        <div className="col-md-6">
          <h4>In Progress</h4>
          {tasks.filter(task => task.status === 'In Progress').map((task, index) => (
            <div className="card mb-3" key={task._id}>
              <div className="card-body">
                <h5 className="card-title">{index + 1}. {task.title}</h5>
                <p className="card-text">{task.description}</p>
                <button className="btn btn-primary m-2" onClick={() => updateStatus(task)}>
                  Mark as Completed
                </button>
                <button className="btn btn-danger m-2" onClick={() => deleteTask(task)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-6">
          <h4>Completed</h4>
          {tasks.filter(task => task.status === 'Completed').map((task, index) => (
            <div className="card mb-3" key={task._id}>
              <div className="card-body">
                <h5 className="card-title">{index + 1}. {task.title}</h5>
                <p className="card-text">{task.description}</p>
                <button className="btn btn-primary m-2" onClick={() => updateStatus(task)}>
                  Mark as In Progress
                </button>
                <button className="btn btn-danger m-2" onClick={() => deleteTask(task)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskList;
