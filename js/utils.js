<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inklings Art Studio Pro - Digital Art & Drawing App</title>
    
    <!-- Meta tags for SEO and social sharing -->
    <meta name="description" content="Create amazing digital art with AR assistance, text effects, and professional templates. Perfect for young artists!">
    <meta name="keywords" content="digital art, drawing app, teen art, AR drawing, text art, creative tools, inklings">
    <meta name="author" content="Inklings Art Studio Pro">
    
    <!-- Open Graph tags -->
    <meta property="og:title" content="Inklings Art Studio Pro - Digital Art & Drawing App">
    <meta property="og:description" content="Create amazing digital art with AR assistance and professional tools">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://inklings-art-studio-pro.com">
    
    <!-- Favicon - Comprehensive favicon support -->
    <link rel="icon" type="image/x-icon" href="./favicon.ico">
    <link rel="apple-touch-icon" sizes="57x57" href="./apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="./apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="./apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="./apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="./apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="./apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="./apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="./apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="./apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="./android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="./favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png">
    <link rel="manifest" href="./manifest.json">
    <meta name="msapplication-TileColor" content="#ff6b9d">
    <meta name="msapplication-TileImage" content="./ms-icon-144x144.png">
    <meta name="msapplication-config" content="./browserconfig.xml">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Pacifico&family=Great+Vibes&family=Satisfy&family=Kalam:wght@300;400;700&family=Caveat:wght@400;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- CSS Files -->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/themes.css">
    <link rel="stylesheet" href="css/responsive.css">
    
    <!-- PWA Manifest and Theme -->
    <meta name="theme-color" content="#ff6b9d">
    
    <!-- iOS PWA support -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="Inklings Art Studio Pro">
    
    <!-- Spin animation for loading -->
    <style>
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    </style>
</head>
<body data-theme="light">
    <!-- Header -->
    <header class="header">
        <div class="logo">
            <i class="fas fa-palette"></i>
            <span>Inklings Art Studio Pro</span>
        </div>
        
        <div class="header-buttons">
            <button class="btn btn-secondary" onclick="toggleTheme()" title="Toggle Theme">
                <i class="fas fa-moon" id="themeIcon"></i>
            </button>
            
            <button class="btn btn-secondary" onclick="toggleAccessibility()" title="Accessibility">
                <i class="fas fa-universal-access"></i>
            </button>
            
            <button class="btn btn-primary" onclick="saveArtwork()" title="Save Artwork">
                <i class="fas fa-download"></i>
                <span class="btn-text">Save</span>
            </button>
            
            <button class="btn btn-primary" onclick="shareArtwork()" title="Share Artwork">
                <i class="fas fa-share-alt"></i>
                <span class="btn-text">Share</span>
            </button>
            
            <button class="btn btn-ar" id="arToggleBtn" onclick="toggleAR()" title="AR Mode">
                <i class="fas fa-camera"></i>
                <span class="btn-text">Start AR</span>
            </button>
        </div>
    </header>

    <!-- Main App Container -->
    <div class="app-container">
        <!-- Sidebar - Tools -->
        <aside class="sidebar">
            <!-- Drawing Tools -->
            <div class="tool-group">
                <div class="tool-group-title">Draw</div>
                <div class="tool active" data-tool="brush" title="Brush">
                    <i class="fas fa-paint-brush"></i>
                </div>
                <div class="tool" data-tool="pencil" title="Pencil">
                    <i class="fas fa-pencil-alt"></i>
                </div>
                <div class="tool" data-tool="marker" title="Marker">
                    <i class="fas fa-marker"></i>
                </div>
                <div class="tool" data-tool="spray" title="Spray Paint">
                    <i class="fas fa-spray-can"></i>
                </div>
            </div>

            <!-- Shape Tools -->
            <div class="tool-group">
                <div class="tool-group-title">Shapes</div>
                <div class="tool" data-tool="line" title="Line">
                    <i class="fas fa-minus"></i>
                </div>
                <div class="tool" data-tool="rectangle" title="Rectangle">
                    <i class="far fa-square"></i>
                </div>
                <div class="tool" data-tool="circle" title="Circle">
                    <i class="far fa-circle"></i>
                </div>
                <div class="tool" data-tool="triangle" title="Triangle">
                    <i class="fas fa-play" style="transform: rotate(90deg);"></i>
                </div>
            </div>

            <!-- Special Tools -->
            <div class="tool-group">
                <div class="tool-group-title">Special</div>
                <div class="tool" data-tool="text" title="Text Art" onclick="openTextArt()">
                    <i class="fas fa-font"></i>
                </div>
                <div class="tool" data-tool="sticker" title="Stickers">
                    <i class="fas fa-star"></i>
                </div>
                <div class="tool" data-tool="eraser" title="Eraser">
                    <i class="fas fa-eraser"></i>
                </div>
                <div class="tool" data-tool="fill" title="Fill">
                    <i class="fas fa-fill-drip"></i>
                </div>
            </div>

            <!-- Utility Tools -->
            <div class="tool-group">
                <div class="tool-group-title">Utils</div>
                <div class="tool" data-tool="undo" title="Undo" onclick="undo()">
                    <i class="fas fa-undo"></i>
                </div>
                <div class="tool" data-tool="redo" title="Redo" onclick="redo()">
                    <i class="fas fa-redo"></i>
                </div>
                <div class="tool" data-tool="clear" title="Clear Canvas" onclick="clearCanvas()">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
        </aside>

        <!-- Canvas Area -->
        <main class="canvas-area">
            <div class="canvas-container">
                <canvas id="backgroundCanvas" width="800" height="600"></canvas>
            </div>
        </main>

        <!-- Properties Panel -->
        <aside class="properties">
            <!-- Brush Settings -->
            <div class="property-group">
                <div class="property-title">
                    <i class="fas fa-sliders-h"></i>
                    Brush Settings
                </div>
                
                <div class="slider-group">
                    <div class="slider-label">
                        <span>Size</span>
                        <span id="brushSizeValue">10</span>
                    </div>
                    <input type="range" class="slider" id="brushSize" min="1" max="100" value="10">
                </div>
                
                <div class="slider-group">
                    <div class="slider-label">
                        <span>Opacity</span>
                        <span id="brushOpacityValue">100</span>
                    </div>
                    <input type="range" class="slider" id="brushOpacity" min="1" max="100" value="100">
                </div>
                
                <div class="slider-group">
                    <div class="slider-label">
                        <span>Hardness</span>
                        <span id="brushHardnessValue">100</span>
                    </div>
                    <input type="range" class="slider" id="brushHardness" min="0" max="100" value="100">
                </div>
            </div>

            <!-- Colors -->
            <div class="property-group">
                <div class="property-title">
                    <i class="fas fa-palette"></i>
                    Colors
                </div>
                
                <input type="color" class="color-picker" id="colorPicker" value="#ff6b9d">
                
                <div class="color-grid">
                    <div class="color-swatch active" style="background: #ff6b9d;" data-color="#ff6b9d"></div>
                    <div class="color-swatch" style="background: #a855f7;" data-color="#a855f7"></div>
                    <div class="color-swatch" style="background: #06d6a0;" data-color="#06d6a0"></div>
                    <div class="color-swatch" style="background: #f59e0b;" data-color="#f59e0b"></div>
                    <div class="color-swatch" style="background: #ef4444;" data-color="#ef4444"></div>
                    <div class="color-swatch" style="background: #3b82f6;" data-color="#3b82f6"></div>
                    <div class="color-swatch" style="background: #8b5cf6;" data-color="#8b5cf6"></div>
                    <div class="color-swatch" style="background: #10b981;" data-color="#10b981"></div>
                    <div class="color-swatch" style="background: #f97316;" data-color="#f97316"></div>
                    <div class="color-swatch" style="background: #ec4899;" data-color="#ec4899"></div>
                    <div class="color-swatch" style="background: #000000;" data-color="#000000"></div>
                    <div class="color-swatch" style="background: #ffffff; border: 1px solid #ccc;" data-color="#ffffff"></div>
                </div>
            </div>

            <!-- Magic Effects -->
            <div class="property-group">
                <div class="property-title">
                    <i class="fas fa-magic"></i>
                    Magic Effects
                </div>
                
                <div class="magic-btn" data-effect="glitter">
                    <i class="fas fa-star"></i>
                    Glitter Trail
                </div>
                <div class="magic-btn" data-effect="neon">
                    <i class="fas fa-bolt"></i>
                    Neon Glow
                </div>
                <div class="magic-btn" data-effect="rainbow">
                    <i class="fas fa-rainbow"></i>
                    Rainbow
                </div>
                <div class="magic-btn" data-effect="galaxy">
                    <i class="fas fa-star"></i>
                    Galaxy
                </div>
                <div class="magic-btn" data-effect="fire">
                    <i class="fas fa-fire"></i>
                    Fire
                </div>
                <div class="magic-btn" data-effect="ice">
                    <i class="fas fa-snowflake"></i>
                    Ice
                </div>
            </div>

            <!-- Teen Templates -->
            <div class="property-group">
                <div class="property-title">
                    <i class="fas fa-heart"></i>
                    Teen Vibes
                </div>
                
                <div class="teen-template-grid">
                    <div class="teen-template" data-template="aesthetic-quotes">
                        ✨ Aesthetic
                    </div>
                    <div class="teen-template" data-template="vsco-girl">
                        🌻 VSCO
                    </div>
                    <div class="teen-template" data-template="kawaii-cute">
                        🌸 Kawaii
                    </div>
                    <div class="teen-template" data-template="y2k-retro">
                        💫 Y2K
                    </div>
                    <div class="teen-template" data-template="dark-academia">
                        📚 Academia
                    </div>
                    <div class="teen-template" data-template="cottagecore">
                        🍄 Cottage
                    </div>
                </div>
            </div>

            <!-- AR Templates -->
            <div class="property-group">
                <div class="property-title">
                    <i class="fas fa-camera"></i>
                    AR Templates
                </div>
                
                <div class="ar-template-grid">
                    <div class="ar-template" data-template="realistic-eye" onclick="setARTemplate('realistic-eye')">
                        👁️ Eye
                    </div>
                    <div class="ar-template" data-template="realistic-wolf" onclick="setARTemplate('realistic-wolf')">
                        🐺 Wolf
                    </div>
                    <div class="ar-template" data-template="realistic-eagle" onclick="setARTemplate('realistic-eagle')">
                        🦅 Eagle
                    </div>
                    <div class="ar-template" data-template="realistic-lion" onclick="setARTemplate('realistic-lion')">
                        🦁 Lion
                    </div>
                    <div class="ar-template" data-template="realistic-rose" onclick="setARTemplate('realistic-rose')">
                        🌹 Rose
                    </div>
                    <div class="ar-template" data-template="realistic-portrait" onclick="setARTemplate('realistic-portrait')">
                        👤 Face
                    </div>
                    <div class="ar-template" data-template="realistic-dragon" onclick="setARTemplate('realistic-dragon')">
                        🐉 Dragon
                    </div>
                    <div class="ar-template" data-template="realistic-butterfly" onclick="setARTemplate('realistic-butterfly')">
                        🦋 Butterfly
                    </div>
                    <div class="ar-template" data-template="realistic-tree" onclick="setARTemplate('realistic-tree')">
                        🌳 Tree
                    </div>
                </div>
            </div>

            <!-- AR Settings (shown when AR is active) -->
            <div class="property-group" id="arSettings" style="display: none;">
                <div class="property-title">
                    <i class="fas fa-cog"></i>
                    AR Settings
                </div>
                
                <div class="slider-group">
                    <div class="slider-label">
                        <span>Opacity</span>
                        <span id="arOpacityValue">60</span>
                    </div>
                    <input type="range" class="slider" id="arOpacity" min="10" max="100" value="60" 
                           onchange="updateARSetting('opacity', this.value)">
                </div>
                
                <div class="slider-group">
                    <div class="slider-label">
                        <span>Size</span>
                        <span id="arSizeValue">100</span>
                    </div>
                    <input type="range" class="slider" id="arSize" min="50" max="200" value="100" 
                           onchange="updateARSetting('size', this.value)">
                </div>
            </div>
        </aside>
    </div>

    <!-- Text Art Modal -->
    <div class="text-art-modal" id="textArtModal">
        <div class="text-art-panel">
            <div class="property-title" style="margin-bottom: 20px;">
                <i class="fas fa-font"></i>
                Create Text Art
            </div>
            
            <input type="text" class="text-input" id="textInput" placeholder="Enter your text here..." maxlength="50">
            
            <div class="property-title" style="font-size: 1rem; margin: 20px 0 10px 0;">Choose Font</div>
            <div class="font-grid">
                <div class="font-option active" data-font="Dancing Script" style="font-family: 'Dancing Script', cursive;">
                    Dancing Script
                </div>
                <div class="font-option" data-font="Pacifico" style="font-family: 'Pacifico', cursive;">
                    Pacifico
                </div>
                <div class="font-option" data-font="Great Vibes" style="font-family: 'Great Vibes', cursive;">
                    Great Vibes
                </div>
                <div class="font-option" data-font="Satisfy" style="font-family: 'Satisfy', cursive;">
                    Satisfy
                </div>
                <div class="font-option" data-font="Kalam" style="font-family: 'Kalam', cursive;">
                    Kalam
                </div>
                <div class="font-option" data-font="Caveat" style="font-family: 'Caveat', cursive;">
                    Caveat
                </div>
            </div>
            
            <div class="property-title" style="font-size: 1rem; margin: 20px 0 10px 0;">Choose Style</div>
            <div class="text-style-grid">
                <div class="text-style active" data-style="gradient">
                    <i class="fas fa-palette"></i>
                    Gradient
                </div>
                <div class="text-style" data-style="shadow">
                    <i class="fas fa-clone"></i>
                    Shadow
                </div>
                <div class="text-style" data-style="outline">
                    <i class="far fa-square"></i>
                    Outline
                </div>
                <div class="text-style" data-style="neon">
                    <i class="fas fa-bolt"></i>
                    Neon
                </div>
                <div class="text-style" data-style="rainbow">
                    <i class="fas fa-rainbow"></i>
                    Rainbow
                </div>
                <div class="text-style" data-style="glitter">
                    <i class="fas fa-star"></i>
                    Glitter
                </div>
                <div class="text-style" data-style="fire">
                    <i class="fas fa-fire"></i>
                    Fire
                </div>
                <div class="text-style" data-style="ice">
                    <i class="fas fa-snowflake"></i>
                    Ice
                </div>
            </div>
            
            <div class="modal-buttons">
                <button class="btn btn-secondary" onclick="closeTextArt()">
                    <i class="fas fa-times"></i>
                    Cancel
                </button>
                <button class="btn btn-primary" onclick="addTextToCanvas()">
                    <i class="fas fa-plus"></i>
                    Add Text
                </button>
            </div>
        </div>
    </div>

    <!-- AR Overlay -->
    <div class="ar-overlay" id="arOverlay">
        <video id="cameraVideo" autoplay playsinline></video>
        <div class="ar-stencil-overlay" id="arStencilOverlay"></div>
        
        <div class="ar-controls" id="arControls">
            <button class="btn btn-secondary" onclick="toggleAR()">
                <i class="fas fa-times"></i>
                Exit AR
            </button>
            <button class="btn btn-ar" onclick="captureARReference()">
                <i class="fas fa-camera"></i>
                Capture
            </button>
        </div>
    </div>

    <!-- Accessibility Panel -->
    <div class="accessibility-panel" id="accessibilityPanel">
        <div class="property-title" style="margin-bottom: 20px;">
            <i class="fas fa-universal-access"></i>
            Accessibility Options
        </div>
        
        <div class="accessibility-option" onclick="toggleHighContrast()">
            <span>High Contrast Mode</span>
            <div class="toggle-switch" id="highContrastToggle"></div>
        </div>
        
        <div class="accessibility-option" onclick="toggleDyslexiaFont()">
            <span>Dyslexia-Friendly Font</span>
            <div class="toggle-switch" id="dyslexiaFontToggle"></div>
        </div>
        
        <div class="accessibility-option" onclick="toggleReducedMotion()">
            <span>Reduce Motion</span>
            <div class="toggle-switch" id="reducedMotionToggle"></div>
        </div>
        
        <div class="accessibility-option" onclick="toggleLargeButtons()">
            <span>Large Buttons</span>
            <div class="toggle-switch" id="largeButtonsToggle"></div>
        </div>
        
        <div class="accessibility-option" onclick="toggleScreenReader()">
            <span>Screen Reader Support</span>
            <div class="toggle-switch" id="screenReaderToggle"></div>
        </div>
    </div>

    <!-- Inspirational Quote -->
    <div class="quote-container">
        <div class="quote" id="inspirationalQuote">
            "Every artist was first an amateur."
        </div>
        <div class="author" id="quoteAuthor">
            - Ralph Waldo Emerson
        </div>
    </div>

    <!-- Loading Screen -->
    <div id="loadingScreen" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, #ff6b9d, #a855f7); display: flex; align-items: center; justify-content: center; z-index: 10000; color: white; font-size: 1.5rem;">
        <div style="text-align: center;">
            <i class="fas fa-palette fa-3x" style="animation: spin 2s linear infinite; margin-bottom: 20px;"></i>
            <div>Loading Inklings Art Studio Pro...</div>
        </div>
    </div>

    <!-- JavaScript Files -->
    <script src="js/utils.js"></script>
    <script src="js/effects.js"></script>
    <script src="js/text-art.js"></script>
    <script src="js/ar-system.js"></script>
    <script src="js/main.js"></script>

    <!-- PWA Service Worker -->
    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('./sw.js')
                    .then(function(registration) {
                        console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    </script>

    <!-- Loading Screen Script -->
    <script>
        window.addEventListener('load', function() {
            setTimeout(function() {
                const loadingScreen = document.getElementById('loadingScreen');
                if (loadingScreen) {
                    loadingScreen.style.display = 'none';
                }
            }, 1500);
        });
    </script>
</body>
</html>


And here's the debugged utils.js file with the fixed `requestAnimationFrame` method:


// Utility Functions for Inklings Art Studio Pro

class Utils {
  // Color utilities
  static hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  static rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  static getRandomColor() {
    const colors = [
      '#ff6b9d', '#a855f7', '#06d6a0', '#3b82f6', '#f59e0b',
      '#ef4444', '#10b981', '#8b5cf6', '#f97316', '#ec4899',
      '#14b8a6', '#6366f1', '#84cc16', '#f43f5e', '#22d3ee'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  static adjustColorBrightness(hex, percent) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;
    
    const adjust = (color) => {
      const adjusted = Math.round(color * (100 + percent) / 100);
      return Math.max(0, Math.min(255, adjusted));
    };
    
    return this.rgbToHex(adjust(rgb.r), adjust(rgb.g), adjust(rgb.b));
  }

  // Canvas utilities
  static downloadCanvas(canvas, filename = 'inklings-artwork.png') {
    try {
      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      this.showNotification('Artwork downloaded successfully! 🎨', 'success');
    } catch (error) {
      console.error('Download failed:', error);
      this.showNotification('Download failed. Please try again.', 'error');
    }
  }

  static clearCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  static resizeCanvas(canvas, width, height) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    canvas.width = width;
    canvas.height = height;
    
    // Restore white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    
    // Scale and restore image data
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = imageData.width;
    tempCanvas.height = imageData.height;
    tempCtx.putImageData(imageData, 0, 0);
    
    ctx.drawImage(tempCanvas, 0, 0, width, height);
  }

  // Math utilities
  static distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  static angle(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
  }

  static lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  static clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  static randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // DOM utilities
  static createElement(tag, className = '', innerHTML = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
  }

  static getMousePos(canvas, e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  static getTouchPos(canvas, e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.touches[0].clientX - rect.left) * scaleX,
      y: (e.touches[0].clientY - rect.top) * scaleY
    };
  }

  // Local storage utilities
  static saveToStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true
        static saveToStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Failed to save to storage:', error);
      return false;
    }
  }

  static loadFromStorage(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error('Failed to load from storage:', error);
      return defaultValue;
    }
  }

  static removeFromStorage(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Failed to remove from storage:', error);
      return false;
    }
  }

  // Notification system
  static showNotification(message, type = 'info', duration = 3000) {
    const notification = this.createElement('div', `notification ${type}`);
    
    const iconMap = {
      success: 'fas fa-check-circle',
      error: 'fas fa-exclamation-circle',
      warning: 'fas fa-exclamation-triangle',
      info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
      <div class="notification-content">
        <i class="notification-icon ${iconMap[type]}"></i>
        <span class="notification-text">${message}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger show animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, duration);
  }

  // Animation utilities
  static easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  static easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  static easeIn(t) {
    return t * t * t;
  }

  // String utilities
  static capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static slugify(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  static truncate(str, length, suffix = '...') {
    return str.length > length ? str.substring(0, length) + suffix : str;
  }

  // Array utilities
  static shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  static chunk(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  // Debounce and throttle
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Device detection
  static isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  static isTablet() {
    return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
  }

  static isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  static supportsWebGL() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
    } catch (e) {
      return false;
    }
  }

  // Performance utilities
  static requestAnimationFrame(callback) {
    const requestFrame = window.requestAnimationFrame || 
                        window.webkitRequestAnimationFrame || 
                        window.mozRequestAnimationFrame || 
                        function(cb) { return setTimeout(cb, 1000 / 60); };
    return requestFrame(callback);
  }

  static measurePerformance(name, func) {
    const start = performance.now();
    const result = func();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
  }

  // Image utilities
  static loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  static imageToCanvas(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    return canvas;
  }

  static canvasToBlob(canvas, type = 'image/png', quality = 0.92) {
    return new Promise(resolve => {
      canvas.toBlob(resolve, type, quality);
    });
  }

  // Validation utilities
  static isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  static isValidHexColor(hex) {
    const re = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return re.test(hex);
  }

  static isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // Teen-specific utilities
  static getTeenQuotes() {
    return [
      { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
      { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
      { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
      { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
      { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
      { text: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne" },
      { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
      { text: "Your limitation—it's only your imagination.", author: "Unknown" },
      { text: "Great things never come from comfort zones.", author: "Unknown" }
    ];
  }

  static getRandomQuote() {
    const quotes = this.getTeenQuotes();
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  static getTeenColors() {
    return [
      '#ff6b9d', '#a855f7', '#06d6a0', '#3b82f6', '#f59e0b',
      '#ef4444', '#10b981', '#8b5cf6', '#f97316', '#ec4899',
      '#14b8a6', '#6366f1', '#84cc16', '#f43f5e', '#22d3ee',
      '#ff69b4', '#9370db', '#00ced1', '#ff1493', '#32cd32'
    ];
  }

  // Accessibility utilities
  static announceToScreenReader(message) {
    const announcement = this.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  }

  static setFocusToElement(element) {
    if (element && typeof element.focus === 'function') {
      element.focus();
    }
  }

  static trapFocus(container) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    container.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  }

  // Error handling
  static handleError(error, context = 'Unknown') {
    console.error(`Error in ${context}:`, error);
    this.showNotification(`Something went wrong in ${context}. Please try again.`, 'error');
  }

  // Feature detection
  static supportsLocalStorage() {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  static supportsCanvas() {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext && canvas.getContext('2d'));
  }

  static supportsWebRTC() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  // Format utilities
  static formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  static formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  // Canvas effects utilities
  static createGradient(ctx, x1, y1, x2, y2, colors) {
    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    colors.forEach((color, index) => {
      gradient.addColorStop(index / (colors.length - 1), color);
    });
    return gradient;
  }

  static createRadialGradient(ctx, x, y, r, colors) {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    colors.forEach((color, index) => {
      gradient.addColorStop(index / (colors.length - 1), color);
    });
    return gradient;
  }

  // Initialize utilities
  static init() {
    // Add mobile viewport meta tag if not present
    if (!document.querySelector('meta[name="viewport"]')) {
      const viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1.0, user-scalable=no';
      document.head.appendChild(viewport);
    }

    // Prevent default touch behaviors on canvas
    document.addEventListener('touchstart', (e) => {
      if (e.target.tagName === 'CANVAS') {
        e.preventDefault();
      }
    }, { passive: false });

    document.addEventListener('touchend', (e) => {
      if (e.target.tagName === 'CANVAS') {
        e.preventDefault();
      }
    }, { passive: false });

    document.addEventListener('touchmove', (e) => {
      if (e.target.tagName === 'CANVAS') {
        e.preventDefault();
      }
    }, { passive: false });

    // Add error handling for unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      this.showNotification('An unexpected error occurred. Please refresh the page.', 'error');
    });

    console.log('🎨 Inklings Art Studio Pro Utils initialized!');
  }
}

// Auto-initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Utils.init());
} else {
  Utils.init();
}

// Export for use in other modules
window.Utils = Utils;
