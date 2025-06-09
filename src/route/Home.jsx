import AvailableMeals from "../components/AvailableMeals";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";
import Header from "../components/Header";
import { CartContextProvider } from "../store/CartContext";
import { UserProgressContextProvider } from "../store/UserProgressContext";

export default function Home() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <AvailableMeals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}
