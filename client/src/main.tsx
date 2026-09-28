import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Umami solo si las variables están definidas (antes se pedía la URL literal "%VITE_ANALYTICS_ENDPOINT%/umami" → 404)
const analyticsEndpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
const analyticsId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;
if (analyticsEndpoint && analyticsId) {
  const s = document.createElement("script");
  s.defer = true;
  s.src = `${analyticsEndpoint}/umami`;
  s.dataset.websiteId = analyticsId;
  document.head.appendChild(s);
}

createRoot(document.getElementById("root")!).render(<App />);
