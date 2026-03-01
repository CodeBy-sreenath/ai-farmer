export const metadata = {
  title: "AI Farmer - Crop Disease Detector",
  description: "AI-powered crop disease detection for farmers in Kerala and India",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Malayalam:wght@400;700&family=Playfair+Display:wght@700;900&family=Lora:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#0a1a0f" }}>
        {children}
      </body>
    </html>
  );
}