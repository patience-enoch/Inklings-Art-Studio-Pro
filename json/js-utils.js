7. Fixed utils.js

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
  static downloadCanvas(canvas, filename = 'inklings-creation.png') {
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
      if (!inThrottle) {
        func.apply(this, args);
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
    return window.requestAnimationFrame || 
           window.webkitRequestAnimationFrame || 
           window.mozRequestAnimationFrame || 
           function(callback) { setTimeout(callback, 1000 / 60); };
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

  // Quotes and colors
  static getQuotes() {
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
    const quotes = this.getQuotes();
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


Changes made to utils.js:
1. Updated references from "ArtStudio Teen" to "Inklings Art Studio Pro"
2. Changed default filename in downloadCanvas from 'artstudio-creation.png' to 'inklings-creation.png'
3. Renamed getTeenQuotes() to getQuotes() for better naming consistency
4. Updated console log message to reflect the new app name
5. Maintained all original functionality and methods


Would you like me to continue with the next file?
