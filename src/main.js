import "./style.css";
import { citySkyline } from "./components/citySkyline.js";

document.querySelector("#app").innerHTML = `
  <canvas id="starfield"></canvas>  
  <canvas id="skyline"></canvas>
  
  <div class="hero">
    <h1>KardChips</h1>
    <p>Play Bold. Win Big. Infinite Reach.</p>
    <div class="actions">
      <button class="neon-btn">Sign In</button>
      <button class="neon-outline-btn">Explore Games</button>
    </div>
  </div>
`;

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

const skylineCanvas = document.getElementById("skyline");

function resizeCanvas() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  skylineCanvas.width = width;
  skylineCanvas.height = height;
  skylineCanvas.style.width = `${width}px`;
  skylineCanvas.style.height = `${height}px`;

  createStars();
  citySkyline(skylineCanvas);
}

let stars = [];

function createStars() {
  const width = canvas.width;
  const height = canvas.height;
  stars = [];

  for (let i = 0; i < 250; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * width,
    });
  }
}

function drawStars() {
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
  bgGradient.addColorStop(0, "rgba(0, 240, 255, 0.06)");
  bgGradient.addColorStop(0.48, "rgba(0, 0, 0, 1)");
  bgGradient.addColorStop(0.52, "rgba(0, 0, 0, 1)");
  bgGradient.addColorStop(1, "rgba(0, 240, 255, 0.04)");

  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#00f0ff";
  ctx.shadowColor = "#00f0ff";
  ctx.shadowBlur = 8;

  for (let star of stars) {
    const k = 128.0 / star.z;
    const x = star.x * k;
    const y = star.y * k;
    if (x < 0 || x >= width || y < 0 || y >= height) continue;
    const size = (1 - star.z / width) * 2;
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

window.addEventListener("resize", () => {
  resizeCanvas();
});

resizeCanvas();
animate();
