import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SvgFace from "./SvgFace";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SvgFace />
  </StrictMode>,
);
