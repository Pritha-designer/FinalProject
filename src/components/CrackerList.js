import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function CrackerList({ crackers, onEdit, onDelete }) {
  const navigate = useNavigate();
  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Cracker Stock List</h5>
        </div>
        <div className="card-body p-0">
          {crackers.length === 0 ? (
            <p className="p-3 text-muted text-center">No crackers added yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Quantity</th>
                    <th>Price (₹)</th>
                    <th>Total Value (₹)</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {crackers.map((cracker, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{cracker.name}</td>
                      <td>{cracker.type}</td>
                      <td>{cracker.quantity}</td>
                      <td>{cracker.price}</td>
                      <td>{cracker.quantity * cracker.price}</td>
                      <td>
                        <div className="btn-group">
                          <button className="btn btn-sm btn-outline-primary" onClick={() => {onEdit(cracker); 
                          navigate('/add-cracker');}}>
                          Edit</button> 
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => onDelete(cracker)}
                          >Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
