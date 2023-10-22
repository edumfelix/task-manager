import React, { useEffect, useState } from "react";
import api from "../services/Api";
import { Task } from "../Task";
import "bootstrap/dist/css/bootstrap.min.css";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isCompleted: false,
  });

  useEffect(() => {
    api.get("/").then((response) => {
      setTasks(response.data);
    });
  }, []);

  const deleteTask = (taskId: number) => {
    api.delete(`/${taskId}`).then((response) => {
      if (response.status === 200) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      }
    });
  };

  const handleFormSubmit = () => {
    api.post("/", formData).then((response) => {
      if (response.status === 201) {
        setTasks((prevTasks) => [...prevTasks, response.data]);
      }
    });
    closeModal();
  };

  const editTask = (taskId: number) => {
    api.put(`/${taskId}`).then((response) => {
      if (response.status === 200) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      }
    });
    closeModal();
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div>
        <button type="button" className="btn btn-primary" onClick={openModal}>
          Add Task
        </button>
      </div>

      {showModal && ( // Add Task
        <div
          className="modal"
          tabIndex={-1}
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Task</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    className="form-control"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleFormSubmit}
                >
                  Create Task
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Is Completed?</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.isCompleted ? "Yes" : "No"}</td>
                <td>
                  <button type="button" className="btn btn-sm btn-outline-info">
                    Edit
                  </button>
                  |
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
