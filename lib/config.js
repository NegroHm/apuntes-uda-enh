// Configuration helper that replaces config.json
// This file handles both server-side and client-side environment variables

const config = {
  api: {
    // Se elimina client_id, client_secret y scopes.
    // Se añade la nueva clave de API para el acceso público.
    key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  },
  directory: {
    team_drive: process.env.NEXT_PUBLIC_GOOGLE_TEAM_DRIVE,
    target_folder: process.env.NEXT_PUBLIC_GOOGLE_TARGET_FOLDER,
  },
  components: {
    HeaderImage: {
      homepage_url:
        process.env.NEXT_PUBLIC_HOMEPAGE_URL || "http://localhost:3000",
      logo_url: process.env.NEXT_PUBLIC_LOGO_URL,
      logo_alt: process.env.NEXT_PUBLIC_LOGO_ALT || "Logo",
      logo_width: process.env.NEXT_PUBLIC_LOGO_WIDTH || "300px",
      logo_color: process.env.NEXT_PUBLIC_LOGO_COLOR || "#5b777d",
    },
  },
};

// Se actualiza el log de depuración para reflejar la nueva configuración.
// Este log solo se mostrará durante el desarrollo local, no en producción.
if (process.env.NODE_ENV === "development") {
  console.log("🔧 Config Debug (Modo Público):", {
    hasApiKey: !!config.api.key,
    hasTargetFolder: !!config.directory.target_folder,
    homepageUrl: config.components.HeaderImage.homepage_url,
  });
}

// Se actualiza la función de validación para las nuevas variables requeridas.
export const validateConfig = () => {
  const required = [
    "NEXT_PUBLIC_GOOGLE_API_KEY",
    "NEXT_PUBLIC_GOOGLE_TARGET_FOLDER",
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error("Faltan variables de entorno requeridas:", missing);
    return false;
  }

  return true;
};

export default config;
