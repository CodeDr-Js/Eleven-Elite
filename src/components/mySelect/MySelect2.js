import React, { useState } from 'react';
import './CustomDropdown.css'; // Import your CSS file

const CustomDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = ["Option 1", "Option 2", "Option 3"]; // Add your options here

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    // You can perform additional actions when an option is selected
  };

  return (
    <div className="custom-dropdown">
      <button className="dropdown-btn" onClick={toggleDropdown}>
        {selectedOption || "Select an Option"}
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown-option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
