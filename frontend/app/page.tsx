"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handlePredict = async () => {
  try {
    const res = await fetch("https://bank-nlp-project.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText);
    }

    const data = await res.json();
    setResult(data.prediction);
  } catch (err) {
    console.error("Request failed:", err);
    setResult("Error: check console");
  }
};

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Hawkish vs Dovish Classifier</h1>

      <textarea
        rows={6}
        cols={60}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter central bank statement..."
      />

      <br /><br />

      <button onClick={handlePredict}>
        Predict
      </button>

      <h2>Result: {result}</h2>
    </main>
  );
}