(function() {
  const canvas = document.getElementById('effectCanvas');
  if (!canvas) return;

  const section = canvas.parentElement;
  const ctx = canvas.getContext('2d');
  const hearts = [];

  function resize() {
    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;
  }

  function createHeart() {
    hearts.push({
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      size: Math.random() * 20 + 75,
      speed: Math.random() * 1.5 + 0.4,
      alpha: 1.2,
    });
  }

  function drawHeart(x, y, size, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 20, size / 20);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-10, -10, -20, 10, 0, 20);
    ctx.bezierCurveTo(20, 10, 10, -10, 0, 0);
    ctx.fillStyle = `rgba(231, 131, 119, ${alpha})`;
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hearts.forEach((h, i) => {
      h.y -= h.speed;
      h.alpha -= 0.003;
      drawHeart(h.x, h.y, h.size, h.alpha);

      if (h.alpha <= 0) {
        hearts.splice(i, 1);
      }
    });

    if (Math.random() < 0.02) {
      createHeart();
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  resize();
  animate();
})();
