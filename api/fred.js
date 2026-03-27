// /api/fred.js
export default async function handler(req, res) {
  // Consentiamo l'accesso dal tuo file HTML locale (CORS FIX)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { series_id } = req.query;
  const API_KEY = "LA_TUA_CHIAVE_FRED_QUI"; // <--- METTI LA TUA CHIAVE QUI

  if (!series_id) {
    return res.status(400).json({ error: "Manca series_id (es. GDP, UNRATE)" });
  }

  try {
    // Chiamata a FRED con limite di 2 osservazioni per avere l'ultimo dato e il precedente (per il calcolo YoY)
    const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${series_id}&api_key=${API_KEY}&file_type=json&sort_order=desc&limit=12`;

    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Errore server: " + err.message });
  }
}