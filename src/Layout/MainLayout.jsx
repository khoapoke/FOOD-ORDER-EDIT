import Header from "../Components/header/Header";
import Footer from "../Components/footer/Footer";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;
