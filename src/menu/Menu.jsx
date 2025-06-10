import { useContext } from "react";
import { useFetch } from "../hooks/useFetch";
import { fetchAvailableMeals } from "../util/http";
import CartContext from "../store/CartContext";
import Header from "../components/header/Header";
import "../components/content/content.css";

export default function Menu() {
  const { data: meals, isLoading, error } = useFetch(fetchAvailableMeals, []);
  const { items, addItem, removeItem, clearItem } = useContext(CartContext);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Header />
      <section className="container-fluid">
        <h1 className="text-uppercase text-center" style={{ margin: "0 0 2rem 0", color: "#d9e2f1" }}>
          Menu
        </h1>
        <div className="row">
          <div className="swiper" style={{ width: "100%" }}>
            <div className="slide-wrapper" style={{ maxWidth: "120rem", margin: "0 auto 4.5rem" }}>
              <div id="meals" className="swiper-wrapper" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
                {isLoading && <p>Loading meals...</p>}
                {error && <p>Error: {error}</p>}
                {!isLoading && !error && meals.map((meal) => (
                  <div key={meal.id} className="meal-item swiper-slide">
                    <article>
                      <img alt={meal.name} src={`http://localhost:3000/${meal.image}`} />
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}