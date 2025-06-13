import { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'error', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className={`toast ${type}`}>
      <div className="toast-content">
        <i className={`fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}`}></i>
        <div className="message">
          <span className="text">{message}</span>
        </div>
      </div>
      <i className="fas fa-times close" onClick={onClose}></i>
      <div className="progress"></div>
    </div>
  );
};

export default Toast; 