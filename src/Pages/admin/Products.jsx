import React, { useEffect, useState } from 'react';
import './Products.css';

const API_URL = 'http://localhost:3000/meals';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch meals');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMeals();
  }, []);

  return (
    <div className="products-container">
      <div className="products-header">
        <h1 style={{color: "var(--text-color-admin)"}}>Products Management</h1>
        <button className="add-product-btn">
          <i className="fa-solid fa-plus"></i> Add New Product
        </button>
      </div>

      <div className="products-filters">
        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search products..." />
        </div>
        <div className="filter-options">
          <select>
            <option value="">All Categories</option>
            {/* Có thể thêm các category động nếu muốn */}
          </select>
          <select>
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {isLoading && <div>Loading...</div>}
      {error && <div style={{color: 'red'}}>Error: {error}</div>}

      <div className="products-grid">
        {/* Ảnh đầu tiên là steak-frites.jpg */}
        <div className="product-card">
          <div className="product-image">
            <img src="/img/steak-frites.jpg" alt="Steak Frites" />
            <div className="product-status">
              <span className="status-badge available">Available</span>
            </div>
          </div>
          <div className="product-info">
            <h3>Steak Frites</h3>
            <p className="category">Steak</p>
            <p className="price">$24.99</p>
            <p className="stock">Stock: 20</p>
          </div>
          <div className="product-actions">
            <button className="edit-btn">
              <i className="fa-solid fa-pen"></i> Edit
            </button>
            <button className="delete-btn">
              <i className="fa-solid fa-trash"></i> Delete
            </button>
          </div>
        </div>
        {/* Render các meal từ API */}
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img
                src={product.image ? `http://localhost:3000/${product.image}` : '/img/steak-frites.jpg'}
                alt={product.name}
              />
              <div className="product-status">
                <span className="status-badge available">Available</span>
              </div>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="category">{product.category || 'Other'}</p>
              <p className="price">${product.price}</p>
              <p className="stock">Stock: {product.stock || 10}</p>
            </div>
            <div className="product-actions">
              <button className="edit-btn">
                <i className="fa-solid fa-pen"></i> Edit
              </button>
              <button className="delete-btn">
                <i className="fa-solid fa-trash"></i> Delete
              </button>
            </div>
          </div>
        ))}
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

export default Products; 