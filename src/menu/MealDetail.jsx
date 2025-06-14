import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useFetch } from "../hooks/useFetch";
import { fetchAvailableMeals } from "../util/http";
import { CartContext } from "../store/CartContext";
import "./menu.css";

function MealDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: meals, isLoading, error } = useFetch(fetchAvailableMeals, []);
  const cartCtx = useContext(CartContext);

  if (isLoading) {
    return (
      <p className="text-uppercase text-center" style={{ color: "green" }}>
        Loading meal details...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-uppercase text-center" style={{ color: "red" }}>
        {error}
      </p>
    );
  }

  const meal = meals?.find((m) => m.id === id);

  if (!meal) {
    return (
      <p className="text-uppercase text-center" style={{ color: "red" }}>
        Meal not found
      </p>
    );
  }

  const handleAddMealToCart = () => {
    cartCtx.addItem({
      id: meal.id,
      name: meal.name,
      price: meal.price,
      amount: 1
    });
  };

  return (
    <section className="container-fluid">
      <div className="meal-detail-container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <button 
          className="back-button" 
          onClick={() => navigate("/menu")}
          style={{ 
            marginBottom: "2rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#4a4a4a",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          ← Back to Menu
        </button>
        
        <div className="meal-detail-content" style={{ 
          display: "flex", 
          gap: "2rem",
          backgroundColor: "#2a2a2a",
          padding: "2rem",
          borderRadius: "8px"
        }}>
          <div className="meal-image" style={{ flex: "1" }}>
            <img 
              src={`http://localhost:3000/${meal.image}`} 
              alt={meal.name}
              style={{ 
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                objectFit: "cover"
              }}
            />
          </div>
          
          <div className="meal-info" style={{ flex: "1" }}>
            <h1 style={{ 
              color: "#d9e2f1",
              marginBottom: "1rem",
              fontSize: "2.5rem"
            }}>
              {meal.name}
            </h1>
            
            <p className="meal-price" style={{ 
              color: "#ffc107",
              fontSize: "1.5rem",
              marginBottom: "1rem"
            }}>
              ${meal.price}
            </p>
            
            <p className="meal-description" style={{ 
              color: "#ffffff",
              marginBottom: "2rem",
              lineHeight: "1.6"
            }}>
              {meal.description}
            </p>
            
            <button 
              className="add-to-cart-button"
              onClick={handleAddMealToCart}
              style={{
                padding: "1rem 2rem",
                backgroundColor: "#ffc107",
                color: "#000000",
                border: "none",
                borderRadius: "4px",
                fontSize: "1.1rem",
                cursor: "pointer",
                transition: "background-color 0.3s"
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MealDetail; 