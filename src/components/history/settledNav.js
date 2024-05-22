import React, { useState } from 'react';
import "../color/color.css";
import "./index.css";
import SettleNav from './SettledNav/historyNav';


const SettledNav = () => {
  const [activeButton, setActiveButton] = useState('all');
  return (
    <div>
      <SettleNav
        activeButton={activeButton}
        setActiveButton={setActiveButton}
      />
    </div>
  )
}

export default SettledNav