// pages/login.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

// NO importamos más el archivo config.js local

const LoginPage = () => {
  const router = useRouter();
  const { code } = router.query;
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // No hacer nada hasta que el router esté listo y no estemos procesando
    if (!router.isReady || isProcessing) {
      return;
    }

    // --- Usamos variables de entorno PÚBLICAS de Vercel ---
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    const scopes = process.env.NEXT_PUBLIC_GOOGLE_SCOPES;

    // Verificamos que las variables del lado del cliente se cargaron correctamente
    if (!clientId || !appUrl || !scopes) {
        console.error("Error: Faltan variables de entorno del cliente (NEXT_PUBLIC_)");
        alert("Error de configuración del cliente. Por favor, contacte al administrador.");
        return;
    }

    const redirectUri = `${appUrl}/login`;

    // Si no hay un 'code' en la URL, redirigimos a Google para que el usuario inicie sesión
    if (!code) {
      const authUrl =
        "https://accounts.google.com/o/oauth2/v2/auth?" +
        new URLSearchParams({
          client_id: clientId,
          redirect_uri: redirectUri,
          response_type: "code",
          access_type: "offline",
          prompt: "consent",
          scope: scopes,
        });
      window.location.href = authUrl; // Redirigir al usuario
      return;
    }

    // Si SÍ hay un 'code', lo enviamos a nuestra API para obtener el token de acceso
    if (code) {
      setIsProcessing(true);
      (async () => {
        try {
          // Llamamos a nuestra propia API que SÍ tiene acceso al client_secret
          const { data } = await axios.get(
            `/api/token?code=${encodeURIComponent(code)}`
          );

          // Guardamos los tokens y redirigimos a la página principal
          localStorage.setItem("access_token", data.access_token);
          if (data.refresh_token) {
            localStorage.setItem("refresh_token", data.refresh_token);
          }
          router.replace("/"); // Usamos replace para no dejar el login en el historial

        } catch (err) {
          console.error("Falló el intercambio de tokens:", err.response?.data);
          alert("Error al iniciar sesión: " + (err.response?.data?.details?.error || err.response?.data?.error || "Error desconocido"));
          setIsProcessing(false);
          // Limpiamos la URL del 'code' para evitar bucles y permitir reintentar
          router.replace("/login", undefined, { shallow: true });
        }
      })();
    }
  }, [router.isReady, code, isProcessing, router]);

  return <p>Verificando inicio de sesión, por favor espera…</p>;
};

export default LoginPage;