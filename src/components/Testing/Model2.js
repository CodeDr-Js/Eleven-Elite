// Modal.js
import React, { useState } from "react";
import "./Modal.css";

function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseModal = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <button onClick={toggleModal}>Open Modal</button>
      {isOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content">
            <h2>Modal Content</h2>
            <p>This is the content of the modal.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
