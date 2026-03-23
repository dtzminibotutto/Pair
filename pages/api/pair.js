import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { number } = req.body;
  if (!number) return res.status(400).json({ error: "Number required" });

  try {
    const backendRes = await fetch(`${process.env.RAILWAY_URL}/pair?number=${number}`);
    const data = await backendRes.json();
    res.status(200).json({ code: data.code });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Pair failed" });
  }
}
