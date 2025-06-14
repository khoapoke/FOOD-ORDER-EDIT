import { useContext } from "react";
import { useFetch } from "../hooks/useFetch";
import { fetchAvailableMeals } from "../util/http";
import { CartContext } from "../store/CartContext";
import { Link } from "react-router-dom";
import "./menu.css";

function Menu() {
  const { data: meals, isLoading, error } = useFetch(fetchAvailableMeals, []);
  const cartCtx = useContext(CartContext);
  const total = cartCtx.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleAddMealToCart = (meal) => {
    cartCtx.addItem({
      id: meal.id,
      name: meal.name,
      price: meal.price,
      amount: 1
    });
  };

  return (
    <>
      <section className="container-fluid">
        <h1
          className="text-uppercase text-center"
          style={{ margin: "2rem 0", color: "#d9e2f1" }}
        >
          Menu
        </h1>
        {isLoading && (
          <p className="text-uppercase text-center" style={{ color: "green" }}>
            Loading meals...
          </p>
        )}
        {error && (
          <p className="text-uppercase text-center" style={{ color: "red" }}>
            {error}
          </p>
        )}
        <div
          id="meals"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10rem",
          }}
        >
          {!isLoading &&
            !error &&
            Array.isArray(meals) &&
            meals.map((meal) => (
              <div
                key={meal.id}
                className="meal-item"
                style={{ width: "40rem" }}
              >
                <article>
                  <Link to={`/menu/${meal.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <img
                      alt={meal.name}
                      src={`http://localhost:3000/${meal.image}`}
                      style={{ cursor: "pointer" }}
                    />
                    <div>
                      <h3>{meal.name}</h3>
                      <p className="meal-item-price">${meal.price}</p>
                      <p className="meal-item-description">{meal.description}</p>
                    </div>
                  </Link>
                  <p className="meal-item-actions">
                    <button className="button" onClick={() => handleAddMealToCart(meal)}>
                      Add to Cart
                    </button>
                  </p>
                </article>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

export default Menu;
