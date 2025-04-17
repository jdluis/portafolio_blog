import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { logEvent } from "firebase/analytics";
import { analytics } from "../firebaseConfig.ts";

logEvent(analytics, 'app_started');

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
