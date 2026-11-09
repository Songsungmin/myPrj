"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("hello world!!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      // Node.js 백엔드 서버(포트 5000)로 신호 전송
      const res = await fetch("http://localhost:5000/api/welcome");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      // 백엔드에서 응답받은 Welcome to the My Project 문구로 상태 갱신
      if (data && data.message) {
        setMessage(data.message);
      }
    } catch (err) {
      console.error("Backend request error:", err);
      setError("백엔드 서버(http://localhost:5000)와 통신에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
        textAlign: "center",
        gap: "1.5rem",
      }}
    >
      <h1
        style={{
          fontSize: "2.75rem",
          fontWeight: "bold",
          color: message === "hello world!!" ? "#222" : "#0070f3",
          transition: "color 0.3s ease",
        }}
      >
        {message}
      </h1>

      <button
        onClick={handleClick}
        disabled={loading}
        style={{
          padding: "0.8rem 2.2rem",
          fontSize: "1.2rem",
          fontWeight: "600",
          backgroundColor: loading ? "#999" : "#0070f3",
          color: "#ffffff",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: "0 4px 10px rgba(0, 112, 243, 0.25)",
          transition: "all 0.2s ease",
        }}
      >
        {loading ? "요청 중..." : "click"}
      </button>

      {error && (
        <p style={{ color: "#d32f2f", fontSize: "0.95rem", marginTop: "0.5rem" }}>
          {error}
        </p>
      )}
    </main>
  );
}
