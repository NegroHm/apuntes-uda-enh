// Create this as components/DebugConfig.js temporarily for testing
import config from "../lib/config";

const DebugConfig = () => {
	console.log("Config Debug:", {
		client_id: config.api.client_id ? "SET" : "MISSING",
		client_secret: config.api.client_secret ? "SET" : "MISSING",
		target_folder: config.directory.target_folder ? "SET" : "MISSING",
		team_drive: config.directory.team_drive || "EMPTY (OK)",
		homepage_url: config.components.HeaderImage.homepage_url,
	});

	return (
		<div style={{ padding: "20px", background: "#f0f0f0", margin: "10px" }}>
			<h3>Config Debug (Remove in production)</h3>
			<p>Client ID: {config.api.client_id ? "✅ Set" : "❌ Missing"}</p>
			<p>Client Secret: {config.api.client_secret ? "✅ Set" : "❌ Missing"}</p>
			<p>
				Target Folder:{" "}
				{config.directory.target_folder ? "✅ Set" : "❌ Missing"}
			</p>
			<p>
				Team Drive:{" "}
				{config.directory.team_drive || "Empty (OK for personal drive)"}
			</p>
			<p>Homepage URL: {config.components.HeaderImage.homepage_url}</p>
		</div>
	);
};

export default DebugConfig;
