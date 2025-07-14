// Configuration helper that replaces config.json
// This file handles both server-side and client-side environment variables

const config = {
  api: {
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    scopes:
      process.env.NEXT_PUBLIC_GOOGLE_SCOPES ||
      "https://www.googleapis.com/auth/drive.metadata.readonly",
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

// Add some debug logging in development
if (process.env.NODE_ENV === "development") {
  console.log("🔧 Config Debug:", {
    hasClientId: !!config.api.client_id,
    hasClientSecret: !!config.api.client_secret,
    hasTargetFolder: !!config.directory.target_folder,
    homepageUrl: config.components.HeaderImage.homepage_url,
  });
}

// Validation function to check if required environment variables are set
export const validateConfig = () => {
  const required = [
    "NEXT_PUBLIC_GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "NEXT_PUBLIC_GOOGLE_TARGET_FOLDER",
    "NEXT_PUBLIC_GOOGLE_TEAM_DRIVE",
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error("Missing required environment variables:", missing);
    return false;
  }

  return true;
};

export default config;
