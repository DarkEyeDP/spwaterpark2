
  import { createRoot } from "react-dom/client";
  import Clarity from "@microsoft/clarity";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  Clarity.init("wyve4loc5r");

  createRoot(document.getElementById("root")!).render(<App />);
  