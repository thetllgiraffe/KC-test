import "../style.css";
import { CitySkyline } from "./backgrounds/CitySkyline.js";
import { renderChipFall, destroyChipFall } from "./backgrounds/ChipsAnimate.js";

export function renderLanding() {
  document.querySelector("#app").innerHTML = `
    <canvas id="skyline"></canvas>
    <div class="hero">
      <h1>KardChips</h1>
      <p>Play Bold. Win Big. Infinite Reach.</p>
      <div class="actions">
        <button class="neon-outline-btn" id="signin-btn">Sign In</button>
        <button class="neon-outline-btn">Explore Chips</button>
      </div>
    </div>
  `;

  renderChipFall();

  const skylineCanvas = document.getElementById("skyline");

  function resizeSkyline() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    skylineCanvas.width = width;
    skylineCanvas.height = height;
    CitySkyline(skylineCanvas);
  }

  window.addEventListener("resize", resizeSkyline);
  resizeSkyline();

  setTimeout(() => {
    const btn = document.getElementById("signin-btn");
    if (btn) {
      btn.addEventListener("click", () => {
        destroyChipFall();
        window.location.hash = "#login";
      });
    }
  }, 0);
}
