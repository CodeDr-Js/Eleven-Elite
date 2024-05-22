import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode-generator';

function QRCodeGenerator({ text }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!text || !containerRef.current) return;

    // Create QR code
    var typeNumber = 4;
    var errorCorrectionLevel = 'L';
    var qr = QRCode(typeNumber, errorCorrectionLevel);
    qr.addData(text);
    qr.make();

    // Render QR code inside the container
    containerRef.current.innerHTML = qr.createImgTag();
  }, [text]);

  return <div ref={containerRef}></div>;
}

export default QRCodeGenerator;
