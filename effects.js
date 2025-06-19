/**
 * Effects Module for Inklings Art Studio Pro
 */

class Effects {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.animationId = null;
    this.particles = [];
    console.log('Effects module initialized');
  }
  
  startAnimation(effect = 'glitter') {
    // Stop any existing animation
    this.stopAnimation();
    
    // Create initial particles
    this.createParticles(effect);
    
    // Start animation loop
    this.animate();
    
    console.log(`${effect} effect animation started`);
  }
  
  stopAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.particles = [];
  }
  
  createParticles(effect, count = 50) {
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 5 + 1,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 - 1.5,
        color: this.getParticleColor(effect),
        opacity: Math.random() * 0.5 + 0.5
      });
    }
  }
  
  getParticleColor(effect) {
    switch (effect) {
      case 'glitter':
        return `hsl(${Math.random() * 60 + 40}, 100%, 50%)`;
      case 'neon':
        return `hsl(${Math.random() * 60 + 180}, 100%, 50%)`;
      case 'rainbow':
        return `hsl(${Math.random() * 360}, 100%, 50%)`;
      case 'fire':
        return `hsl(${Math.random() * 60}, 100%, 50%)`;
      case 'ice':
        return `hsl(${Math.random() * 60 + 180}, 80%, 70%)`;
      default:
        return `hsl(${Math.random() * 360}, 100%, 50%)`;
    }
  }
  
  animate() {
    // Clear previous frame
    const ctx = this.ctx;
    
    // Update and draw particles
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > this.canvas.width) {
        particle.speedX *= -1;
      }
      if (particle.y < 0 || particle.y > this.canvas.height) {
        particle.speedY *= -1;
      }
      
      // Draw particle
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    
    // Continue animation
    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

// Export for use in other modules
window.Effects = Effects;
