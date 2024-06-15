import React from 'react';

function CopyButton({ text }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
      .then(() => {
        //console.log('Text copied to clipboard');
      })
      .catch(err => {
        //console.error('Failed to copy text: ', err);
      });
  };

  return (
    <button onClick={handleCopy}>Copy</button>
  );
}

export default CopyButton;
