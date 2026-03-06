"use client";
import { useState, useRef } from "react";
import UploadBox from "./components/UploadBox";
import Loader from "./components/Loader";
import ResultCard from "./components/ResultCard";

const content = {
  en: {
    badge: "🌾 Powered by Deep Learning",
    heroTitle: "AI Farmer",
    heroSubtitle: "Crop Disease Detector",
    heroDesc:
      "Empower your farm with artificial intelligence. Instantly identify crop diseases and get organic treatment recommendations — right from your phone.",
    stat1: "50+ Diseases", stat1sub: "Detected Accurately",
    stat2: "92%+", stat2sub: "Prediction Accuracy",
    stat3: "Instant", stat3sub: "Results",
    scrollCta: "Try it below",
    uploadSection: "🔬 Diagnosis Tool",
    uploadTitle: "Diagnose Your Crop",
    uploadDesc:
      "Upload a clear photo of the affected leaf to get an instant AI diagnosis. Our model is trained on thousands of crop images from Indian farms.",
    previewTitle: "Uploaded Image",
    howSection: "⚙️ Process",
    howTitle: "How It Works",
    how1Title: "Upload a Photo",
    how1Desc: "Take a clear picture of the diseased leaf with your smartphone.",
    how2Title: "AI Analysis",
    how2Desc: "Our deep learning model analyzes the visual symptoms instantly.",
    how3Title: "Get Treatment",
    how3Desc: "Receive organic, affordable treatment plans tailored to your crop.",
    whySection: "🌾 Benefits",
    whyTitle: "Why Use AI Crop Doctor?",
    why1: "✅ No expertise needed — any farmer can use it",
    why2: "✅ Save crops before disease spreads further",
    why3: "✅ Organic and chemical treatment options provided",
    why4: "✅ Works offline after first load",
    why5: "✅ Supports 20+ crops including Rice, Tomato, Wheat & more",
    footerText: "Made with ❤️ for farmers across Kerala and India",
    langToggle: "മലയാളം",
  },
  ml: {
    badge: "🌾 ഡീപ് ലേണിംഗ് ഉപയോഗിക്കുന്നു",
    heroTitle: "AI കർഷകൻ",
    heroSubtitle: "വിള രോഗ നിർണ്ണായകൻ",
    heroDesc:
      "കൃത്രിമ ബുദ്ധിമത്തയുടെ ശക്തി ഉപയോഗിച്ച് നിങ്ങളുടെ കൃഷിഭൂമിയെ ശക്തിപ്പെടുത്തുക. ഇലകളിലെ രോഗം ഉടനടി തിരിച്ചറിയുകയും ജൈവ ചികിത്സ ശുപാർശകൾ നേടുകയും ചെയ്യുക.",
    stat1: "50+ രോഗങ്ങൾ", stat1sub: "കൃത്യമായി കണ്ടെത്തുന്നു",
    stat2: "92%+", stat2sub: "പ്രവചന കൃത്യത",
    stat3: "ഉടനടി", stat3sub: "ഫലങ്ങൾ",
    scrollCta: "താഴെ പരീക്ഷിക്കൂ",
    uploadSection: "🔬 നിർണ്ണയ ഉപകരണം",
    uploadTitle: "നിങ്ങളുടെ വിള പരിശോധിക്കുക",
    uploadDesc:
      "AI നിർണ്ണയം ലഭിക്കാൻ ബാധിത ഇലയുടെ വ്യക്തമായ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക. ഞങ്ങളുടെ മോഡൽ ഇന്ത്യൻ കൃഷിഭൂമികളിൽ നിന്നുള്ള ആയിരക്കണക്കിന് ചിത്രങ്ങളിൽ പരിശീലിപ്പിച്ചതാണ്.",
    previewTitle: "അപ്‌ലോഡ് ചെയ്ത ചിത്രം",
    howSection: "⚙️ പ്രക്രിയ",
    howTitle: "എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    how1Title: "ഫോട്ടോ എടുക്കുക",
    how1Desc: "സ്മാർട്ട്ഫോൺ ഉപയോഗിച്ച് രോഗബാധിത ഇലയുടെ വ്യക്തമായ ചിത്രം എടുക്കുക.",
    how2Title: "AI വിശകലനം",
    how2Desc: "ഞങ്ങളുടെ ഡീപ് ലേണിംഗ് മോഡൽ ഉടനടി ദൃശ്യ ലക്ഷണങ്ങൾ വിശകലനം ചെയ്യുന്നു.",
    how3Title: "ചികിത്സ നേടുക",
    how3Desc: "നിങ്ങളുടെ വിളക്ക് അനുയോജ്യമായ ജൈവ ചികിത്സ പദ്ധതികൾ ലഭിക്കുന്നു.",
    whySection: "🌾 ഗുണങ്ങൾ",
    whyTitle: "AI ക്രോപ്പ് ഡോക്ടർ എന്തുകൊണ്ട്?",
    why1: "✅ വൈദഗ്ധ്യം ആവശ്യമില്ല — ഏതൊരു കർഷകനും ഉപയോഗിക്കാം",
    why2: "✅ രോഗം കൂടുതൽ പടർന്നു പിടിക്കുന്നതിന് മുൻപ് വിള രക്ഷിക്കുക",
    why3: "✅ ജൈവ, രാസ ചികിത്സ ഓപ്ഷനുകൾ ലഭ്യമാണ്",
    why4: "✅ ആദ്യ ലോഡ് ശേഷം ഓഫ്‌ലൈൻ ആയി പ്രവർത്തിക്കുന്നു",
    why5: "✅ നെല്ല്, തക്കാളി, ഗോതമ്പ് ഉൾപ്പെടെ 20+ വിളകളെ പിന്തുണയ്ക്കുന്നു",
    footerText: "കേരളത്തിലെയും ഇന്ത്യയിലെയും കർഷകർക്കായി ❤️ കൊണ്ട് നിർമ്മിച്ചത്",
    langToggle: "English",
  },
};

export default function Home() {
  const [lang, setLang] = useState("en");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const t = content[lang];

  /*const handleUpload = (file) => {
    setLoading(true);
    setResult(null);
    setProgress(0);
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 100) { p = 100; clearInterval(interval); }
      setProgress(Math.min(Math.round(p), 100));
    }, 180);

    setTimeout(() => {
      setResult({
        disease: "Tomato Early Blight",
        diseaseML: "തക്കാളി ഏർളി ബ്ലൈറ്റ്",
        confidence: 92,
        treatment: "Spray neem oil solution (2%) every 7 days. Remove infected leaves immediately. Ensure proper spacing between plants for airflow. Avoid overhead watering.",
        treatmentML: "ഓരോ 7 ദിവസവും നീം ഓയിൽ ലായനി (2%) സ്പ്രേ ചെയ്യുക. രോഗബാധിത ഇലകൾ ഉടനടി നീക്കം ചെയ്യുക. വായു സഞ്ചാരത്തിനായി ചെടികൾക്കിടയിൽ ശരിയായ ഇടം ഉറപ്പാക്കുക.",
      });
      setLoading(false);
    }, 2200);
  };*/
  const handleUpload = async (file) => {
  setLoading(true);
  setResult(null);
  setProgress(0);

  const imageUrl = URL.createObjectURL(file);
  setPreview(imageUrl);

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/predict", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Prediction failed");
    }

    const data = await response.json();

    setResult({
      disease: data.disease,
      diseaseML: data.disease, // you can later translate
      confidence: Math.round(data.confidence * 100),
      treatment: data.treatment,
      treatmentML: data.treatment,
    });

  } catch (error) {
    console.error(error);
    alert("Something went wrong!");
  }

  setLoading(false);
};
  

  return (
    <main style={{ fontFamily: "'Noto Sans Malayalam', 'Merriweather', Georgia, serif", minHeight: "100vh", background: "#0a1a0f", color: "#f0f7ee" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Malayalam:wght@400;700&family=Playfair+Display:wght@700;900&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .lang-btn {
          position: fixed; top: 20px; right: 20px; z-index: 999;
          background: rgba(5,46,22,0.9); border: 1px solid rgba(74,222,128,0.5);
          color: #4ade80; font-size: 0.85rem; padding: 9px 20px;
          border-radius: 100px; cursor: pointer; backdrop-filter: blur(12px);
          transition: background 0.2s; font-family: inherit;
        }
        .lang-btn:hover { background: rgba(22,101,52,0.95); }

        .hero-bg {
          position: relative; overflow: hidden;
          background:
            linear-gradient(160deg, rgba(5,30,10,0.93) 0%, rgba(10,40,15,0.88) 50%, rgba(3,20,8,0.96) 100%),
            url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80') center/cover no-repeat;
          min-height: 92vh; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 80px 20px 60px;
        }
        .hero-bg::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 80%, rgba(34,197,94,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .leaf-deco { position: absolute; font-size: 8rem; opacity: 0.04; pointer-events: none; animation: floatLeaf 10s ease-in-out infinite; }
        .leaf-deco:nth-child(1) { top: 8%; left: 5%; animation-delay: 0s; }
        .leaf-deco:nth-child(2) { top: 20%; right: 8%; animation-delay: 3s; font-size: 5rem; }
        .leaf-deco:nth-child(3) { bottom: 15%; left: 12%; animation-delay: 6s; font-size: 6rem; }
        @keyframes floatLeaf {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(8deg); }
        }

        .hero-badge {
          display: inline-block; background: rgba(34,197,94,0.15);
          border: 1px solid rgba(34,197,94,0.4); color: #4ade80;
          font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase;
          padding: 6px 18px; border-radius: 100px; margin-bottom: 24px;
        }
        .hero-title {
          font-family: 'Playfair Display', serif; font-weight: 900;
          font-size: clamp(3rem, 8vw, 6.5rem); line-height: 1.0;
          color: #f0fdf4; letter-spacing: -0.02em;
        }
        .hero-title span {
          color: #4ade80; display: block;
          font-size: clamp(1.5rem, 4vw, 2.8rem); font-weight: 700;
          letter-spacing: 0.05em; margin-top: 4px;
        }
        .hero-desc {
          font-family: 'Lora', serif; font-size: clamp(1rem, 2.2vw, 1.2rem);
          color: #a7f3c0; max-width: 600px; margin: 28px auto 0;
          line-height: 1.8; font-style: italic; opacity: 0.9;
        }
        .stats-row { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; margin-top: 48px; }
        .stat-pill {
          background: rgba(255,255,255,0.05); border: 1px solid rgba(74,222,128,0.25);
          backdrop-filter: blur(10px); border-radius: 16px; padding: 18px 28px;
          text-align: center; transition: transform 0.2s, border-color 0.2s;
        }
        .stat-pill:hover { transform: translateY(-4px); border-color: rgba(74,222,128,0.6); }
        .stat-num { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 900; color: #4ade80; line-height: 1; }
        .stat-label { font-size: 0.78rem; color: #86efac; margin-top: 4px; letter-spacing: 0.05em; }

        .scroll-cta {
          margin-top: 52px; display: flex; flex-direction: column; align-items: center;
          gap: 8px; color: #4ade80; font-size: 0.85rem; letter-spacing: 0.1em;
          opacity: 0.7; animation: bounce 2s ease-in-out infinite;
        }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(8px); } }

        .section { padding: 80px 20px; max-width: 900px; margin: 0 auto; }
        .section-label { font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; color: #4ade80; margin-bottom: 12px; opacity: 0.8; }
        .section-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 700; color: #f0fdf4; line-height: 1.2; }
        .divider { width: 60px; height: 3px; background: linear-gradient(90deg, #4ade80, transparent); border-radius: 2px; margin: 20px 0 32px; }
        .full-divider { border: none; border-top: 1px solid rgba(74,222,128,0.08); margin: 0; }

        .upload-card {
          background: rgba(255,255,255,0.04); border: 1px solid rgba(74,222,128,0.2);
          border-radius: 24px; padding: 40px; backdrop-filter: blur(10px);
        }
        .drop-zone {
          border: 2px dashed rgba(74,222,128,0.35); border-radius: 16px; padding: 50px 20px;
          text-align: center; cursor: pointer; transition: all 0.3s; background: rgba(34,197,94,0.03);
        }
        .drop-zone:hover { border-color: #4ade80; background: rgba(34,197,94,0.08); transform: scale(1.01); }
        .upload-btn {
          display: inline-block; background: linear-gradient(135deg, #16a34a, #4ade80);
          color: #052e16; font-family: 'Playfair Display', serif; font-weight: 700;
          font-size: 1rem; padding: 14px 36px; border-radius: 100px; border: none;
          cursor: pointer; margin-top: 20px; transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(74,222,128,0.3);
        }
        .upload-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(74,222,128,0.45); }

        .how-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; margin-top: 40px; }
        .how-card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(74,222,128,0.15);
          border-radius: 20px; padding: 32px 24px; text-align: center;
          transition: transform 0.2s, border-color 0.2s;
        }
        .how-card:hover { transform: translateY(-6px); border-color: rgba(74,222,128,0.4); }
        .how-num { font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 900; color: rgba(74,222,128,0.2); line-height: 1; margin-bottom: 12px; }
        .how-title { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 1.1rem; color: #f0fdf4; margin-bottom: 10px; }
        .how-desc { color: #86efac; font-size: 0.9rem; line-height: 1.6; font-family: 'Lora', serif; font-style: italic; }

        .why-section {
          background: linear-gradient(135deg, rgba(22,101,52,0.2), rgba(20,83,45,0.15));
          border: 1px solid rgba(74,222,128,0.15); border-radius: 24px; padding: 48px 40px;
        }
        .why-item {
          padding: 14px 0; border-bottom: 1px solid rgba(74,222,128,0.08);
          font-family: 'Lora', serif; color: #d1fae5; font-size: 1.02rem; line-height: 1.5;
        }
        .why-item:last-child { border-bottom: none; }

        footer { text-align: center; padding: 40px 20px; border-top: 1px solid rgba(74,222,128,0.1); color: #4ade80; font-family: 'Lora', serif; font-style: italic; font-size: 0.9rem; opacity: 0.7; }

        @media (max-width: 600px) {
          .upload-card { padding: 24px 18px; }
          .why-section { padding: 32px 20px; }
          .section { padding: 60px 16px; }
        }
      `}</style>

      {/* Language Toggle */}
      <button className="lang-btn" onClick={() => setLang(lang === "en" ? "ml" : "en")}>
        🌐 {t.langToggle}
      </button>

      {/* Hero Section */}
      <section className="hero-bg">
        <div className="leaf-deco">🌿</div>
        <div className="leaf-deco">🍃</div>
        <div className="leaf-deco">🌱</div>
        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 720 }}>
          <span className="hero-badge">{t.badge}</span>
          <h1 className="hero-title">
            {t.heroTitle}
            <span>{t.heroSubtitle}</span>
          </h1>
          <p className="hero-desc">{t.heroDesc}</p>
          <div className="stats-row">
            <div className="stat-pill"><div className="stat-num">{t.stat1}</div><div className="stat-label">{t.stat1sub}</div></div>
            <div className="stat-pill"><div className="stat-num">{t.stat2}</div><div className="stat-label">{t.stat2sub}</div></div>
            <div className="stat-pill"><div className="stat-num">{t.stat3}</div><div className="stat-label">{t.stat3sub}</div></div>
          </div>
          <div className="scroll-cta">
            <span>↓</span>
            <span style={{ fontFamily: "'Lora', serif", fontStyle: "italic" }}>{t.scrollCta}</span>
          </div>
        </div>
      </section>

      <hr className="full-divider" />

      {/* Upload Section */}
      <section className="section">
        <div className="section-label">{t.uploadSection}</div>
        <h2 className="section-title">{t.uploadTitle}</h2>
        <div className="divider" />
        <p style={{ fontFamily: "'Lora', serif", color: "#86efac", fontSize: "1rem", marginBottom: 32, fontStyle: "italic", lineHeight: 1.7 }}>
          {t.uploadDesc}
        </p>
        <div className="upload-card">
          <UploadBox onUpload={handleUpload} t={t} />
          {preview && (
            <div style={{ marginTop: 24, textAlign: "center" }}>
              <div style={{ fontFamily: "'Lora', serif", color: "#86efac", fontSize: "0.85rem", marginBottom: 12, fontStyle: "italic" }}>{t.previewTitle}</div>
              <img src={preview} alt="Leaf preview" style={{ maxWidth: 260, width: "100%", borderRadius: 16, border: "2px solid rgba(74,222,128,0.3)", boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }} />
            </div>
          )}
          {loading && <Loader progress={progress} t={t} preview={preview} />}
          {result && !loading && <ResultCard data={result} lang={lang} t={t} />}
        </div>
      </section>

      <hr className="full-divider" />

      {/* How It Works */}
      <section className="section">
        <div className="section-label">{t.howSection}</div>
        <h2 className="section-title">{t.howTitle}</h2>
        <div className="divider" />
        <div className="how-grid">
          {[
            { num: "01", icon: "📱", title: t.how1Title, desc: t.how1Desc },
            { num: "02", icon: "🧠", title: t.how2Title, desc: t.how2Desc },
            { num: "03", icon: "💊", title: t.how3Title, desc: t.how3Desc },
          ].map((s) => (
            <div className="how-card" key={s.num}>
              <div className="how-num">{s.num}</div>
              <div style={{ fontSize: "2.2rem", marginBottom: 12 }}>{s.icon}</div>
              <div className="how-title">{s.title}</div>
              <div className="how-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className="full-divider" />

      {/* Why Section */}
      <section className="section">
        <div className="section-label">{t.whySection}</div>
        <h2 className="section-title">{t.whyTitle}</h2>
        <div className="divider" />
        <div className="why-section">
          {[t.why1, t.why2, t.why3, t.why4, t.why5].map((item, i) => (
            <div className="why-item" key={i}>{item}</div>
          ))}
        </div>
      </section>

      <footer><p>{t.footerText}</p></footer>
    </main>
  );
}