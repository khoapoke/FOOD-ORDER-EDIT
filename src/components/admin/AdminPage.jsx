import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./admin.css";

function AdminPage() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingMeal, setEditingMeal] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await fetch("http://localhost:3000/meals");
      if (!response.ok) throw new Error("Failed to fetch meals");
      const data = await response.json();
      setMeals(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const url = editingMeal
        ? `http://localhost:3000/meals/${editingMeal.id}`
        : "http://localhost:3000/meals";

      const method = editingMeal ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Failed to save meal");

      await fetchMeals();
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (meal) => {
    setEditingMeal(meal);
    setFormData({
      name: meal.name,
      price: meal.price,
      description: meal.description,
      image: null,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this meal?")) return;

    try {
      const response = await fetch(`http://localhost:3000/meals/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete meal");

      await fetchMeals();
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      image: null,
    });
    setEditingMeal(null);
  };

  if (isLoading) return <div className="admin-loading">Loading...</div>;
  if (error) return <div className="admin-error">Error: {error}</div>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button className="button" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>

      <div className="admin-content">
        <div className="admin-form">
          <h2>{editingMeal ? "Edit Meal" : "Add New Meal"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleInputChange}
                accept="image/*"
                required={!editingMeal}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="button">
                {editingMeal ? "Update Meal" : "Add Meal"}
              </button>
              {editingMeal && (
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={resetForm}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="admin-meals">
          <h2>Current Meals</h2>
          <div className="meals-grid">
            {meals.map((meal) => (
              <div key={meal.id} className="meal-card">
                <img
                  src={`http://localhost:3000/${meal.image}`}
                  alt={meal.name}
                />
                <div className="meal-info">
                  <h3>{meal.name}</h3>
                  <p className="price">${meal.price}</p>
                  <p className="description">{meal.description}</p>
                </div>
                <div className="meal-actions">
                  <button className="button" onClick={() => handleEdit(meal)}>
                    Edit
                  </button>
                  <button
                    className="button button-danger"
                    onClick={() => handleDelete(meal.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
