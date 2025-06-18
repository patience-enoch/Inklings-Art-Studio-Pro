
/**
 * Main Application for Inklings Art Studio Pro
 */

class InklingsArtStudioApp {
  constructor() {
    this.canvas = document.getElementById('backgroundCanvas');
    this.ctx = this.canvas.getContext('2d');

    // Initialize state
    this.currentTool = 'brush';
    this.currentMode = 'draw';
    this.isDrawing = false;
    this.lastX = 0;
    this.lastY = 0;
    this.undoStack = [];
    this.redoStack = [];
    this.maxUndoSteps = 20;

    // Settings
    this.settings = {
      brushSize: 10,
      brushOpacity: 100,
      brushHardness: 100,
      brushColor: '#ff6b9d',
      brushType: 'round',
      canvasWidth: this.canvas.width,
      canvasHeight: this.canvas.height,
      backgroundColor: '#ffffff',
      gridEnabled: false,
      autoSave: true
    };

    // Initialize modules
    this.effects = new Effects(this.canvas);
    this.textArt = new TextArt(this.canvas);
    this.arStencils = new ARStencils(this.canvas);
    this.gallery = new Gallery();

    // Set up canvas
    this.setupCanvas();

    // Set up event listeners
    this.setupEventListeners();

    // Load settings
    this.loadSettings();

    // Show welcome message
    this.showWelcomeMessage();

    console.log('🎨 Inklings Art Studio Pro initialized!');
  }

  setupCanvas() {
    // Set initial background
    this.ctx.fillStyle = this.settings.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Configure for high DPI displays
    this.configureHighDPI();
  }

  configureHighDPI() {
    // Get the device pixel ratio
    const dpr = window.devicePixelRatio || 1;

    // Get the size of the canvas in CSS pixels
    const rect = this.canvas.getBoundingClientRect();

    // Set the canvas width and height taking into account the device pixel ratio
    if (dpr > 1 && rect.width > 0) {
      const oldWidth = this.canvas.width;
      const oldHeight = this.canvas.height;

      // Save current canvas state
      const imageData = this.ctx.getImageData(0, 0, oldWidth, oldHeight);

      // Resize canvas
      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;

      // Scale the context
      this.ctx.scale(dpr, dpr);

      // Restore the canvas state
      this.ctx.putImageData(imageData, 0, 0);

      // Update settings
      this.settings.canvasWidth = this.canvas.width;
      this.settings.canvasHeight = this.canvas.height;
    }
  }

  setupEventListeners() {
    // Canvas drawing events
    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.canvas.addEventListener('mouseout', this.handleMouseUp.bind(this));

    // Touch events
    this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
    this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
    this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));

    // Tool selection
    document.querySelectorAll('[data-tool]').forEach(tool => {
      tool.addEventListener('click', () => {
        this.setTool(tool.dataset.tool);
      });
    });

    // Brush size slider
    const brushSizeSlider = document.getElementById('brushSize');
    if (brushSizeSlider) {
      brushSizeSlider.addEventListener('input', () => {
        this.settings.brushSize = parseInt(brushSizeSlider.value);
        document.getElementById('brushSizeValue').textContent = brushSizeSlider.value;
      });
    }

    // Brush opacity slider
    const brushOpacitySlider = document.getElementById('brushOpacity');
    if (brushOpacitySlider) {
      brushOpacitySlider.addEventListener('input', () => {
        this.settings.brushOpacity = parseInt(brushOpacitySlider.value);
        document.getElementById('brushOpacityValue').textContent = brushOpacitySlider.value;
      });
    }

    // Brush hardness slider
    const brushHardnessSlider = document.getElementById('brushHardness');
    if (brushHardnessSlider) {
      brushHardnessSlider.addEventListener('input', () => {
        this.settings.brushHardness = parseInt(brushHardnessSlider.value);
        document.getElementById('brushHardnessValue').textContent = brushHardnessSlider.value;
      });
    }

    // Color picker
    const colorPicker = document.getElementById('colorPicker');
    if (colorPicker) {
      colorPicker.addEventListener('input', () => {
        this.settings.brushColor = colorPicker.value;
        this.updateColorPreview();
      });
    }

    // Color swatches
    document.querySelectorAll('.color-swatch').forEach(swatch => {
      swatch.addEventListener('click', () => {
        const color = swatch.dataset.color;
        this.settings.brushColor = color;
        
        // Update color picker
        if (colorPicker) {
          colorPicker.value = color;
        }
        
        // Update active state
        document.querySelectorAll('.color-swatch').forEach(s => {
          s.classList.remove('active');
        });
        swatch.classList.add('active');
        
        this.updateColorPreview();
      });
    });

    // Magic effects
    document.querySelectorAll('.magic-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const effect = btn.dataset.effect;
        this.setActiveEffect(effect, btn);
      });
    });

    // Teen templates
    document.querySelectorAll('.teen-template').forEach(template => {
      template.addEventListener('click', () => {
        const templateName = template.dataset.template;
        this.applyTemplate(templateName);
      });
    });

    // AR templates
    document.querySelectorAll('.ar-template').forEach(template => {
      template.addEventListener('click', () => {
        const templateName = template.dataset.template;
        this.setARTemplate(templateName);
      });
    });

    // AR settings
    const arOpacitySlider = document.getElementById('arOpacity');
    if (arOpacitySlider) {
      arOpacitySlider.addEventListener('input', () => {
        this.updateARSetting('opacity', arOpacitySlider.value);
      });
    }

    const arSizeSlider = document.getElementById('arSize');
    if (arSizeSlider) {
      arSizeSlider.addEventListener('input', () => {
        this.updateARSetting('size', arSizeSlider.value);
      });
    }

    // Window resize
    window.addEventListener('resize', Utils.debounce(() => {
      this.configureHighDPI();
    }, 250));

    // Keyboard shortcuts
    document.addEventListener('keydown', this.handleKeyDown.bind(this));

    // Update quote
    this.updateQuote();
  }

  handleMouseDown(e) {
    if (this.currentMode !== 'draw') return;

    this.isDrawing = true;
    const pos = Utils.getMousePos(this.canvas, e);
    this.lastX = pos.x;
    this.lastY = pos.y;

    // Save state for undo
    this.saveState();

    // Start drawing
    this.draw(pos.x, pos.y, false);
  }

  handleMouseMove(e) {
    if (this.currentMode !== 'draw' || !this.isDrawing) return;

    const pos = Utils.getMousePos(this.canvas, e);
    this.draw(pos.x, pos.y, true);
    this.lastX = pos.x;
    this.lastY = pos.y;
  }

  handleMouseUp() {
    this.isDrawing = false;

    // Auto-save if enabled
    if (this.settings.autoSave) {
      this.autoSave();
    }
  }

  handleTouchStart(e) {
    e.preventDefault();
    if (this.currentMode !== 'draw') return;

    this.isDrawing = true;
    const pos = Utils.getTouchPos(this.canvas, e);
    this.lastX = pos.x;
    this.lastY = pos.y;

    // Save state for undo
    this.saveState();

    // Start drawing
    this.draw(pos.x, pos.y, false);
  }

  handleTouchMove(e) {
    e.preventDefault();
    if (this.currentMode !== 'draw' || !this.isDrawing) return;

    const pos = Utils.getTouchPos(this.canvas, e);
    this.draw(pos.x, pos.y, true);
    this.lastX = pos.x;
    this.lastY = pos.y;
  }

  handleTouchEnd(e) {
    e.preventDefault();
    this.isDrawing = false;

    // Auto-save if enabled
    if (this.settings.autoSave) {
      this.autoSave();
    }
  }

  handleKeyDown(e) {
    // Keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'z':
          if (e.shiftKey) {
            this.redo();
          } else {
            this.undo();
          }
          e.preventDefault();
          break;
        case 'y':
          this.redo();
          e.preventDefault();
          break;
        case 's':
          this.saveArtwork();
          e.preventDefault();
          break;
        case 'o':
          this.loadArtwork();
          e.preventDefault();
          break;
        case 'n':
          this.newArtwork();
          e.preventDefault();
          break;
      }
    } else {
      switch (e.key) {
        case 'b':
          this.setTool('brush');
          break;
        case 'e':
          this.setTool('eraser');
          break;
        case 't':
          this.setTool('text');
          break;
        case 'f':
          this.setTool('fill');
          break;
        case 'g':
          this.toggleGrid();
          break;
        case 'Escape':
          if (this.currentMode === 'ar') {
            this.setMode('draw');
          }
          break;
      }
    }
  }

  draw(x, y, isMoving) {
    switch (this.currentTool) {
      case 'brush':
        this.drawBrush(x, y, isMoving);
        break;
      case 'pencil':
        this.drawPencil(x, y, isMoving);
        break;
      case 'marker':
        this.drawMarker(x, y, isMoving);
        break;
      case 'spray':
        this.drawSpray(x, y);
        break;
      case 'eraser':
        this.drawEraser(x, y, isMoving);
        break;
      case 'line':
        this.drawLine(x, y);
        break;
      case 'rectangle':
        this.drawRectangle(x, y);
        break;
      case 'circle':
        this.drawCircle(x, y);
        break;
      case 'triangle':
        this.drawTriangle(x, y);
        break;
      case 'fill':
        this.fillArea(x, y);
        break;
    }
  }

  drawBrush(x, y, isMoving) {
    const ctx = this.ctx;
    const size = this.settings.brushSize;
    const opacity = this.settings.brushOpacity / 100;
    const hardness = this.settings.brushHardness / 100;
    
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = this.settings.brushColor;
    ctx.lineWidth = size;
    
    if (isMoving) {
      ctx.beginPath();
      ctx.moveTo(this.lastX, this.lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      ctx.fillStyle = this.settings.brushColor;
      ctx.fill();
    }
    
    ctx.restore();
  }
  
  drawPencil(x, y, isMoving) {
    const ctx = this.ctx;
    const size = Math.max(1, this.settings.brushSize / 3);
    
    ctx.save();
    ctx.globalAlpha = this.settings.brushOpacity / 100;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = this.settings.brushColor;
    ctx.lineWidth = size;
    
    if (isMoving) {
      ctx.beginPath();
      ctx.moveTo(this.lastX, this.lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      ctx.fillStyle = this.settings.brushColor;
      ctx.fill();
    }
    
    ctx.restore();
  }
  
  drawMarker(x, y, isMoving) {
    const ctx = this.ctx;
    const size = this.settings.brushSize * 1.5;
    
    ctx.save();
    ctx.globalAlpha = 0.6;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'square';
    ctx.strokeStyle = this.settings.brushColor;
    ctx.lineWidth = size;
    
    if (isMoving) {
      ctx.beginPath();
      ctx.moveTo(this.lastX, this.lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      ctx.fillStyle = this.settings.brushColor;
      ctx.fill();
    }
    
    ctx.restore();
  }
  
  drawSpray(x, y) {
    const ctx = this.ctx;
    const size = this.settings.brushSize * 2;
    const density = size * 2;
    
    ctx.save();
    ctx.fillStyle = this.settings.brushColor;
    ctx.globalAlpha = (this.settings.brushOpacity / 100) * 0.1;
    
    for (let i = 0; i < density; i++) {
      const offsetX = Utils.randomBetween(-size, size);
      const offsetY = Utils.randomBetween(-size, size);
      
      // Only draw within the spray radius
      if (offsetX * offsetX + offsetY * offsetY <= size * size) {
        ctx.beginPath();
        ctx.arc(x + offsetX, y + offsetY, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    ctx.restore();
  }
  
  drawEraser(x, y, isMoving) {
    const ctx = this.ctx;
    const size = this.settings.brushSize * 1.5;
    
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = size;
    
    if (isMoving) {
      ctx.beginPath();
      ctx.moveTo(this.lastX, this.lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  }
  
  drawLine(x, y) {
    // Implement line drawing
  }
  
  drawRectangle(x, y) {
    // Implement rectangle drawing
  }
  
  drawCircle(x, y) {
    // Implement circle drawing
  }
  
  drawTriangle(x, y) {
    // Implement triangle drawing
  }
  
  fillArea(x, y) {
    // Implement flood fill
  }
  
  setTool(tool) {
    this.currentTool = tool;
    this.updateToolbarState();
    
    // Update cursor
    this.updateCursor();
    
    Utils.showNotification(`${Utils.capitalize(tool)} tool selected`, 'info');
    Utils.announceToScreenReader(`${tool} tool selected`);
  }
  
  setMode(mode) {
    if (mode === this.currentMode) return;
    
    // Clean up previous mode
    if (this.currentMode === 'ar') {
      this.arStencils.stopAR();
      document.getElementById('arOverlay').classList.remove('active');
      document.getElementById('arSettings').style.display = 'none';
    }
    
    this.currentMode = mode;
    
    // Set up new mode
    if (mode === 'ar') {
      this.startARMode();
    }
    
    // Update UI
    document.querySelectorAll('[data-mode]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    Utils.showNotification(`${Utils.capitalize(mode)} mode activated`, 'info');
    Utils.announceToScreenReader(`${mode} mode activated`);
  }
  
  async startARMode() {
    document.getElementById('arOverlay').classList.add('active');
    document.getElementById('arSettings').style.display = 'block';
    
    const success = await this.arStencils.startAR();
    if (!success) {
      this.setMode('draw');
    }
  }
  
  setARTemplate(template) {
    if (this.currentMode !== 'ar') {
      this.setMode('ar');
    }
    
    this.arStencils.setStencil(template);
  }
  
  updateARSetting(setting, value) {
    if (setting === 'opacity') {
      this.arStencils.setStencilOpacity(value / 100);
      document.getElementById('arOpacityValue').textContent = value;
    } else if (setting === 'size') {
      this.arStencils.setStencilScale(value / 100);
      document.getElementById('arSizeValue').textContent = value;
    }
  }
  
  captureARReference() {
    const photo = this.arStencils.capturePhoto();
    if (photo) {
      // Add the photo to the canvas
      this.ctx.drawImage(photo, 0, 0, this.canvas.width, this.canvas.height);
      
      // Switch back to draw mode
      this.setMode('draw');
    }
  }
  
  setActiveEffect(effect, button) {
    // Remove active class from all effect buttons
    document.querySelectorAll('.magic-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Add active class to the clicked button
    if (button) {
      button.classList.add('active');
    }
    
    // Apply the effect
    switch (effect) {
      case 'glitter':
        this.effects.startAnimation();
        break;
      case 'neon':
        // Apply neon effect
        break;
      case 'rainbow':
        // Apply rainbow effect
        break;
      case 'galaxy':
        // Apply galaxy effect
        break;
      case 'fire':
        // Apply fire effect
        break;
      case 'ice':
        // Apply ice effect
        break;
    }
    
    Utils.showNotification(`${Utils.capitalize(effect)} effect applied`, 'success');
  }
  
  applyTemplate(template) {
    // Apply the selected template
    Utils.showNotification(`${Utils.capitalize(template)} template applied`, 'success');
  }
  
  updateQuote() {
    const quoteElement = document.getElementById('inspirationalQuote');
    const authorElement = document.getElementById('quoteAuthor');
    
    if (quoteElement && authorElement) {
      const quote = Utils.getRandomQuote();
      quoteElement.textContent = `"${quote.text}"`;
      authorElement.textContent = `- ${quote.author}`;
    }
  }
  
  clearCanvas() {
    // Save state for undo
    this.saveState();
    
    // Clear canvas
    Utils.clearCanvas(this.canvas);
    
    Utils.showNotification('Canvas cleared', 'info');
  }
  
  undo() {
    if (this.undoStack.length === 0) {
      Utils.showNotification('Nothing to undo', 'warning');
      return;
    }
    
    // Save current state to redo stack
    const currentState = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.redoStack.push(currentState);
    
    // Restore previous state
    const previousState = this.undoStack.pop();
    this.ctx.putImageData(previousState, 0, 0);
    
    Utils.showNotification('Undone', 'info');
    Utils.announceToScreenReader('Action undone');
  }
  
  redo() {
    if (this.redoStack.length === 0) {
      Utils.showNotification('Nothing to redo', 'warning');
      return;
    }
    
    // Save current state to undo stack
    const currentState = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.undoStack.push(currentState);
    
    // Restore next state
    const nextState = this.redoStack.pop();
    this.ctx.putImageData(nextState, 0, 0);
    
    Utils.showNotification('Redone', 'info');
    Utils.announceToScreenReader('Action redone');
  }
  
  saveState() {
    if (this.undoStack.length >= this.maxUndoSteps) {
      this.undoStack.shift();
    }
    
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.undoStack.push(imageData);
    this.redoStack = []; // Clear redo stack when new action is performed
  }
  
  toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    
    // Update theme icon
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
      themeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    // Save theme preference
    localStorage.setItem('inklings-theme', newTheme);
    
    Utils.showNotification(`${Utils.capitalize(newTheme)} theme activated`, 'info');
  }
  
  toggleAccessibility() {
    const panel = document.getElementById('accessibilityPanel');
    if (panel) {
      panel.classList.toggle('active');
    }
  }
  
  toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    const toggle = document.getElementById('highContrastToggle');
    if (toggle) {
      toggle.classList.toggle('active');
    }
    
    // Save preference
    const isActive = document.body.classList.contains('high-contrast');
    localStorage.setItem('inklings-high-contrast', isActive);
    
    Utils.showNotification(
      isActive ? 'High contrast mode enabled' : 'High contrast mode disabled',
      'info'
    );
  }
  
  toggleDyslexiaFont() {
    document.body.classList.toggle('dyslexia-font');
    const toggle = document.getElementById('dyslexiaFontToggle');
    if (toggle) {
      toggle.classList.toggle('active');
    }
    
    // Save preference
    const isActive = document.body.classList.contains('dyslexia-font');
    localStorage.setItem('inklings-dyslexia-font', isActive);
    
    Utils.showNotification(
      isActive ? 'Dyslexia-friendly font enabled' : 'Dyslexia-friendly font disabled',
      'info'
    );
  }
  
  toggleReducedMotion() {
    document.body.classList.toggle('reduced-motion');
    const toggle = document.getElementById('reducedMotionToggle');
    if (toggle) {
      toggle.classList.toggle('active');
    }
    
    // Save preference
    const isActive = document.body.classList.contains('reduced-motion');
    localStorage.setItem('inklings-reduced-motion', isActive);
    
    Utils.showNotification(
      isActive ? 'Reduced motion enabled' : 'Reduced motion disabled',
      'info'
    );
  }
  
  toggleLargeButtons() {
    document.body.classList.toggle('large-buttons');
    const toggle = document.getElementById('largeButtonsToggle');
    if (toggle) {
      toggle.classList.toggle('active');
    }
    
    // Save preference
    const isActive = document.body.classList.contains('large-buttons');
    localStorage.setItem('inklings-large-buttons', isActive);
    
    Utils.showNotification(
      isActive ? 'Large buttons enabled' : 'Large buttons disabled',
      'info'
    );
  }
  
  toggleScreenReader() {
    const toggle = document.getElementById('screenReaderToggle');
    if (toggle) {
      toggle.classList.toggle('active');
    }
    
    // Save preference
    const isActive = toggle.classList.contains('active');
    localStorage.setItem('inklings-screen-reader', isActive);
    
    Utils.showNotification(
      isActive ? 'Screen reader support enabled' : 'Screen reader support disabled',
      'info'
    );
    
    if (isActive) {
      Utils.announceToScreenReader('Screen reader support is now enabled');
    }
  }
  
  toggleAR() {
    if (this.currentMode === 'ar') {
      this.setMode('draw');
    } else {
      this.setMode('ar');
    }
  }
  
  openTextArt() {
    const modal = document.getElementById('textArtModal');
    if (modal) {
      modal.classList.add('active');
      
      // Focus on text input
      setTimeout(() => {
        const textInput = document.getElementById('textInput');
        if (textInput) {
          textInput.focus();
        }
      }, 100);
    }
  }
  
  closeTextArt() {
    const modal = document.getElementById('textArtModal');
    if (modal) {
      modal.classList.remove('active');
    }
  }
  
  addTextToCanvas() {
    const textInput = document.getElementById('textInput');
    if (!textInput || !textInput.value.trim()) {
      Utils.showNotification('Please enter some text', 'warning');
      return;
    }
    
    // Get selected font and style
    const fontOption = document.querySelector('.font-option.active');
    const styleOption = document.querySelector('.text-style.active');
    
    if (!fontOption || !styleOption) {
      Utils.showNotification('Please select a font and style', 'warning');
      return;
    }
    
    // Save state for undo
    this.saveState();
    
    // Set text properties
    this.textArt.setText(textInput.value);
    this.textArt.setFont(fontOption.dataset.font);
    this.textArt.setStyle(styleOption.dataset.style);
    this.textArt.setSize(48); // Default size
    this.textArt.setColor(this.settings.brushColor);
    
    // Draw text at center of canvas
    const x = this.canvas.width / 2;
    const y = this.canvas.height / 2;
    this.textArt.drawText(x, y);
    
    // Close modal
    this.closeTextArt();
    
    Utils.showNotification('Text added to canvas', 'success');
  }
  
  saveArtwork() {
    Utils.downloadCanvas(this.canvas, `inklings-artwork-${Date.now()}.png`);
  }
  
  shareArtwork() {
    if (navigator.share) {
      this.canvas.toBlob(async (blob) => {
        try {
          const file = new File([blob], 'inklings-artwork.png', { type: 'image/png' });
          
          await navigator.share({
            title: 'My Inklings Art Studio Pro Creation',
            text: 'Check out my digital artwork!',
            files: [file]
          });
          
          Utils.showNotification('Artwork shared successfully!', 'success');
        } catch (error) {
          console.error('Sharing failed:', error);
          Utils.showNotification('Sharing failed. Try downloading instead.', 'error');
          
          // Fallback to download
          this.saveArtwork();
        }
      });
    } else {
      Utils.showNotification('Sharing not supported on this device. Downloading instead.', 'info');
      this.saveArtwork();
    }
  }
  
  loadSettings() {
    try {
      // Load theme
      const theme = localStorage.getItem('inklings-theme');
      if (theme) {
        document.body.setAttribute('data-theme', theme);
        
        // Update theme icon
        const themeIcon = document.getElementById('themeIcon');
        if (themeIcon) {
          themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
      }
      
      // Load accessibility settings
      if (localStorage.getItem('inklings-high-contrast') === 'true') {
        document.body.classList.add('high-contrast');
        document.getElementById('highContrastToggle')?.classList.add('active');
      }
      
      if (localStorage.getItem('inklings-dyslexia-font') === 'true') {
        document.body.classList.add('dyslexia-font');
        document.getElementById('dyslexiaFontToggle')?.classList.add('active');
      }
      
      if (localStorage.getItem('inklings-reduced-motion') === 'true') {
        document.body.classList.add('reduced-motion');
        document.getElementById('reducedMotionToggle')?.classList.add('active');
      }
      
      if (localStorage.getItem('inklings-large-buttons') === 'true') {
        document.body.classList.add('large
