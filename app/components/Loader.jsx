"use client";

export default function Loader({ progress, t, preview }) {
  return (
    <div style={{ marginTop: 32, textAlign: "center", padding: 30 }}>
      <div style={{
        width: 52, height: 52,
        border: "3px solid rgba(74,222,128,0.15)",
        borderTopColor: "#4ade80",
        borderRadius: "50%",
        animation: "spin 0.9s linear infinite",
        margin: "0 auto 16px"
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#4ade80", fontSize: "1.1rem" }}>
        {t.loadingText}
      </div>
      <div style={{ color: "#86efac", fontSize: "0.85rem", fontStyle: "italic", marginTop: 6, fontFamily: "'Lora', Georgia, serif" }}>
        {t.loadingSubtext}
      </div>
      <div style={{
        width: "100%", maxWidth: 340, height: 6,
        background: "rgba(255,255,255,0.1)", borderRadius: 100,
        margin: "16px auto 0", overflow: "hidden"
      }}>
        <div style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #16a34a, #4ade80)",
          borderRadius: 100,
          transition: "width 0.2s"
        }} />
      </div>
      <div style={{ color: "#4ade80", fontSize: "0.8rem", marginTop: 8 }}>{progress}%</div>
      {preview && (
        <img
          src={preview}
          alt="Analyzing"
          style={{ maxWidth: 160, borderRadius: 12, marginTop: 20, opacity: 0.6, border: "1px solid rgba(74,222,128,0.2)" }}
        />
      )}
    </div>
  );
}