import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 style={{color: "var(--text-color-admin)"}}>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fa-solid fa-users"></i>
          </div>
          <div className="stat-info">
            <h3>Total Users</h3>
            <p>1,234</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fa-solid fa-box"></i>
          </div>
          <div className="stat-info">
            <h3>Total Products</h3>
            <p>567</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
          <div className="stat-info">
            <h3>Total Orders</h3>
            <p>890</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fa-solid fa-dollar-sign"></i>
          </div>
          <div className="stat-info">
            <h3>Total Revenue</h3>
            <p>$45,678</p>
          </div>
        </div>
      </div>
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <i className="fa-solid fa-circle"></i>
            <p>New order #1234 received</p>
            <span>2 minutes ago</span>
          </div>
          <div className="activity-item">
            <i className="fa-solid fa-circle"></i>
            <p>New user registered</p>
            <span>15 minutes ago</span>
          </div>
          <div className="activity-item">
            <i className="fa-solid fa-circle"></i>
            <p>Product "Pizza" updated</p>
            <span>1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 