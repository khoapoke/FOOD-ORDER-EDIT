import { useContext } from "react";
import { useFetch } from "../hooks/useFetch";
import { fetchAvailableMeals } from "../util/http";
import CartContext from "../store/CartContext";

function Menu() {
  const { data: meals, isLoading, error } = useFetch(fetchAvailableMeals, []);
  const { items, addItem, removeItem, clearItem } = useContext(CartContext);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

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
                  <img
                    alt={meal.name}
                    src={`http://localhost:3000/${meal.image}`}
                  />
                  <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">${meal.price}</p>
                    <p className="meal-item-description">{meal.description}</p>
                  </div>
                  <p className="meal-item-actions">
                    <button className="button" onClick={() => addItem(meal)}>
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
