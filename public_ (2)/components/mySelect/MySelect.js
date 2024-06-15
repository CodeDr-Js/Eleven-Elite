import React, { useState } from 'react';
import Select from 'react-select';

// Sample options data
const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' }
];

const customStyles = {
  // Styles the control (main input area)
  control: (provided, state) => ({
    ...provided,
    width: '150px',
    backgroundColor: '#007bff', // Background color
    color: '#333', // Text color
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: state.isFocused ? '0 0 0 1px #007bff' : null,
    '&:hover': {
      borderColor: '#007bff'
    }
  }),

  // Styles the option
  option: (provided, state) => ({
    ...provided,
    width: state.isSelected ? '150px' : "150px" ,
    backgroundColor: state.isSelected ? '#007bff' : null,
    color: state.isSelected ? '#fff' : null
  })
};

const MySelect = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = selectedOption => {
    setSelectedOption(selectedOption);
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      placeholder="Select an option"
      styles={customStyles}
    />
  );
};

export default MySelect;
