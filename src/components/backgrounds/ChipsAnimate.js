import Matter from "matter-js";
import purple from "/chips/purple.png";
import green from "/chips/green.png";
import yellow from "/chips/yellow.png";
import brown from "/chips/brown.png";
import gray from "/chips/gray.png";

const chipImages = [purple, green, yellow, brown, gray];

export function renderChipFall() {
  const canvas = document.createElement("canvas");
  canvas.className = "chip-canvas";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Runner = Matter.Runner,
    Body = Matter.Body;

  const engine = Engine.create();
  const runner = Runner.create();
  const world = engine.world;
  world.gravity.y = 0.9;

  const chips = [];
  const coveredColumns = new Set();
  const chipSize = 300;

  const ground = Bodies.rectangle(
    canvas.width / 2,
    canvas.height * 0.75 + 50,
    canvas.width,
    100,
    { isStatic: true }
  );

  World.add(world, [ground]);

  function createChip() {
    const x = Math.random() * canvas.width;
    const img = new Image();
    img.src = chipImages[Math.floor(Math.random() * chipImages.length)];

    const restitution = 0.4 + Math.random() * 0.4;

    const body = Bodies.circle(x, -100, chipSize / 2, {
      restitution,
      friction: 0.2,
      render: { visible: false },
    });

    body.img = img;
    body.size = chipSize;
    body.trail = [];
    chips.push(body);
    World.add(world, body);
  }

  function renderChips() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let chip of chips) {
      chip.trail.push({ x: chip.position.x, y: chip.position.y, alpha: 1 });
      if (chip.trail.length > 10) chip.trail.shift();

      for (let t of chip.trail) {
        ctx.beginPath();
        ctx.arc(t.x, t.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(0, 240, 255, ${t.alpha})`;
        ctx.fill();
        t.alpha *= 0.8;
      }

      ctx.save();
      ctx.translate(chip.position.x, chip.position.y);
      ctx.rotate(chip.angle);
      ctx.drawImage(
        chip.img,
        -chip.size / 2,
        -chip.size / 2,
        chip.size,
        chip.size
      );
      ctx.restore();

      const col = Math.floor(chip.position.x / 50);
      if (chip.position.y >= canvas.height * 0.75 - 10) {
        coveredColumns.add(col);
      }
    }

    if (coveredColumns.size >= canvas.width / 50) {
      chips.length = 0;
      coveredColumns.clear();
      World.clear(world, false);
      World.add(world, ground);
    }
  }

  function loop() {
    Engine.update(engine, 1000 / 60);
    renderChips();
    requestAnimationFrame(loop);
  }

  Runner.run(runner, engine);
  loop();

  setInterval(() => {
    createChip();
  }, 500);

  const hero = document.querySelector(".hero h1");
  if (hero) {
    hero.addEventListener("mouseenter", () => {
      for (let i = 0; i < 5; i++) {
        createChip();
      }
    });
  }
}
