// pages/login.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../lib/config"; // O usa "@/lib/config" si configuraste rutas absolutas

const LoginPage = () => {
  const router = useRouter();
  const { code } = router.query;
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!router.isReady || isProcessing) {
      return;
    }

    const redirectUri = `${config.components.HeaderImage.homepage_url}/login`;

    if (!code) {
      const authUrl =
        "https://accounts.google.com/o/oauth2/v2/auth?" +
        new URLSearchParams({
          client_id: config.api.client_id,
          redirect_uri: redirectUri,
          response_type: "code",
          access_type: "offline",
          prompt: "consent",
          scope: config.api.scopes.join(" "),
        });
      window.location.href = authUrl.toString();
      return;
    }

    if (code) {
      setIsProcessing(true);
      (async () => {
        try {
          const { data } = await axios.get(
            `/api/token?code=${encodeURIComponent(code)}`
          );
          localStorage.setItem("access_token", data.access_token);
          if (data.refresh_token) {
            localStorage.setItem("refresh_token", data.refresh_token);
          }
          router.replace("/");
        } catch (err) {
          console.error("Falló el intercambio de tokens:", err.response?.data);
          alert("Error al iniciar sesión: " + (err.response?.data?.error || "Error desconocido"));
          setIsProcessing(false);
          router.replace("/login"); // Opcional: intentar de nuevo limpiando la URL
        }
      })();
    }
  }, [router.isReady, code, isProcessing, router]);

  return <p>Verificando inicio de sesión, por favor espera…</p>;
};

export default LoginPage;