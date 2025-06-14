import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Statistics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const orderData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Orders',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Revenue Overview',
      },
    },
  };

  return (
    <div className="statistics-container">
      <h1>Statistics & Reports</h1>
      
      <div className="charts-grid">
        <div className="chart-card">
          <h2>Revenue Overview</h2>
          <Line data={revenueData} options={options} />
        </div>
        
        <div className="chart-card">
          <h2>Daily Orders</h2>
          <Bar
            data={orderData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Orders by Day',
                },
              },
            }}
          />
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Revenue</h3>
          <p className="amount">$123,000</p>
          <span className="trend positive">+15% from last month</span>
        </div>
        <div className="summary-card">
          <h3>Total Orders</h3>
          <p className="amount">1,234</p>
          <span className="trend positive">+8% from last month</span>
        </div>
        <div className="summary-card">
          <h3>Average Order Value</h3>
          <p className="amount">$99.75</p>
          <span className="trend negative">-2% from last month</span>
        </div>
      </div>
    </div>
  );
};

export default Statistics; 