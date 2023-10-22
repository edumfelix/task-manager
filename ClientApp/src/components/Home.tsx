import React, { useEffect, useState } from "react";
import api from "../services/Api";
import { Task } from "../Task";
import "bootstrap/dist/css/bootstrap.min.css";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
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
  
  const handleEditSubmit = () => {
    if (editingTask) {
      api.put(`/${editingTask.id}`, {
        title: formData.title,
        description: formData.description,
        isCompleted: formData.isCompleted,
      }).then((response) => {
        if (response.status === 200) {
          // Atualização bem-sucedida
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== editingTask.id));
          reloadTasks();
          closeEditModal();
        } else {
          console.error("Erro na requisição PUT:", response.status, response.data);
        }
      }).catch((error) => {
        console.error("Erro na requisição PUT:", error);
      });
    };
  }
  

  const handleFormSubmit = () => {
    api.post("/", formData).then((response) => {
      if (response.status === 201) {
        setTasks((prevTasks) => [...prevTasks, response.data]);
      }
    });
    reloadTasks();
    closeAddModal();
  };

  const reloadTasks = () => {
    api.get("/").then((response) => {
      setTasks(response.data);
    });
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };
  
  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setEditingTask(null);
    setShowEditModal(false);
  };

  return (
    <div>
      <div>
        <button type="button" className="btn btn-primary" onClick={openAddModal}>
          Add Task
        </button>
      </div>

      {showAddModal && ( // Add Task
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
                <button type="button" className="close" onClick={closeAddModal}>
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
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeAddModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditModal && editingTask && ( // Edit Task
        <div
          className="modal"
          tabIndex={-1}
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Task</h5>
                <button type="button" className="close" onClick={closeEditModal}>
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
                <div className="form-group">
                  <label className="form-check-label">Is completed?</label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={formData.isCompleted}
                    id="flexCheckDefault"
                    onChange={(e) =>
                      setFormData({ ...formData, isCompleted: e.target.checked })}
                    ></input>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleEditSubmit}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeEditModal}
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
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-info"
                    onClick={() => openEditModal(task)}
                  >
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