// Magical Effects for ArtStudio Teen

class Effects {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.sparkles = [];
    this.trails = [];
    this.animationId = null;
    this.isAnimating = false;
  }

  // Particle system for magical effects
  createParticle(x, y, options = {}) {
    const particle = {
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * (options.speed || 4),
      vy: (Math.random() - 0.5) * (options.speed || 4),
      life: options.life || 1.0,
      maxLife: options.life || 1.0,
      size: options.size || Utils.randomBetween(2, 6),
      color: options.color || Utils.getRandomColor(),
      gravity: options.gravity || 0.1,
      friction: options.friction || 0.98,
      type: options.type || 'circle'
    };
    
    this.particles.push(particle);
  }

  // Sparkle effect
  createSparkle(x, y, options = {}) {
    const sparkle = {
      x: x,
      y: y,
      size: options.size || Utils.randomBetween(3, 8),
      life: options.life || 1.0,
      maxLife: options.life || 1.0,
      color: options.color || '#ffd700',
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      twinkle: Math.random() * Math.PI * 2
    };
    
    this.sparkles.push(sparkle);
  }

  // Rainbow brush effect
  rainbowBrush(x, y, size, pressure = 1) {
    const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
    const segments = 7;
    
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const offsetX = Math.cos(angle) * size * 0.3;
      const offsetY = Math.sin(angle) * size * 0.3;
      
      this.ctx.save();
      this.ctx.globalAlpha = 0.7 * pressure;
      this.ctx.fillStyle = colors[i];
      this.ctx.beginPath();
      this.ctx.arc(x + offsetX, y + offsetY, size * 0.4, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
    
    // Add sparkles
    if (Math.random() < 0.3) {
      this.createSparkle(x + Utils.randomBetween(-size, size), 
                        y + Utils.randomBetween(-size, size));
    }
  }

  // Glitter brush effect
  glitterBrush(x, y, size, color, pressure = 1) {
    // Main brush stroke
    this.ctx.save();
    this.ctx.globalAlpha = 0.6 * pressure;
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, size, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
    
    // Add glitter particles
    const particleCount = Math.floor(size * 0.3 * pressure);
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * size;
      const px = x + Math.cos(angle) * distance;
      const py = y + Math.sin(angle) * distance;
      
      this.createParticle(px, py, {
        size: Utils.randomBetween(1, 3),
        color: '#ffd700',
        speed: 2,
        life: 0.8,
        gravity: -0.05
      });
    }
  }

  // Neon glow effect
  neonGlow(x, y, size, color, pressure = 1) {
    const glowSize = size * 3;
    
    // Outer glow
    this.ctx.save();
    this.ctx.shadowColor = color;
    this.ctx.shadowBlur = glowSize;
    this.ctx.globalAlpha = 0.3 * pressure;
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, size, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
    
    // Inner bright core
    this.ctx.save();
    this.ctx.globalAlpha = 0.8 * pressure;
    this.ctx.fillStyle = '#ffffff';
    this.ctx.beginPath();
    this.ctx.arc(x, y, size * 0.3, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }

  // Watercolor effect
  watercolor(x, y, size, color, pressure = 1) {
    const layers = 5;
    const baseAlpha = 0.1 * pressure;
    
    for (let i = 0; i < layers; i++) {
      const layerSize = size * (1 + i * 0.2);
      const offsetX = (Math.random() - 0.5) * size * 0.5;
      const offsetY = (Math.random() - 0.5) * size * 0.5;
      
      this.ctx.save();
      this.ctx.globalAlpha = baseAlpha / (i + 1);
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.arc(x + offsetX, y + offsetY, layerSize, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  // Bubble effect
  bubbleBrush(x, y, size, color, pressure = 1) {
    const bubbleCount = Math.floor(size * 0.2 * pressure);
    
    for (let i = 0; i < bubbleCount; i++) {
      const bubbleSize = Utils.randomBetween(size * 0.2, size * 0.8);
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * size;
      const bx = x + Math.cos(angle) * distance;
      const by = y + Math.sin(angle) * distance;
      
      // Bubble body
      this.ctx.save();
      this.ctx.globalAlpha = 0.3;
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.arc(bx, by, bubbleSize, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Bubble highlight
      this.ctx.globalAlpha = 0.6;
      this.ctx.fillStyle = '#ffffff';
      this.ctx.beginPath();
      this.ctx.arc(bx - bubbleSize * 0.3, by - bubbleSize * 0.3, bubbleSize * 0.2, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  // Star brush effect
  starBrush(x, y, size, color, pressure = 1) {
    const starCount = Math.floor(3 + size * 0.1 * pressure);
    
    for (let i = 0; i < starCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * size;
      const sx = x + Math.cos(angle) * distance;
      const sy = y + Math.sin(angle) * distance;
      const starSize = Utils.randomBetween(size * 0.2, size * 0.6);
      
      this.drawStar(sx, sy, starSize, color, 0.7 * pressure);
    }
  }

  // Draw a star shape
  drawStar(x, y, size, color, alpha = 1) {
    this.ctx.save();
    this.ctx.globalAlpha = alpha;
    this.ctx.fillStyle = color;
    this.ctx.translate(x, y);
    this.ctx.rotate(Math.random() * Math.PI * 2);
    
    this.ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5;
      const radius = i % 2 === 0 ? size : size * 0.4;
      const px = Math.cos(angle) * radius;
      const py = Math.sin(angle) * radius;
      
      if (i === 0) {
        this.ctx.moveTo(px, py);
      } else {
        this.ctx.lineTo(px, py);
      }
    }
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  }

  // Heart brush effect
  heartBrush(x, y, size, color, pressure = 1) {
    const heartCount = Math.floor(2 + size * 0.05 * pressure);
    
    for (let i = 0; i < heartCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * size;
      const hx = x + Math.cos(angle) * distance;
      const hy = y + Math.sin(angle) * distance;
      const heartSize = Utils.randomBetween(size * 0.3, size * 0.8);
      
      this.drawHeart(hx, hy, heartSize, color, 0.6 * pressure);
    }
  }

  // Draw a heart shape
  drawHeart(x, y, size, color, alpha = 1) {
    this.ctx.save();
    this.ctx.globalAlpha = alpha;
    this.ctx.fillStyle = color;
    this.ctx.translate(x, y);
    this.ctx.scale(size / 20, size / 20);
    
    this.ctx.beginPath();
    this.ctx.moveTo(0, 5);
    this.ctx.bezierCurveTo(-10, -5, -20, 0, -10, 15);
    this.ctx.bezierCurveTo(-5, 20, 0, 15, 0, 5);
    this.ctx.bezierCurveTo(0, 15, 5, 20, 10, 15);
    this.ctx.bezierCurveTo(20, 0, 10, -5, 0, 5);
    this.ctx.fill();
    this.ctx.restore();
  }

  // Confetti effect
  confettiBrush(x, y, size, pressure = 1) {
    const confettiCount = Math.floor(size * 0.3 * pressure);
    const colors = Utils.getTeenColors();
    
    for (let i = 0; i < confettiCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * size;
      const cx = x + Math.cos(angle) * distance;
      const cy = y + Math.sin(angle) * distance;
      
      this.createParticle(cx, cy, {
        size: Utils.randomBetween(2, 6),
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 3,
        life: 1.2,
        gravity: 0.05,
        type: 'confetti'
      });
    }
  }

  // Lightning effect
  lightning(startX, startY, endX, endY, color = '#00ffff') {
    const segments = 10;
    const points = [];
    
    // Generate lightning path
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = Utils.lerp(startX, endX, t) + (Math.random() - 0.5) * 20;
      const y = Utils.lerp(startY, endY, t) + (Math.random() - 0.5) * 20;
      points.push({ x, y });
    }
    
    // Draw lightning bolt
    this.ctx.save();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 3;
    this.ctx.shadowColor = color;
    this.ctx.shadowBlur = 10;
    this.ctx.lineCap = 'round';
    
    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(points[i].x, points[i].y);
    }
    this.ctx.stroke();
    this.ctx.restore();
    
    // Add electric sparkles
    points.forEach(point => {
      if (Math.random() < 0.3) {
        this.createSparkle(point.x, point.y, { color: color, size: 4 });
      }
    });
  }

  // Fireworks effect
  firework(x, y, color) {
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const speed = Utils.randomBetween(3, 8);
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      
      this.createParticle(x, y, {
        vx: vx,
        vy: vy,
        size: Utils.randomBetween(2, 5),
        color: color,
        life: 1.5,
        gravity: 0.1,
        friction: 0.95
      });
    }
  }

  // Smoke effect
  smoke(x, y, size = 20) {
    const smokeCount = 5;
    
    for (let i = 0; i < smokeCount; i++) {
      this.createParticle(x + Utils.randomBetween(-10, 10), y, {
        vx: Utils.randomBetween(-1, 1),
        vy: Utils.randomBetween(-3, -1),
        size: Utils.randomBetween(size * 0.5, size),
        color: `rgba(128, 128, 128, ${Utils.randomBetween(0.1, 0.3)})`,
        life: 2.0,
        gravity: -0.02,
        friction: 0.99
      });
    }
  }

  // Update and render particles
  updateParticles() {
    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      
      // Update physics
      particle.vy += particle.gravity;
      particle.vx *= particle.friction;
      particle.vy *= particle.friction;
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 1 / 60; // Assuming 60 FPS
      
      // Remove dead particles
      if (particle.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }
      
      // Render particle
      this.ctx.save();
      this.ctx.globalAlpha = particle.life / particle.maxLife;
      
      if (particle.type === 'confetti') {
        this.ctx.fillStyle = particle.color;
        this.ctx.fillRect(particle.x - particle.size/2, particle.y - particle.size/2, 
                         particle.size, particle.size * 0.6);
      } else {
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
      }
      
      this.ctx.restore();
    }
    
    // Update sparkles
    for (let i = this.sparkles.length - 1; i >= 0; i--) {
      const sparkle = this.sparkles[i];
      sparkle.life -= 1 / 60;
      sparkle.rotation += sparkle.rotationSpeed;
      sparkle.twinkle += 0.2;
      
      if (sparkle.life <= 0) {
        this.sparkles.splice(i, 1);
        continue;
      }
      
      // Render sparkle
      this.ctx.save();
      this.ctx.globalAlpha = (sparkle.life / sparkle.maxLife) * (0.5 + 0.5 * Math.sin(sparkle.twinkle));
      this.ctx.fillStyle = sparkle.color;
      this.ctx.translate(sparkle.x, sparkle.y);
      this.ctx.rotate(sparkle.rotation);
      
      // Draw sparkle as a star
      this.ctx.beginPath();
      for (let j = 0; j < 4; j++) {
        const angle = (j * Math.PI) / 2;
        const x = Math.cos(angle) * sparkle.size;
        const y = Math.sin(angle) * sparkle.size;
        if (j === 0) this.ctx.moveTo(x, y);
        else this.ctx.lineTo(x, y);
      }
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  // Start animation loop
  startAnimation() {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    const animate = () => {
      if (!this.isAnimating) return;
      
      this.updateParticles();
      
      if (this.particles.length > 0 || this.sparkles.length > 0) {
        this.animationId = requestAnimationFrame(animate);
      } else {
        this.isAnimating = false;
      }
    };
    
    animate();
  }

  // Stop animation
  stopAnimation() {
    this.isAnimating = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  // Clear all effects
  clearEffects() {
    this.particles = [];
    this.sparkles = [];
    this.trails = [];
    this.stopAnimation();
  }

  // Apply filter effects
  applyFilter(filterType) {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    
    switch (filterType) {
      case 'vintage':
        this.applyVintageFilter(data);
        break;
      case 'dreamy':
        this.applyDreamyFilter(data);
        break;
      case 'neon':
        this.applyNeonFilter(data);
        break;
      case 'pastel':
        this.applyPastelFilter(data);
        break;
      case 'polaroid':
        this.applyPolaroidFilter(data);
        break;
    }
    
    this.ctx.putImageData(imageData, 0, 0);
  }

  // Filter implementations
  applyVintageFilter(data) {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      data[i] = Math.min(255, r * 1.2 + 30);     // Red boost
      data[i + 1] = Math.min(255, g * 1.1 + 20); // Green boost
      data[i + 2] = Math.max(0, b * 0.8 - 10);   // Blue reduction
    }
  }

  applyDreamyFilter(data) {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      data[i] = Math.min(255, r * 1.1 + 20);
      data[i + 1] = Math.min(255, g * 1.05 + 15);
      data[i + 2] = Math.min(255, b * 1.15 + 25);
    }
  }

  applyNeonFilter(data) {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      const brightness = (r + g + b) / 3;
      if (brightness > 128) {
        data[i] = Math.min(255, r * 1.5);
        data[i + 1] = Math.min(255, g * 1.5);
        data[i + 2] = Math.min(255, b * 1.5);
      }
    }
  }

  applyPastelFilter(data) {
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, data[i] * 0.8 + 50);     // Soften red
      data[i + 1] = Math.min(255, data[i + 1] * 0.8 + 50); // Soften green
      data[i + 2] = Math.min(255, data[i + 2] * 0.8 + 50); // Soften blue
    }
  }

  applyPolaroidFilter(data) {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      data[i] = Math.min(255, r * 1.1 + 10);
      data[i + 1] = Math.min(255, g * 1.0 + 5);
      data[i + 2] = Math.min(255, b * 0.9 + 15);
    }
  }

  // Background effects
  addBackgroundEffect(effectType) {
    switch (effectType) {
      case 'stars':
        this.addStarField();
        break;
      case 'hearts':
        this.addHeartField();
        break;
      case 'sparkles':
        this.addSparkleField();
        break;
      case 'bubbles':
        this.addBubbleField();
        break;
    }
  }

  addStarField() {
    const starCount = 50;
    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      const size = Utils.randomBetween(2, 8);
      const color = Utils.getRandomColor();
      this.drawStar(x, y, size, color, 0.3);
    }
  }

  addHeartField() {
    const heartCount = 30;
    for (let i = 0; i < heartCount; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      const size = Utils.randomBetween(5, 15);
      const color = Utils.getRandomColor();
      this.drawHeart(x, y, size, color, 0.2);
    }
  }

  addSparkleField() {
    const sparkleCount = 100;
    for (let i = 0; i < sparkleCount; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      this.createSparkle(x, y, { 
        life: 2.0,
        size: Utils.randomBetween(2, 6)
      });
    }
    this.startAnimation();
  }

  addBubbleField() {
    const bubbleCount = 40;
    for (let i = 0; i < bubbleCount; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      const size = Utils.randomBetween(10, 30);
      const color = Utils.getRandomColor();
      this.bubbleBrush(x, y, size, color, 0.3);
    }
  }
}

// Export for use in other modules
window.Effects = Effects;
