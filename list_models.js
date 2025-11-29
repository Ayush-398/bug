const fs = require('fs');
const https = require('https');

try {
  const env = fs.readFileSync('.env', 'utf8');
  const match = env.match(/GEMINI_API_KEY=(.*)/);
  const apiKey = match ? match[1].trim() : null;

  if (!apiKey) {
    console.error("GEMINI_API_KEY not found in .env");
    process.exit(1);
  }

  // Remove quotes if present
  const cleanApiKey = apiKey.replace(/^["']|["']$/g, '');

  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${cleanApiKey}`;

  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        if (json.error) {
          console.error("Error:", json.error);
        } else {
          console.log("Available Models:");
          if (json.models) {
            json.models.forEach(m => console.log(m.name));
          } else {
            console.log("No models found in response:", json);
          }
        }
      } catch (e) {
        console.error("Error parsing JSON:", e);
        console.log("Raw data:", data);
      }
    });
  }).on('error', (e) => {
    console.error("Request error:", e);
  });
} catch (err) {
  console.error("Error reading .env:", err);
}
