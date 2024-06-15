import React, { useEffect } from 'react';

const DisableCopyComponent = () => {
  useEffect(() => {
    const handleCopy = (e) => {
      e.preventDefault();
      alert('Copying is disabled on this webpage.');
    };

    const handleCut = (e) => {
      e.preventDefault();
      alert('Cutting is disabled on this webpage.');
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
      alert('Right-click is disabled on this webpage.');
    };

    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);
    document.addEventListener('contextmenu', handleContextMenu);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <div>
      <p>Your content here</p>
    </div>
  );
};

export default DisableCopyComponent;