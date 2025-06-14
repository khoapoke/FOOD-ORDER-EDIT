import { useContext } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../../store/CartContext";
import { currencyFormatter } from "../../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../../store/UserProgressContext";
import useHttp from "../../hooks/useHttp";
import Loading from "./UI/Loading";
import Error from "./UI/Error";
import { useActionState } from "react";

const reqConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  // Debug logs
  console.log("Checkout progress:", userProgressCtx.progress);
  console.log("Cart items:", cartCtx.items);

  const { data, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    reqConfig
  );

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleCloseCheckout = () => {
    userProgressCtx.hideCheckout();
  };

  const handleFinish = () => {
    userProgressCtx.hideCheckout();
    cartCtx.clearItem();
    clearData();
  };

  async function checkoutAction(prevState, fd) {
    const customerData = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  const [formState, formAction, isSending] = useActionState(
    checkoutAction,
    null
  );

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleCloseCheckout}
      >
        <div style={{color: 'blue', fontWeight: 'bold', marginBottom: '1rem'}}>CHECKOUT COMPONENT IS RENDERING</div>
        <h2>Success</h2>
        <p>Your order was submitted successfully</p>
        <p>We will contact you soon through email within next few minutes</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
        <div className="success-circle">
          <div className="tick"></div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <div style={{color: 'blue', fontWeight: 'bold', marginBottom: '1rem'}}>CHECKOUT COMPONENT IS RENDERING</div>
      <h2>Your Cart</h2>
      <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem" }}>
        {cartCtx.items.length === 0 && <li>Your cart is empty.</li>}
        {cartCtx.items.map((item) => (
          <li key={item.id} style={{ marginBottom: "1rem", borderBottom: "1px solid #333", paddingBottom: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>
                <strong>{item.name}</strong> x {item.quantity}
              </span>
              <span>{currencyFormatter.format(item.price * item.quantity)}</span>
            </div>
          </li>
        ))}
      </ul>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed to submit order" message={error} />}
        <span className="modal-actions">
          {isSending ? (
            <Loading />
          ) : (
            <>
              <Button onClick={handleCloseCheckout} type="button" textOnly>
                Close
              </Button>
              <Button>Submit Order</Button>
            </>
          )}
        </span>
      </form>
    </Modal>
  );
}