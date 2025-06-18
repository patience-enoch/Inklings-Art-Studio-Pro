
// Text Art System for Inklings Art Studio Pro

class TextArt {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.fonts = this.initializeFonts();
    this.textStyles = this.initializeTextStyles();
    this.currentText = '';
    this.currentFont = 'bubble';
    this.currentStyle = 'gradient';
    this.currentSize = 48;
    this.currentColor = '#ff6b9d';
  }

  // Initialize available fonts
  initializeFonts() {
    return {
      bubble: {
        name: 'Bubble',
        fontFamily: 'Comic Sans MS, cursive',
        weight: 'bold',
        style: 'normal',
        preview: 'Bubble Text! 🫧'
      },
      graffiti: {
        name: 'Graffiti',
        fontFamily: 'Impact, Arial Black, sans-serif',
        weight: '900',
        style: 'italic',
        preview: 'GRAFFITI! 🎨'
      },
      handwritten: {
        name: 'Handwritten',
        fontFamily: 'Kalam, cursive',
        weight: 'normal',
        style: 'normal',
        preview: 'Handwritten ✍️'
      },
      retro: {
        name: 'Retro',
        fontFamily: 'Orbitron, monospace',
        weight: 'bold',
        style: 'normal',
        preview: 'RETRO 80s! 🌈'
      },
      kawaii: {
        name: 'Kawaii',
        fontFamily: 'Nunito, sans-serif',
        weight: '800',
        style: 'normal',
        preview: 'Kawaii! (◕‿◕)♡'
      },
      gothic: {
        name: 'Gothic',
        fontFamily: 'Creepster, cursive',
        weight: 'normal',
        style: 'normal',
        preview: 'Gothic Style 🖤'
      },
      neon: {
        name: 'Neon',
        fontFamily: 'Orbitron, monospace',
        weight: 'bold',
        style: 'normal',
        preview: 'NEON GLOW ⚡'
      },
      elegant: {
        name: 'Elegant',
        fontFamily: 'Dancing Script, cursive',
        weight: 'bold',
        style: 'normal',
        preview: 'Elegant Script ✨'
      }
    };
  }

  // Initialize text styles
  initializeTextStyles() {
    return {
      gradient: {
        name: 'Gradient',
        icon: 'fas fa-palette',
        apply: (ctx, text, x, y, size, color) => this.applyGradientStyle(ctx, text, x, y, size, color)
      },
      outline: {
        name: 'Outline',
        icon: 'far fa-square',
        apply: (ctx, text, x, y, size, color) => this.applyOutlineStyle(ctx, text, x, y, size, color)
      },
      shadow: {
        name: 'Shadow',
        icon: 'fas fa-clone',
        apply: (ctx, text, x, y, size, color) => this.applyShadowStyle(ctx, text, x, y, size, color)
      },
      neon: {
        name: 'Neon Glow',
        icon: 'fas fa-lightbulb',
        apply: (ctx, text, x, y, size, color) => this.applyNeonStyle(ctx, text, x, y, size, color)
      },
      rainbow: {
        name: 'Rainbow',
        icon: 'fas fa-rainbow',
        apply: (ctx, text, x, y, size, color) => this.applyRainbowStyle(ctx, text, x, y, size, color)
      },
      fire: {
        name: 'Fire',
        icon: 'fas fa-fire',
        apply: (ctx, text, x, y, size, color) => this.applyFireStyle(ctx, text, x, y, size, color)
      },
      ice: {
        name: 'Ice',
        icon: 'far fa-snowflake',
        apply: (ctx, text, x, y, size, color) => this.applyIceStyle(ctx, text, x, y, size, color)
      },
      glitter: {
        name: 'Glitter',
        icon: 'fas fa-star',
        apply: (ctx, text, x, y, size, color) => this.applyGlitterStyle(ctx, text, x, y, size, color)
      }
    };
  }

  // Set text properties
  setText(text) {
    this.currentText = text;
  }

  setFont(fontKey) {
    if (this.fonts[fontKey]) {
      this.currentFont = fontKey;
    }
  }

  setStyle(styleKey) {
    if (this.textStyles[styleKey]) {
      this.currentStyle = styleKey;
    }
  }

  setSize(size) {
    this.currentSize = Math.max(12, Math.min(200, size));
  }

  setColor(color) {
    this.currentColor = color;
  }

  // Draw text with current settings
  drawText(x, y) {
    if (!this.currentText) return;

    const font = this.fonts[this.currentFont];
    const style = this.textStyles[this.currentStyle];

    // Set font
    this.ctx.font = `${font.weight} ${font.style} ${this.currentSize}px ${font.fontFamily}`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    // Apply style
    style.apply(this.ctx, this.currentText, x, y, this.currentSize, this.currentColor);
  }

  // Style implementations
  applyGradientStyle(ctx, text, x, y, size, color) {
    const gradient = ctx.createLinearGradient(x - 100, y - size/2, x + 100, y + size/2);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.5, Utils.adjustColorBrightness(color, 30));
    gradient.addColorStop(1, Utils.adjustColorBrightness(color, -20));
    
    ctx.fillStyle = gradient;
    ctx.fillText(text, x, y);
  }

  applyOutlineStyle(ctx, text, x, y, size, color) {
    // Outline
    ctx.strokeStyle = Utils.adjustColorBrightness(color, -40);
    ctx.lineWidth = Math.max(2, size * 0.05);
    ctx.lineJoin = 'round';
    ctx.strokeText(text, x, y);
    
    // Fill
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  }

  applyShadowStyle(ctx, text, x, y, size, color) {
    const shadowOffset = size * 0.08;
    
    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillText(text, x + shadowOffset, y + shadowOffset);
    
    // Main text
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  }

  applyNeonStyle(ctx, text, x, y, size, color) {
    // Outer glow
    ctx.shadowColor = color;
    ctx.shadowBlur = size * 0.3;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
    
    // Inner glow
    ctx.shadowBlur = size * 0.1;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(text, x, y);
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  }

  applyRainbowStyle(ctx, text, x, y, size, color) {
    const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
    const charWidth = ctx.measureText('M').width;
    const totalWidth = ctx.measureText(text).width;
    let currentX = x - totalWidth / 2;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const colorIndex = i % colors.length;
      
      ctx.fillStyle = colors[colorIndex];
      ctx.fillText(char, currentX, y);
      
      currentX += ctx.measureText(char).width;
    }
  }

  applyFireStyle(ctx, text, x, y, size, color) {
    // Create fire gradient
    const gradient = ctx.createLinearGradient(x, y - size/2, x, y + size/2);
    gradient.addColorStop(0, '#ffff00');
    gradient.addColorStop(0.5, '#ff6600');
    gradient.addColorStop(1, '#ff0000');
    
    // Flame effect background
    ctx.shadowColor = '#ff6600';
    ctx.shadowBlur = size * 0.2;
    ctx.fillStyle = gradient;
    ctx.fillText(text, x, y);
    
    // Add flickering effect
    for (let i = 0; i < 5; i++) {
      const offsetX = (Math.random() - 0.5) * 4;
      const offsetY = (Math.random() - 0.5) * 4;
      ctx.globalAlpha = 0.3;
      ctx.fillText(text, x + offsetX, y + offsetY);
    }
    
    ctx.globalAlpha = 1;
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  }

  applyIceStyle(ctx, text, x, y, size, color) {
    // Ice gradient
    const gradient = ctx.createLinearGradient(x, y - size/2, x, y + size/2);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(0.5, '#87ceeb');
    gradient.addColorStop(1, '#4682b4');
    
    // Ice glow
    ctx.shadowColor = '#87ceeb';
    ctx.shadowBlur = size * 0.15;
    ctx.fillStyle = gradient;
    ctx.fillText(text, x, y);
    
    // Crystalline effect
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.5;
    ctx.strokeText(text, x, y);
    
    ctx.globalAlpha = 1;
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  }

  applyGlitterStyle(ctx, text, x, y, size, color) {
    // Base text
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
    
    // Add glitter particles
    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = size;
    
    for (let i = 0; i < 20; i++) {
      const glitterX = x + (Math.random() - 0.5) * textWidth;
      const glitterY = y + (Math.random() - 0.5) * textHeight;
      const glitterSize = Math.random() * 3 + 1;
      
      ctx.save();
      ctx.fillStyle = '#ffd700';
      ctx.globalAlpha = Math.random() * 0.8 + 0.2;
      ctx.beginPath();
      ctx.arc(glitterX, glitterY, glitterSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // ASCII Art generation
  generateASCIIArt(text, style = 'block') {
    const asciiStyles = {
      block: this.generateBlockASCII,
      bubble: this.generateBubbleASCII,
      shadow: this.generateShadowASCII,
      double: this.generateDoubleASCII
    };
    
    if (asciiStyles[style]) {
      return asciiStyles[style](text);
    }
    
    return this.generateBlockASCII(text);
  }

  generateBlockASCII(text) {
    const chars = {
      'A': ['  ██  ', ' ████ ', '██  ██', '██████', '██  ██'],
      'B': ['██████', '██  ██', '██████', '██████', '██████'],
      'C': [' █████', '██    ', '██    ', '██    ', ' █████'],
      'D': ['██████', '██  ██', '██  ██', '██  ██', '██████'],
      'E': ['██████', '██    ', '██████', '██    ', '██████'],
      'F': ['██████', '██    ', '██████', '██    ', '██    '],
      'G': [' █████', '██    ', '██ ███', '██  ██', ' █████'],
      'H': ['██  ██', '██  ██', '██████', '██  ██', '██  ██'],
      'I': ['██████', '  ██  ', '  ██  ', '  ██  ', '██████'],
      'J': ['██████', '    ██', '    ██', '██  ██', ' █████'],
      'K': ['██  ██', '██ ██ ', '████  ', '██ ██ ', '██  ██'],
      'L': ['██    ', '██    ', '██    ', '██    ', '██████'],
      'M': ['██  ██', '██████', '██████', '██  ██', '██  ██'],
      'N': ['██  ██', '███ ██', '██████', '██ ███', '██  ██'],
      'O': [' █████', '██  ██', '██  ██', '██  ██', ' █████'],
      'P': ['██████', '██  ██', '██████', '██    ', '██    '],
      'Q': [' █████', '██  ██', '██  ██', '██ ███', ' ██████'],
      'R': ['██████', '██  ██', '██████', '██ ██ ', '██  ██'],
      'S': [' █████', '██    ', ' █████', '    ██', '██████'],
      'T': ['██████', '  ██  ', '  ██  ', '  ██  ', '  ██  '],
      'U': ['██  ██', '██  ██', '██  ██', '██  ██', ' █████'],
      'V': ['██  ██', '██  ██', '██  ██', ' ████ ', '  ██  '],
      'W': ['██  ██', '██  ██', '██████', '██████', '██  ██'],
      'X': ['██  ██', ' ████ ', '  ██  ', ' ████ ', '██  ██'],
      'Y': ['██  ██', '██  ██', ' ████ ', '  ██  ', '  ██  '],
      'Z': ['██████', '   ██ ', '  ██  ', ' ██   ', '██████'],
      ' ': ['      ', '      ', '      ', '      ', '      ']
    };
    
    const lines = ['', '', '', '', ''];
    
    for (let char of text.toUpperCase()) {
      if (chars[char]) {
        for (let i = 0; i < 5; i++) {
          lines[i] += chars[char][i] + ' ';
        }
      }
    }
    
    return lines.join('\n');
  }

  generateBubbleASCII(text) {
    const chars = {
      'A': ['  ●●  ', ' ●  ● ', '●●●●●●', '●    ●', '●    ●'],
      'B': ['●●●●● ', '●    ●', '●●●●● ', '●    ●', '●●●●● '],
      'C': [' ●●●●●', '●     ', '●     ', '●     ', ' ●●●●●'],
      // Add more bubble characters as needed
      ' ': ['      ', '      ', '      ', '      ', '      ']
    };
    
    return this.generateFromCharSet(text, chars);
  }

  generateShadowASCII(text) {
    const block = this.generateBlockASCII(text);
    const lines = block.split('\n');
    const shadowLines = [];
    
    // Add shadow effect
    for (let i = 0; i < lines.length; i++) {
      let shadowLine = '';
      for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] === '█') {
          shadowLine += '█';
        } else if (i > 0 && j > 0 && lines[i-1] && lines[i-1][j-1] === '█') {
          shadowLine += '▓';
        } else {
          shadowLine += ' ';
        }
      }
      shadowLines.push(shadowLine);
    }
    
    return shadowLines.join('\n');
  }

  generateDoubleASCII(text) {
    const chars = {
      'A': ['  ████  ', ' ██  ██ ', '████████', '██    ██', '██    ██'],
      'B': ['████████', '██    ██', '████████', '██    ██', '████████'],
      // Add more double-width characters as needed
      ' ': ['        ', '        ', '        ', '        ', '        ']
    };
    
    return this.generateFromCharSet(text, chars);
  }

  generateFromCharSet(text, charSet) {
    const lines = ['', '', '', '', ''];
    
    for (let char of text.toUpperCase()) {
      if (charSet[char]) {
        for (let i = 0; i < 5; i++) {
          lines[i] += charSet[char][i] + ' ';
        }
      } else if (charSet[' ']) {
        for (let i = 0; i < 5; i++) {
          lines[i] += charSet[' '][i] + ' ';
        }
      }
    }
    
    return lines.join('\n');
  }

  // Text effects
  addTextEffect(text, x, y, effect) {
    switch (effect) {
      case 'typewriter':
        this.typewriterEffect(text, x, y);
        break;
      case 'bounce':
        this.bounceEffect(text, x, y);
        break;
      case 'wave':
        this.waveEffect(text, x, y);
        break;
      case 'shake':
        this.shakeEffect(text, x, y);
        break;
    }
  }

  typewriterEffect(text, x, y, callback) {
    let currentText = '';
    let index = 0;
    
    const type = () => {
      if (index < text.length) {
        currentText += text[index];
        this.setText(currentText);
        this.drawText(x, y);
        index++;
        setTimeout(type, 100);
      } else if (callback) {
        callback();
      }
    };
    
    type();
  }

  bounceEffect(text, x, y) {
    const chars = text.split('');
    const charWidth = this.ctx.measureText('M').width;
    const totalWidth = this.ctx.measureText(text).width;
    let currentX = x - totalWidth / 2;
    
    chars.forEach((char, index) => {
      const bounceY = y + Math.sin(Date.now() * 0.01 + index * 0.5) * 10;
      
      this.ctx.save();
      this.ctx.fillStyle = this.currentColor;
      this.ctx.fillText(char, currentX, bounceY);
      this.ctx.restore();
      
      currentX += this.ctx.measureText(char).width;
    });
  }

  waveEffect(text, x, y) {
    const chars = text.split('');
    const totalWidth = this.ctx.measureText(text).width;
    let currentX = x - totalWidth / 2;
    
    chars.forEach((char, index) => {
      const waveY = y + Math.sin(Date.now() * 0.005 + index * 0.3) * 15;
      
      this.ctx.save();
      this.ctx.fillStyle = this.currentColor;
      this.ctx.fillText(char, currentX, waveY);
      this.ctx.restore();
      
      currentX += this.ctx.measureText(char).width;
    });
  }

  shakeEffect(text, x, y) {
    const shakeX = x + (Math.random() - 0.5) * 4;
    const shakeY = y + (Math.random() - 0.5) * 4;
    
    this.ctx.save();
    this.ctx.fillStyle = this.currentColor;
    this.ctx.fillText(text, shakeX, shakeY);
    this.ctx.restore();
  }

  // Get font list for UI
  getFontList() {
    return Object.keys(this.fonts).map(key => ({
      key,
      ...this.fonts[key]
    }));
  }

  // Get style list for UI
  getStyleList() {
    return Object.keys(this.textStyles).map(key => ({
      key,
      ...this.textStyles[key]
    }));
  }

  // Measure text dimensions
  measureText(text, font, size) {
    this.ctx.save();
    this.ctx.font = `${font.weight} ${font.style} ${size}px ${font.fontFamily}`;
    const metrics = this.ctx.measureText(text);
    this.ctx.restore();
    
    return {
      width: metrics.width,
      height: size
    };
  }

  // Text to path conversion (for advanced effects)
  textToPath(text, x, y) {
    // This would require a more complex implementation
    // For now, we'll use the standard text rendering
    this.drawText(x, y);
  }
}

// Export for use in other modules
window.TextArt = TextArt;

