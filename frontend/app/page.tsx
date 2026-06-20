"use client";

import { useState } from "react";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    setResult("");

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={`wrapper ${cormorant.className}`}>
      <div className="content">
        <h1 className="title">Monetary Policy Stance Classifier</h1>

        <p className="description">
          This tool uses a logistic regression model to classify statements as
          hawkish, dovish or neutral based on the underlying monetary policy
          stance. A hawkish tone typically signals concerns about inflation and a
          tendency toward tighter monetary policy. A dovish tone reflects concern
          for economic growth and employment, often indicating a preference for
          lower interest rates or accommodative policy. The model is trained on
          data available from the GeorgiaTech Financial Services Innovation Lab.
        </p>

        <div className="inputWrapper">
          <input
            className="input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste a central bank statement..."
          />
        </div>

        <button className="button" onClick={handlePredict}>
          {loading ? "Analyzing..." : "Predict"}
        </button>

        {result && (
          <div className="resultBox">
            <h2>Result</h2>
            <p>{result}</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .wrapper {
          position: fixed;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-image: url("/bg.jpg");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .content {
          max-width: 900px;
          width: 100%;
          text-align: center;
        }

        .title {
          font-size: 64px;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: #1f1f1f;
          margin-bottom: 20px;
        }

        .description {
          font-size: 18px;
          line-height: 1.9;
          color: #333;
          margin-bottom: 35px;
        }

        .inputWrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .input {
          width: 100%;
          max-width: 700px;
          padding: 18px;
          font-size: 16px;
          border-radius: 14px;
          border: 1px solid #ccc;
          background: rgba(255, 255, 255, 0.85);
          outline: none;
        }

        .input:focus {
          border-color: #777;
        }

        .button {
          padding: 14px 28px;
          font-size: 16px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          background: #1f1f1f;
          color: white;
        }

        .button:hover {
          opacity: 0.9;
        }

        .resultBox {
          margin-top: 25px;
          display: inline-block;
          padding: 16px 24px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.9);
        }

        .resultBox h2 {
          margin-bottom: 8px;
          color: #1f1f1f;
        }

        .resultBox p {
          font-size: 18px;
          font-weight: 600;
          color: #111;
        }
      `}</style>
    </main>
  );
}