import { Fragment } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

function Modal({ open, onClose, children }) {
  console.log("Modal open:", open);
  if (!open) return null;

  return createPortal(
    <Fragment>
      <div className="backdrop" onClick={onClose} />
      <div className="modal">
        <div style={{color: 'red', fontWeight: 'bold', marginBottom: '1rem'}}>MODAL IS OPEN</div>
        {children}
      </div>
    </Fragment>,
    document.getElementById("modal")
  );
}

export default Modal; 