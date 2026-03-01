"use client";
import { useRef, useState } from "react";

export default function UploadBox({ onUpload, t }) {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    onUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div
      className={`drop-zone${dragOver ? " over" : ""}`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      style={{ cursor: "pointer" }}
    >
      <span style={{ fontSize: "3.5rem", display: "block", marginBottom: 16 }}>🍃</span>
      <div style={{ color: "#a7f3c0", fontFamily: "'Lora', Georgia, serif", fontSize: "1.05rem", marginBottom: 4 }}>
        Drag & drop your leaf image here
      </div>
      <div style={{ color: "#4ade80", fontSize: "0.8rem", opacity: 0.7 }}>{t.uploadHint}</div>
      <button
        className="upload-btn"
        onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
      >
        📷 {t.uploadBtn}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
}