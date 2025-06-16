import "./style.css";
import { citySkyline } from "./components/citySkyline.js";

document.querySelector("#app").innerHTML = `
  <canvas id="skyline"></canvas>
  <canvas id="starfield"></canvas>
  <div class="hero">
    <h1>KardChips</h1>
    <p>Play Bold. Win Big. Infinite Reach.</p>
    <div class="actions">
      <button class="neon-btn">Sign In</button>
      <button class="neon-outline-btn">Explore Games</button>
    </div>
  </div>
`;

const skylineCanvas = document.getElementById("skyline");
skylineCanvas.width = window.innerWidth;
skylineCanvas.height = window.innerHeight;
citySkyline(skylineCanvas);

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 250; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random() * canvas.width,
  });
}

function drawStars() {
  const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bgGradient.addColorStop(0, "rgba(0, 240, 255, 0.05)");
  bgGradient.addColorStop(0.45, "rgba(0, 0, 0, 1)");
  bgGradient.addColorStop(0.55, "rgba(0, 0, 0, 1)");
  bgGradient.addColorStop(1, "rgba(0, 240, 255, 0.03)");

  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00f0ff";
  ctx.shadowColor = "#00f0ff";
  ctx.shadowBlur = 8;

  for (let star of stars) {
    let k = 128.0 / star.z;
    let x = star.x * k;
    let y = star.y * k;
    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue;
    let size = (1 - star.z / canvas.width) * 2;
    ctx.fillRect(x, y, size, size);
  }

  ctx.shadowBlur = 0;
}

function moveStars() {
  for (let star of stars) {
    star.z -= 1;
    if (star.z <= 0) {
      star.x = Math.random() * canvas.width;
      star.y = Math.random() * canvas.height;
      star.z = canvas.width;
    }
  }
}

function animate() {
  drawStars();
  moveStars();
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  skylineCanvas.width = window.innerWidth;
  skylineCanvas.height = window.innerHeight;
});
