"use client";

export default function ResultCard({ data, lang, t }) {
  return (
    <div style={{
      marginTop: 32,
      background: "rgba(5,46,22,0.6)",
      border: "1px solid rgba(74,222,128,0.35)",
      borderRadius: 20,
      padding: 32,
      animation: "fadeSlide 0.4s ease"
    }}>
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Label */}
      <div style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#4ade80", fontFamily: "'Lora', Georgia, serif", marginBottom: 10 }}>
        {t.resultTitle}
      </div>

      {/* Disease Name */}
      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", color: "#fca5a5", fontWeight: 700 }}>
        {lang === "ml" ? data.diseaseML : data.disease}
      </div>

      {/* Confidence */}
      <div style={{ color: "#86efac", fontSize: "0.85rem", marginTop: 12, fontFamily: "'Lora', Georgia, serif" }}>
        {t.confidence}: <strong style={{ color: "#4ade80" }}>{data.confidence}%</strong>
      </div>
      <div style={{ width: "100%", height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 100, marginTop: 10, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${data.confidence}%`,
          background: "linear-gradient(90deg, #16a34a, #4ade80)",
          borderRadius: 100,
          transition: "width 1s ease"
        }} />
      </div>

      {/* Treatment */}
      <div style={{
        background: "rgba(34,197,94,0.08)",
        border: "1px solid rgba(74,222,128,0.2)",
        borderRadius: 14,
        padding: 20,
        marginTop: 20
      }}>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, color: "#4ade80", marginBottom: 8, fontSize: "1rem" }}>
          {t.treatment}
        </div>
        <div style={{ color: "#d1fae5", fontFamily: "'Lora', Georgia, serif", lineHeight: 1.7, fontSize: "0.97rem" }}>
          {lang === "ml" ? data.treatmentML : data.treatment}
        </div>
      </div>
    </div>
  );
}