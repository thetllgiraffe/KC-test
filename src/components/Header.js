import logo from "/logo.png";
import { renderLanding } from "./Landing.js";
import "../style.css";

export function renderHeader() {
  return `
    <div id="global-header">
      <img src="${logo}" alt="KardChips Logo" id="app-logo" />
    </div>
  `;
}

export function setupHeaderEvents() {
  const logoEl = document.getElementById("app-logo");
  if (logoEl) {
    logoEl.addEventListener("click", () => {
      window.location.hash = "";
      renderLanding();
    });
  }
}
