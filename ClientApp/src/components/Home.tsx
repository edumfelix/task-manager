import React, { useEffect, useState } from "react";
import api from "../services/Api";
import { Task } from "../Task";
import "bootstrap/dist/css/bootstrap.min.css"; // Importe o Bootstrap CSS

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]); 

  useEffect(() => {
    // Faça uma solicitação GET para obter os dados da API
    api.get("/").then((response) => {
      setTasks(response.data); // Define os dados das tarefas no estado
    });
  }, []);

  return (
    <div>
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
                  </button>{" "}
                  |
                  <button type="button" className="btn btn-sm btn-outline-danger">
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
