// pages/login.js
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import config from "../lib/config";

const LoginPage = () => {
  const router = useRouter();
  const { code } = router.query;
  const redirectUri = `${config.components.HeaderImage.homepage_url}/login`;

  useEffect(() => {
    // 1️⃣ Si NO hay código, lanza la petición de autorización
    if (!code) {
      const authUrl =
        "https://accounts.google.com/o/oauth2/v2/auth?" +
        `client_id=${encodeURIComponent(config.api.client_id)}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&response_type=code` +
        `&access_type=offline` +
        `&prompt=consent` +
        `&scope=${encodeURIComponent(config.api.scopes)}`;
      window.location.href = authUrl;
      return;
    }

    // 2️⃣ Si YA llegaste con el código, haz el exchange en tu API route
    (async () => {
      try {
        const { data } = await axios.get(`/api/token?code=${encodeURIComponent(code)}`);
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        router.replace("/");  // redirige a home
      } catch (err) {
        console.error("Token exchange failed:", err.response?.data || err.message);
        alert("Error intercambiando código por tokens. " +
              (err.response?.data.error_description || err.message));
      }
    })();
  }, [code, redirectUri, router]);

  return <p>Redirigiendo a Google…</p>;
};

export default LoginPage;
