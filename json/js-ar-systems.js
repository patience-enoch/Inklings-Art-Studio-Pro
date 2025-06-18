
// AR Stencils System for Inklings Art Studio Pro

class ARStencils {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.video = null;
    this.stream = null;
    this.isActive = false;
    this.currentStencil = null;
    this.stencilOpacity = 0.7;
    this.stencilScale = 1.0;
    this.stencilPosition = { x: 0, y: 0 };
    this.templates = this.initializeTemplates();
    this.animationId = null;
    this.facingMode = 'user'; // 'user' for front camera, 'environment' for back camera
  }

  // Initialize AR stencil templates
  initializeTemplates() {
    return {
      // Portrait templates
      face: {
        name: 'Face Outline',
        category: 'portrait',
        icon: 'fas fa-user',
        description: 'Perfect face proportions guide',
        paths: [
          // Face outline (oval)
          'M 200 100 Q 300 100 350 200 Q 350 300 300 380 Q 250 420 200 420 Q 150 420 100 380 Q 50 300 50 200 Q 50 100 150 100 Q 175 100 200 100',
          // Eyes
          'M 130 180 Q 150 170 170 180 Q 150 190 130 180',
          'M 230 180 Q 250 170 270 180 Q 250 190 230 180',
          // Nose
          'M 200 200 L 195 230 Q 200 240 205 230 L 200 200',
          // Mouth
          'M 170 280 Q 200 300 230 280'
        ]
      },
      
      eyes: {
        name: 'Eye Guidelines',
        category: 'portrait',
        icon: 'fas fa-eye',
        description: 'Eye shape and positioning guide',
        paths: [
          // Left eye
          'M 120 180 Q 160 160 200 180 Q 160 200 120 180',
          // Right eye  
          'M 200 180 Q 240 160 280 180 Q 240 200 200 180',
          // Eyebrows
          'M 110 150 Q 160 140 210 150',
          'M 190 150 Q 240 140 290 150'
        ]
      },

      lips: {
        name: 'Lip Shape',
        category: 'portrait',
        icon: 'fas fa-kiss',
        description: 'Perfect lip proportions',
        paths: [
          // Upper lip
          'M 160 270 Q 180 260 200 265 Q 220 260 240 270',
          // Lower lip
          'M 160 270 Q 200 290 240 270',
          // Lip line
          'M 160 270 L 240 270'
        ]
      },

      // Body templates
      hands: {
        name: 'Hand Pose',
        category: 'body',
        icon: 'fas fa-hand-paper',
        description: 'Hand drawing reference',
        paths: [
          // Palm
          'M 150 200 Q 180 180 220 200 Q 240 240 220 280 Q 180 300 150 280 Q 130 240 150 200',
          // Fingers
          'M 160 180 L 160 120 Q 165 110 170 120 L 170 180',
          'M 180 170 L 180 100 Q 185 90 190 100 L 190 170',
          'M 200 175 L 200 105 Q 205 95 210 105 L 210 175',
          'M 220 180 L 220 130 Q 225 120 230 130 L 230 180',
          // Thumb
          'M 140 220 Q 120 200 110 220 Q 120 240 140 240'
        ]
      },

      pose: {
        name: 'Body Pose',
        category: 'body',
        icon: 'fas fa-male',
        description: 'Basic body proportions',
        paths: [
          // Head
          'M 200 50 Q 230 50 250 80 Q 250 110 230 130 Q 200 140 170 130 Q 150 110 150 80 Q 150 50 170 50 Q 185 50 200 50',
          // Torso
          'M 200 140 L 180 200 L 180 300 L 220 300 L 220 200 L 200 140',
          // Arms
          'M 180 160 L 120 200 L 110 250',
          'M 220 160 L 280 200 L 290 250',
          // Legs
          'M 180 300 L 160 400 L 150 500',
          'M 220 300 L 240 400 L 250 500'
        ]
      },

      // Animal templates
      cat: {
        name: 'Cat Face',
        category: 'animals',
        icon: 'fas fa-cat',
        description: 'Cute cat proportions',
        paths: [
          // Head
          'M 200 150 Q 280 120 320 180 Q 320 240 280 280 Q 200 300 120 280 Q 80 240 80 180 Q 80 120 120 150 Q 160 130 200 150',
          // Ears
          'M 140 120 L 120 60 L 180 80 L 140 120',
          'M 260 120 L 220 80 L 280 60 L 260 120',
          // Eyes
          'M 160 180 Q 180 160 200 180 Q 180 200 160 180',
          'M 200 180 Q 220 160 240 180 Q 220 200 200 180',
          // Nose
          'M 190 210 Q 200 200 210 210 Q 200 220 190 210',
          // Mouth
          'M 200 220 L 180 240 M 200 220 L 220 240',
          // Whiskers
          'M 120 200 L 80 190 M 120 210 L 80 210 M 120 220 L 80 230',
          'M 280 200 L 320 190 M 280 210 L 320 210 M 280 220 L 320 230'
        ]
      },

      dog: {
        name: 'Dog Face',
        category: 'animals',
        icon: 'fas fa-dog',
        description: 'Friendly dog proportions',
        paths: [
          // Head
          'M 200 120 Q 260 100 300 150 Q 320 200 300 250 Q 260 290 200 300 Q 140 290 100 250 Q 80 200 100 150 Q 140 100 200 120',
          // Ears (floppy)
          'M 120 140 Q 80 120 60 160 Q 70 200 100 180 L 120 140',
          'M 280 140 L 300 180 Q 330 200 340 160 Q 320 120 280 140',
          // Eyes
          'M 160 180 Q 180 170 200 180 Q 180 190 160 180',
          'M 200 180 Q 220 170 240 180 Q 220 190 200 180',
          // Nose
          'M 190 220 Q 200 210 210 220 Q 200 230 190 220',
          // Mouth
          'M 200 230 Q 180 250 160 240 M 200 230 Q 220 250 240 240',
          // Tongue
          'M 200 240 Q 210 260 200 280 Q 190 260 200 240'
        ]
      },

      // Fantasy templates
      unicorn: {
        name: 'Unicorn',
        category: 'fantasy',
        icon: 'fas fa-horse-head',
        description: 'Magical unicorn guide',
        paths: [
          // Head (horse-like)
          'M 200 120 Q 260 100 300 140 Q 320 180 310 220 Q 290 260 250 280 Q 200 290 150 280 Q 110 260 90 220 Q 80 180 100 140 Q 140 100 200 120',
          // Horn
          'M 200 100 L 190 40 Q 200 30 210 40 L 200 100',
          // Horn spiral
          'M 195 90 Q 205 80 195 70 Q 205 60 195 50',
          // Mane
          'M 150 110 Q 120 80 100 120 Q 130 100 150 110',
          'M 170 100 Q 140 70 120 110 Q 150 90 170 100',
          'M 250 110 Q 280 80 300 120 Q 270 100 250 110',
          'M 230 100 Q 260 70 280 110 Q 250 90 230 100',
          // Eyes
          'M 160 160 Q 180 150 200 160 Q 180 170 160 160',
          'M 200 160 Q 220 150 240 160 Q 220 170 200 160',
          // Nostrils
          'M 180 200 Q 185 195 190 200',
          'M 210 200 Q 215 195 220 200'
        ]
      },

      dragon: {
        name: 'Dragon Head',
        category: 'fantasy',
        icon: 'fas fa-dragon',
        description: 'Epic dragon proportions',
        paths: [
          // Head
          'M 200 100 Q 280 80 340 140 Q 360 200 340 260 Q 300 320 240 340 Q 180 350 120 320 Q 60 260 80 200 Q 100 140 160 100 Q 180 90 200 100',
          // Snout
          'M 300 200 Q 380 180 420 220 Q 400 260 360 240 Q 340 230 300 200',
          // Horns
          'M 160 90 L 140 40 Q 150 30 160 40 L 160 90',
          'M 240 90 L 260 40 Q 250 30 240 40 L 240 90',
          // Eyes
          'M 180 160 Q 200 140 220 160 Q 200 180 180 160',
          'M 220 160 Q 240 140 260 160 Q 240 180 220 160',
          // Nostrils
          'M 360 210 Q 370 205 380 210',
          'M 360 230 Q 370 225 380 230',
          // Scales
          'M 120 180 Q 140 170 160 180',
          'M 140 200 Q 160 190 180 200',
          'M 160 220 Q 180 210 200 220'
        ]
      },

      // Geometric templates
      mandala: {
        name: 'Mandala Base',
        category: 'geometric',
        icon: 'fas fa-dharmachakra',
        description: 'Sacred geometry guide',
        paths: [
          // Outer circle
          'M 400 200 Q 400 100 300 100 Q 200 100 100 200 Q 100 300 200 400 Q 300 400 400 300 Q 400 200 400 200',
          // Inner circles
          'M 350 200 Q 350 150 300 150 Q 250 150 200 200 Q 200 250 250 300 Q 300 300 350 250 Q 350 200 350 200',
          'M 300 200 Q 300 175 275 175 Q 250 175 225 200 Q 225 225 250 250 Q 275 250 300 225 Q 300 200 300 200',
          // Radial lines
          'M 200 100 L 200 300',
          'M 100 200 L 300 200',
          'M 141 141 L 259 259',
          'M 259 141 L 141 259'
        ]
      },

      flower: {
        name: 'Flower Pattern',
        category: 'nature',
        icon: 'fas fa-leaf',
        description: 'Beautiful flower guide',
        paths: [
          // Center
          'M 220 200 Q 220 180 200 180 Q 180 180 180 200 Q 180 220 200 220 Q 220 220 220 200',
          // Petals
          'M 200 180 Q 180 140 200 120 Q 220 140 200 180',
          'M 220 200 Q 260 180 280 200 Q 260 220 220 200',
          'M 200 220 Q 220 260 200 280 Q 180 260 200 220',
          'M 180 200 Q 140 220 120 200 Q 140 180 180 200',
          'M 214 186 Q 234 146 254 166 Q 234 186 214 186',
          'M 214 214 Q 234 254 254 234 Q 234 214 214 214',
          'M 186 214 Q 146 234 166 254 Q 186 234 186 214',
          'M 186 186 Q 166 146 146 166 Q 166 186 186 186'
        ]
      }
    };
  }

  // Initialize camera
  async initializeCamera() {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported');
      }

      const constraints = {
        video: {
          facingMode: this.facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      // Create video element
      this.video = document.createElement('video');
      this.video.srcObject = this.stream;
      this.video.autoplay = true;
      this.video.playsInline = true;
      this.video.muted = true;

      return new Promise((resolve, reject) => {
        this.video.onloadedmetadata = () => {
          this.video.play();
          resolve();
        };
        this.video.onerror = reject;
      });

    } catch (error) {
      console.error('Camera initialization failed:', error);
      Utils.showNotification('Camera access denied or not available', 'error');
      throw error;
    }
  }

  // Start AR mode
  async startAR() {
    try {
      if (this.isActive) return;

      await this.initializeCamera();
      this.isActive = true;
      this.startVideoLoop();
      
      Utils.showNotification('AR mode activated! 📱✨', 'success');
      Utils.announceToScreenReader('AR camera mode activated');
      
      return true;
    } catch (error) {
      Utils.handleError(error, 'AR Stencils');
      return false;
    }
  }

  // Stop AR mode
  stopAR() {
    if (!this.isActive) return;

    this.isActive = false;
    
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }

    if (this.video) {
      this.video.srcObject = null;
      this.video = null;
    }

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    Utils.showNotification('AR mode deactivated', 'info');
    Utils.announceToScreenReader('AR camera mode deactivated');
  }

  // Switch camera (front/back)
  async switchCamera() {
    if (!this.isActive) return;

    this.facingMode = this.facingMode === 'user' ? 'environment' : 'user';
    
    // Restart camera with new facing mode
    this.stopAR();
    await this.startAR();
    
    const cameraType = this.facingMode === 'user' ? 'front' : 'back';
    Utils.showNotification(`Switched to ${cameraType} camera`, 'info');
  }

  // Video rendering loop
  startVideoLoop() {
    const renderFrame = () => {
      if (!this.isActive || !this.video) return;

      // Draw video frame
      this.drawVideoFrame();
      
      // Draw stencil overlay
      if (this.currentStencil) {
        this.drawStencilOverlay();
      }

      this.animationId = requestAnimationFrame(renderFrame);
    };

    renderFrame();
  }

  // Draw video frame to canvas
  drawVideoFrame() {
    if (!this.video || this.video.readyState < 2) return;

    const canvasAspect = this.canvas.width / this.canvas.height;
    const videoAspect = this.video.videoWidth / this.video.videoHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasAspect > videoAspect) {
      // Canvas is wider than video
      drawHeight = this.canvas.height;
      drawWidth = drawHeight * videoAspect;
      offsetX = (this.canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      // Canvas is taller than video
      drawWidth = this.canvas.width;
      drawHeight = drawWidth / videoAspect;
      offsetX = 0;
      offsetY = (this.canvas.height - drawHeight) / 2;
    }

    // Clear canvas
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw video
    this.ctx.drawImage(this.video, offsetX, offsetY, drawWidth, drawHeight);
  }

  // Draw stencil overlay
  drawStencilOverlay() {
    if (!this.currentStencil) return;

    const template = this.templates[this.currentStencil];
    if (!template) return;

    this.ctx.save();
    
    // Apply transformations
    this.ctx.translate(this.stencilPosition.x, this.stencilPosition.y);
    this.ctx.scale(this.stencilScale, this.stencilScale);
    
    // Set stencil style
    this.ctx.strokeStyle = '#ff6b9d';
    this.ctx.lineWidth = 3;
    this.ctx.globalAlpha = this.stencilOpacity;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    
    // Add glow effect
    this.ctx.shadowColor = '#ff6b9d';
    this.ctx.shadowBlur = 10;

    // Draw each path
    template.paths.forEach(pathData => {
      this.drawSVGPath(pathData);
    });

    this.ctx.restore();
  }

  // Draw SVG path
  drawSVGPath(pathData) {
    const commands = this.parseSVGPath(pathData);
    
    this.ctx.beginPath();
    
    commands.forEach(cmd => {
      switch (cmd.type) {
        case 'M':
          this.ctx.moveTo(cmd.x, cmd.y);
          break;
        case 'L':
          this.ctx.lineTo(cmd.x, cmd.y);
          break;
        case 'Q':
          this.ctx.quadraticCurveTo(cmd.x1, cmd.y1, cmd.x, cmd.y);
          break;
        case 'C':
          this.ctx.bezierCurveTo(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
          break;
      }
    });
    
    this.ctx.stroke();
  }

  // Parse SVG path data
  parseSVGPath(pathData) {
    const commands = [];
    const tokens = pathData.match(/[MLQC]|[-+]?[0-9]*\.?[0-9]+/g);
    
    let i = 0;
    while (i < tokens.length) {
      const type = tokens[i];
      
      switch (type) {
        case 'M':
          commands.push({
            type: 'M',
            x: parseFloat(tokens[i + 1]),
            y: parseFloat(tokens[i + 2])
          });
          i += 3;
          break;
        case 'L':
          commands.push({
            type: 'L',
            x: parseFloat(tokens[i + 1]),
            y: parseFloat(tokens[i + 2])
          });
          i += 3;
          break;
        case 'Q':
          commands.push({
            type: 'Q',
            x1: parseFloat(tokens[i + 1]),
            y1: parseFloat(tokens[i + 2]),
            x: parseFloat(tokens[i + 3]),
            y: parseFloat(tokens[i + 4])
          });
          i += 5;
          break;
        case 'C':
          commands.push({
            type: 'C',
            x1: parseFloat(tokens[i + 1]),
            y1: parseFloat(tokens[i + 2]),
            x2: parseFloat(tokens[i + 3]),
            y2: parseFloat(tokens[i + 4]),
            x: parseFloat(tokens[i + 5]),
            y: parseFloat(tokens[i + 6])
          });
          i += 7;
          break;
        default:
          i++;
      }
    }
    
    return commands;
  }

  // Set active stencil
  setStencil(stencilKey) {
    if (this.templates[stencilKey]) {
      this.currentStencil = stencilKey;
      Utils.showNotification(`${this.templates[stencilKey].name} stencil activated`, 'success');
    }
  }

  // Clear stencil
  clearStencil() {
    this.currentStencil = null;
    Utils.showNotification('Stencil cleared', 'info');
  }

  // Adjust stencil properties
  setStencilOpacity(opacity) {
    this.stencilOpacity = Utils.clamp(opacity, 0.1, 1.0);
  }

  setStencilScale(scale) {
    this.stencilScale = Utils.clamp(scale, 0.5, 3.0);
  }

  setStencilPosition(x, y) {
    this.stencilPosition = { x, y };
  }

  // Get available templates by category
  getTemplatesByCategory(category) {
    return Object.keys(this.templates)
      .filter(key => this.templates[key].category === category)
      .map(key => ({
        key,
        ...this.templates[key]
      }));
  }

  // Get all categories
  getCategories() {
    const categories = [...new Set(Object.values(this.templates).map(t => t.category))];
    return categories.map(cat => ({
      key: cat,
      name: Utils.capitalize(cat),
      icon: this.getCategoryIcon(cat)
    }));
  }

  // Get category icon
  getCategoryIcon(category) {
    const icons = {
      portrait: 'fas fa-user',
      body: 'fas fa-male',
      animals: 'fas fa-paw',
      fantasy: 'fas fa-magic',
      geometric: 'fas fa-shapes',
      nature: 'fas fa-leaf'
    };
    return icons[category] || 'fas fa-image';
  }

  // Capture photo with stencil
  capturePhoto() {
    if (!this.isActive) {
      Utils.showNotification('AR mode not active', 'warning');
      return null;
    }

    // Create a new canvas for the photo
    const photoCanvas = document.createElement('canvas');
    photoCanvas.width = this.canvas.width;
    photoCanvas.height = this.canvas.height;
    const photoCtx = photoCanvas.getContext('2d');

    // Copy current frame
    photoCtx.drawImage(this.canvas, 0, 0);

    // Download the photo
    Utils.downloadCanvas(photoCanvas, `ar-stencil-${Date.now()}.png`);
    
    Utils.showNotification('Photo captured! 📸', 'success');
    return photoCanvas;
  }

  // Check camera support
  static isCameraSupported() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  // Get available cameras
  async getAvailableCameras() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.filter(device => device.kind === 'videoinput');
    } catch (error) {
      console.error('Failed to get cameras:', error);
      return [];
    }
  }

  // Handle touch/mouse events for stencil positioning
  handlePointerStart(e) {
    if (!this.currentStencil) return;
    
    const pos = Utils.getMousePos(this.canvas, e);
    this.isDragging = true;
    this.dragOffset = {
      x: pos.x - this.stencilPosition.x,
      y: pos.y - this.stencilPosition.y
    };
  }

  handlePointerMove(e) {
    if (!this.isDragging || !this.currentStencil) return;
    
    const pos = Utils.getMousePos(this.canvas, e);
    this.setStencilPosition(
      pos.x - this.dragOffset.x,
      pos.y - this.dragOffset.y
    );
  }

  handlePointerEnd() {
    this.isDragging = false;
  }

  // Handle pinch-to-zoom for stencil scaling
  handlePinch(scale) {
    if (!this.currentStencil) return;
    this.setStencilScale(this.stencilScale * scale);
  }

  // Cleanup
  destroy() {
    this.stopAR();
    this.templates = null;
  }
}

// Export for use in other modules
window.AR
