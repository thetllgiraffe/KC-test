import Matter from "matter-js";
import purple from "/chips/purple.png";
import green from "/chips/green.png";
import yellow from "/chips/yellow.png";
import brown from "/chips/brown.png";
import gray from "/chips/gray.png";
import pink from "/chips/pink.png";
import custom from "/chips/custom.png";

const chipImages = [purple, green, yellow, brown, gray, pink, custom];

let engine,
  runner,
  canvas,
  chips = [];

export function renderChipFall() {
  canvas = document.createElement("canvas");
  canvas.className = "chip-canvas";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Runner = Matter.Runner;

  engine = Engine.create();
  runner = Runner.create();
  const world = engine.world;
  world.gravity.y = 1.2;

  const ground = Bodies.rectangle(
    canvas.width / 2,
    canvas.height * 0.75 + 60,
    canvas.width,
    120,
    { isStatic: true }
  );
  World.add(world, ground);

  function createChip() {
    const size = 300;
    const x = Math.random() * canvas.width;
    const img = new Image();
    img.src = chipImages[Math.floor(Math.random() * chipImages.length)];

    const body = Bodies.circle(x, -100, size / 2, {
      restitution: Math.random() * 0.6 + 0.2,
      friction: 0.5,
    });

    body.img = img;
    body.size = size;
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
        ctx.arc(t.x, t.y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(0, 240, 255, ${t.alpha})`;
        ctx.fill();
        t.alpha *= 0.8;
      }

      const { x, y } = chip.position;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(chip.angle);
      ctx.drawImage(
        chip.img,
        -chip.size / 2,
        -chip.size / 2,
        chip.size,
        chip.size
      );
      ctx.restore();
    }
  }

  function loop() {
    Matter.Engine.update(engine, 1000 / 60);
    renderChips();
    requestAnimationFrame(loop);
  }

  Matter.Runner.run(runner, engine);
  loop();

  for (let i = 0; i < 12; i++) {
    setTimeout(createChip, i * 250);
  }

  const hero = document.querySelector(".hero h1");
  if (hero) {
    hero.addEventListener("mouseenter", () => {
      for (let i = 0; i < 6; i++) {
        createChip();
      }
    });
  }
}

export function destroyChipFall() {
  if (runner) {
    Matter.Runner.stop(runner);
    runner = null;
  }

  if (engine) {
    Matter.World.clear(engine.world, false);
    Matter.Engine.clear(engine);
    engine = null;
  }

  const canvas = document.querySelector(".chip-canvas");
  if (canvas && canvas.parentNode) {
    canvas.parentNode.removeChild(canvas);
  }

  chips.length = 0;
}
