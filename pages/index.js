import { useState } from "react";

export default function Home() {
  const [number, setNumber] = useState("");
  const [code, setCode] = useState("");

  const pair = async () => {
    setCode("Loading...");

    try {
      const res = await fetch("/api/pair", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number }),
      });
      const data = await res.json();
      setCode(data.code || data.error);
    } catch {
      setCode("Server error");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>WhatsApp Pair</h1>
      <input
        placeholder="947XXXXXXXX"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <br />
      <br />
      <button onClick={pair}>Get Code</button>
      <h2>{code}</h2>
    </div>
  );
}
