import React, { useState } from 'react';
import './Orders.css';

const Orders = () => {
  const [orders] = useState([
    {
      id: 'ORD001',
      customer: 'John Doe',
      date: '2024-03-15',
      total: 45.99,
      status: 'Pending',
      items: 3
    },
    {
      id: 'ORD002',
      customer: 'Jane Smith',
      date: '2024-03-15',
      total: 32.50,
      status: 'Processing',
      items: 2
    },
    {
      id: 'ORD003',
      customer: 'Bob Johnson',
      date: '2024-03-14',
      total: 67.25,
      status: 'Delivered',
      items: 4
    },
  ]);

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>Orders Management</h1>
        <div className="order-stats">
          <div className="stat-item">
            <span className="stat-label">Total Orders</span>
            <span className="stat-value">1,234</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Pending</span>
            <span className="stat-value">45</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Processing</span>
            <span className="stat-value">23</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Delivered</span>
            <span className="stat-value">1,166</span>
          </div>
        </div>
      </div>

      <div className="orders-filters">
        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search orders..." />
        </div>
        <div className="filter-options">
          <select>
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input type="date" />
        </div>
      </div>

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>{order.items}</td>
                <td>${order.total}</td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="view-btn">
                      <i className="fa-solid fa-eye"></i>
                    </button>
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

export default Orders; 