import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      status: "In Progress",
      message: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.title || !this.state.description) {
      this.setState({ message: "Please enter both a title and description." });
      return;
    }
    axios
      .post("https://task-manager-be-vgy3.onrender.com/tasks", this.state)
      .then((response) => {
        this.setState({
          title: "",
          description: "",
          status: "In Progress",
          message: "Task created successfully!",
        });
      })
      .catch((error) => {
        this.setState({
          message: "An error occurred while creating the task.",
        });
        console.error(error);
      });
  }

  render() {
    return (
      <div className="d-flex justify-content-center align-items-start" style={{ paddingTop: "40px" }}>
        <form className="m-4 border p-4 rounded bg-light" onSubmit={this.handleSubmit}>
          {this.state.message && <div className="alert alert-info">{this.state.message}</div>}
          <div className="form-group">
            <label><strong>Title:</strong>
              <input
                className="form-control"
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                placeholder="Enter task title"
              />
            </label>
          </div>
          <div className="form-group">
            <label><strong>Description:</strong>
              <input
                className="form-control"
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                placeholder="Enter task description"
              />
            </label>
          </div>
          <div className="form-group">
            <label><strong>Status:</strong>
              <select
                className="form-control"
                name="status"
                value={this.state.status}
                onChange={this.handleChange}
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </label>
          </div>
          <div className="d-flex flex-column">
            <br></br>
            <input className="btn btn-primary mb-3" type="submit" value="Submit" />
            <Link to="/" className="btn btn-secondary">Back to Task List</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default TaskForm;
