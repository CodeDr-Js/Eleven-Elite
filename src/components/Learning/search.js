import React, { useState } from 'react';

const App = () => {
  // Sample array of data
  const data = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];

  // State to hold the search input and filtered results
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  // Function to handle search input changes
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter the data based on the search input
    const filtered = data.filter(item =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Type to search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div id="results">
        {filteredData.map((item, index) => (
          <div key={index} className="result-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
