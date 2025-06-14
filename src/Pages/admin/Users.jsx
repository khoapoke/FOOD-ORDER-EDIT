import React, { useState } from 'react';
import './Users.css';

const Users = () => {
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Customer', status: 'Inactive' },
  ]);

  return (
    <div className="users-container">
      <div className="users-header">
        <h1>Users Management</h1>
        <button className="add-user-btn">
          <i className="fa-solid fa-plus"></i> Add New User
        </button>
      </div>

      <div className="users-filters">
        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search users..." />
        </div>
        <div className="filter-options">
          <select>
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
          <select>
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-btn">
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button className="delete-btn">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button className="pagination-btn">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <span className="page-number">Page 1 of 1</span>
        <button className="pagination-btn">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Users; 