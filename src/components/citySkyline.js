export function citySkyline(canvas) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  const skylineHeight = height * 0.3;
  const buildings = [];

  for (let i = 0; i < 40; i++) {
    buildings.push({
      x: i * (width / 40),
      w: 10 + Math.random() * 20,
      h: skylineHeight * (0.3 + Math.random() * 0.7),
    });
  }

  let gradientShift = 0;

  function drawSkyline() {
    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(0, 0, width, skylineHeight);
    gradient.addColorStop(0, "#00f0ff44");
    gradient.addColorStop(0.5 + 0.2 * Math.sin(gradientShift), "#ff00ff22");
    gradient.addColorStop(1, "#00ff8855");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, skylineHeight);

    ctx.fillStyle = "#050f1c";
    for (let b of buildings) {
      ctx.fillRect(b.x, height - b.h, b.w, b.h);
    }

    for (let b of buildings) {
      const lightCount = Math.floor(b.h / 10);
      for (let i = 0; i < lightCount; i++) {
        if (Math.random() > 0.85) {
          ctx.fillStyle = "#00f0ff";
          ctx.fillRect(b.x + b.w / 3, height - b.h + i * 10, 2, 2);
        }
      }
    }

    gradientShift += 0.02;
    requestAnimationFrame(drawSkyline);
  }

  drawSkyline();
}
