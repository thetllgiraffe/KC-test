import "../style.css";
import { CitySkyline } from "./backgrounds/CitySkyline.js";
import { renderChipFall } from "./backgrounds/ChipsAnimate.js";

export function renderLanding() {
  document.querySelector("#app").innerHTML = `
    <canvas id="skyline"></canvas>
    <div id="chip-container"></div>
    <div class="hero">
      <h1>KardChips</h1>
      <p>Play Bold. Win Big. Infinite Reach.</p>
      <div class="actions">
        <button class="neon-btn" id="signin-btn">Sign In</button>
        <button class="neon-outline-btn">Explore Games</button>
      </div>
    </div>
  `;

  const skylineCanvas = document.getElementById("skyline");

  function resizeSkyline() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    skylineCanvas.width = width;
    skylineCanvas.height = height;
    skylineCanvas.style.width = `${width}px`;
    skylineCanvas.style.height = `${height}px`;

    CitySkyline(skylineCanvas);
  }

  window.addEventListener("resize", resizeSkyline);

  resizeSkyline();
  renderChipFall();

  setTimeout(() => {
    const btn = document.getElementById("signin-btn");
    if (btn) {
      btn.addEventListener("click", () => {
        window.location.hash = "#login";
      });
    }
  }, 0);
}
