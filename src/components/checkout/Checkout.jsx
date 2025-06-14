import { useContext, useState } from 'react';
import { CartContext } from '../../store/CartContext';
import { currencyFormatter } from '../../util/formatting';
import './Checkout.css';

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const cartTotal = cartCtx.items.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = deliveryMethod === 'delivery' ? 5 : 0;
  const totalAmount = cartTotal + deliveryFee;

  const handlePlaceOrder = () => {
    // Tạo thông tin đơn hàng
    const order = {
      items: cartCtx.items,
      deliveryMethod,
      paymentMethod,
      subtotal: cartTotal,
      deliveryFee,
      totalAmount,
      orderDate: new Date().toLocaleString(),
      orderNumber: Math.floor(Math.random() * 1000000)
    };

    setOrderDetails(order);
    setShowSuccessModal(true);
    cartCtx.clearCart(); // Xóa giỏ hàng sau khi đặt hàng thành công
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setOrderDetails(null);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
      </div>

      <div className="checkout-content">
        <div className="checkout-section">
          <h2>Order Summary</h2>
          <div className="order-items">
            {cartCtx.items.map((item) => (
              <div key={item.id} className="order-item">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">x{item.quantity}</span>
                </div>
                <span className="item-price">{currencyFormatter.format(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="checkout-section">
          <h2>Delivery Method</h2>
          <div className="delivery-options">
            <label className="delivery-option">
              <input
                type="radio"
                name="delivery"
                value="delivery"
                checked={deliveryMethod === 'delivery'}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              />
              <span>Delivery (+$5.00)</span>
            </label>
            <label className="delivery-option">
              <input
                type="radio"
                name="delivery"
                value="pickup"
                checked={deliveryMethod === 'pickup'}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              />
              <span>Pickup (Free)</span>
            </label>
          </div>
        </div>

        <div className="checkout-section">
          <h2>Payment Method</h2>
          <div className="payment-options">
            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="credit"
                checked={paymentMethod === 'credit'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Credit Card</span>
            </label>
            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>PayPal</span>
            </label>
            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Cash on Delivery</span>
            </label>
          </div>
        </div>

        <div className="checkout-section">
          <h2>Order Total</h2>
          <div className="order-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{currencyFormatter.format(cartTotal)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>{currencyFormatter.format(deliveryFee)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{currencyFormatter.format(totalAmount)}</span>
            </div>
          </div>
        </div>

        <div className="checkout-actions">
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>

      {showSuccessModal && orderDetails && (
        <div className="modal-overlay">
          <div className="success-modal">
            <div className="success-icon">✓</div>
            <h2>Order Placed Successfully!</h2>
            <div className="order-details">
              <p><strong>Order Number:</strong> #{orderDetails.orderNumber}</p>
              <p><strong>Date:</strong> {orderDetails.orderDate}</p>
              <p><strong>Delivery Method:</strong> {orderDetails.deliveryMethod === 'delivery' ? 'Delivery' : 'Pickup'}</p>
              <p><strong>Payment Method:</strong> {
                orderDetails.paymentMethod === 'credit' ? 'Credit Card' :
                orderDetails.paymentMethod === 'paypal' ? 'PayPal' : 'Cash on Delivery'
              }</p>
              <p><strong>Total Amount:</strong> {currencyFormatter.format(orderDetails.totalAmount)}</p>
            </div>
            <button className="close-modal-btn" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 