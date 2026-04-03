"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function QrBlock() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const cardUrl = `${window.location.origin}/card`;
    setUrl(cardUrl);

    const canvas = document.getElementById("qr-canvas");
    QRCode.toCanvas(canvas, cardUrl, {
      width: 216,
      margin: 1
    }).catch(console.error);
  }, []);

  return (
    <>
      <div className="qr-box" aria-label="QR code vers la carte">
        <canvas id="qr-canvas" />
      </div>
      {/* <p className="link-hint">{url}</p> */}
    </>
  );
}
