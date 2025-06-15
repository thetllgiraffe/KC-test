import "./style.css";

document.querySelector("#app").innerHTML = `
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
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00f0ff";
  ctx.shadowColor = "#00f0ff";
  ctx.shadowBlur = 8;
  for (let star of stars) {
    let k = 128.0 / star.z;
    let x = star.x * k + canvas.width / 2;
    let y = star.y * k + canvas.height / 2;
    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue;
    let size = (1 - star.z / canvas.width) * 2;
    ctx.fillRect(x, y, size, size);
  }
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
});
