const techImages = [
  "/tech_grid.png",
  "/tech_grid2.png",
  "/tech_grid3.png",
  "/tech_grid4.png",
];

let current = 0;
let hue = 0;

export function flickerSwitch() {
  const bg = document.querySelector(".tech-bg");

  if (!bg) return;

  const flickers = Math.floor(Math.random() * 2) + 1;
  let count = 0;

  function doFlicker() {
    if (count < flickers) {
      bg.style.opacity = "0.3";
      setTimeout(() => {
        bg.style.opacity = "1";
        count++;
        setTimeout(doFlicker, Math.random() * 60 + 30);
      }, Math.random() * 60 + 30);
    } else {
      current = (current + 1) % techImages.length;
      bg.src = techImages[current];

      hue = (hue + Math.floor(Math.random() * 50) + 30) % 360;
      bg.style.filter = `hue-rotate(${hue}deg)`;

      const delay = Math.random() * 4000 + 3000;
      setTimeout(flickerSwitch, delay);
    }
  }

  doFlicker();
}

setTimeout(flickerSwitch, 5000);
