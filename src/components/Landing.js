import "../style.css";
import { CitySkyline } from "./backgrounds/CitySkyline.js";
import { renderChipFall, destroyChipFall } from "./backgrounds/ChipsAnimate.js";
import { renderHeader, setupHeaderEvents } from "./Header.js";

export function renderLanding() {
  document.querySelector("#app").innerHTML = `
  ${renderHeader()}
    <canvas id="skyline"></canvas>
    <div class="hero">
      <h1>KardChips</h1>
      <p>Play Bold. Win Big. Infinite Reach.</p>
      <div class="actions">
        <button class="neon-outline-btn" id="signin-btn">Sign In</button>
        <button class="neon-outline-btn" id="explore-chips-btn">Explore Chips</button>
      </div>
    </div>
  `;

  renderChipFall();

  const skylineCanvas = document.getElementById("skyline");

  function ResizeSkyline() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    skylineCanvas.width = width;
    skylineCanvas.height = height;
    CitySkyline(skylineCanvas);
  }

  window.addEventListener("resize", ResizeSkyline);
  resizeSkyline();

  setTimeout(() => {
    const signinBtn = document.getElementById("signin-btn");
    if (signinBtn) {
      signinBtn.addEventListener("click", () => {
        destroyChipFall();
        window.location.hash = "#login";
      });
    }

    const exploreBtn = document.getElementById("explore-chips-btn");
    if (exploreBtn) {
      exploreBtn.addEventListener("click", () => {
        destroyChipFall();
        window.location.hash = "#chipdisplay";
        handleRouting();
      });
    }
  }, 0);
}
