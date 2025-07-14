// pages/api/token.js
import axios from "axios";
import config from "../../lib/config";

export default async function handler(req, res) {
  const { code } = req.query;
  const params = new URLSearchParams({
    code,
    client_id: config.api.client_id,
    client_secret: config.api.client_secret,
    redirect_uri: `${config.components.HeaderImage.homepage_url}/login`,
    grant_type: "authorization_code",
  });

  try {
    const { data } = await axios.post(
      "https://oauth2.googleapis.com/token",
      params.toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    return res.status(200).json(data);
  } catch (err) {
    console.error("⚠️ Token exchange error:", err.response?.data || err);
    return res
      .status(err.response?.status || 500)
      .json({ error: err.response?.data || err.message });
  }
}
