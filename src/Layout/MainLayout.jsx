import Header from "../Components/header/Header";
import Footer from "../Components/footer/Footer";
import Checkout from "../Components/Cart/Checkout";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <Checkout />
    </>
  );
}

export default MainLayout;
