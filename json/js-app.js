    this.canvas.height = this.settings.canvasHeight;
    
    // Restore the image data
    this.ctx.putImageData(imageData, 0, 0);
    
    // Reconfigure for high DPI
    this.configureHighDPI();
    
    Utils.showNotification('Canvas resized', 'info');
  }

  redrawCanvas() {
    // This would redraw from saved layers/history
    // For now, we'll just clear and restore background
    this.ctx.fillStyle = this.settings.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Undo/Redo system
  saveState() {
    if (this.undoStack.length >= this.maxUndoSteps) {
      this.undoStack.shift();
    }
    
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.undoStack.push(imageData);
    this.redoStack = []; // Clear redo stack when new action is performed
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

  // File operations
  newArtwork() {
    if (this.hasUnsavedChanges()) {
      if (!confirm('You have unsaved changes. Create new artwork anyway?')) {
        return;
      }
    }
    
    this.clearCanvas();
    this.undoStack = [];
    this.redoStack = [];
    Utils.showNotification('New artwork created', 'success');
  }

  async saveArtwork() {
    try {
      const imageData = this.canvas.toDataURL('image/png');
      const artwork = {
        id: Date.now(),
        name: `Artwork ${new Date().toLocaleDateString()}`,
        data: imageData,
        timestamp: new Date().toISOString(),
        settings: { ...this.settings }
      };

      await this.gallery.saveArtwork(artwork);
      Utils.showNotification('Artwork saved! 💾', 'success');
      this.refreshGallery();
      
    } catch (error) {
      Utils.handleError(error, 'Save Artwork');
    }
  }

  async loadArtwork() {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*,.json';
      
      input.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type.startsWith('image/')) {
          await this.loadImageFile(file);
        } else if (file.name.endsWith('.json')) {
          await this.loadArtworkFile(file);
        }
      };

      input.click();
      
    } catch (error) {
      Utils.handleError(error, 'Load Artwork');
    }
  }

  async loadImageFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          this.saveState();
          this.ctx.drawImage(img, 0, 0);
          Utils.showNotification('Image loaded!', 'success');
          resolve();
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async loadArtworkFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const artwork = JSON.parse(e.target.result);
          await this.loadArtworkData(artwork);
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  async loadArtworkData(artwork) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.saveState();
        this.clearCanvas();
        this.ctx.drawImage(img, 0, 0);
        
        // Restore settings if available
        if (artwork.settings) {
          this.settings = { ...this.settings, ...artwork.settings };
          this.updateUIFromSettings();
        }
        
        Utils.showNotification('Artwork loaded!', 'success');
        resolve();
      };
      img.onerror = reject;
      img.src = artwork.data;
    });
  }

  exportArtwork() {
    const format = document.getElementById('exportFormat')?.value || 'png';
    const quality = parseFloat(document.getElementById('exportQuality')?.value || '0.9');
    
    let mimeType, filename;
    
    switch (format) {
      case 'jpg':
        mimeType = 'image/jpeg';
        filename = `artwork-${Date.now()}.jpg`;
        break;
      case 'webp':
        mimeType = 'image/webp';
        filename = `artwork-${Date.now()}.webp`;
        break;
      default:
        mimeType = 'image/png';
        filename = `artwork-${Date.now()}.png`;
    }

    const dataURL = this.canvas.toDataURL(mimeType, quality);
    Utils.downloadDataURL(dataURL, filename);
    
    Utils.showNotification(`Artwork exported as ${format.toUpperCase()}! 📤`, 'success');
  }

  async shareArtwork() {
    try {
      if (navigator.share) {
        // Use native sharing if available
        this.canvas.toBlob(async (blob) => {
          const file = new File([blob], 'artwork.png', { type: 'image/png' });
          
          await navigator.share({
            title: 'My ArtStudio Creation',
            text: 'Check out my digital artwork!',
            files: [file]
          });
        });
      } else {
        // Fallback to copying image data
        this.canvas.toBlob(async (blob) => {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            Utils.showNotification('Artwork copied to clipboard! 📋', 'success');
          } catch (error) {
            // Final fallback - download
            this.exportArtwork();
          }
        });
      }
    } catch (error) {
      Utils.handleError(error, 'Share Artwork');
    }
  }

  // Gallery management
  async refreshGallery() {
    try {
      const galleryGrid = document.getElementById('galleryGrid');
      if (!galleryGrid) return;

      const artworks = await this.gallery.getArtworks();
      
      galleryGrid.innerHTML = '';
      
      if (artworks.length === 0) {
        galleryGrid.innerHTML = '<p class="no-artworks">No saved artworks yet. Create something amazing! ✨</p>';
        return;
      }

      artworks.forEach(artwork => {
        const item = this.createGalleryItem(artwork);
        galleryGrid.appendChild(item);
      });
      
    } catch (error) {
      Utils.handleError(error, 'Gallery');
    }
  }

  createGalleryItem(artwork) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `
      <img src="${artwork.data}" alt="${artwork.name}" loading="lazy">
      <div class="gallery-item-info">
        <h4>${artwork.name}</h4>
        <p>${new Date(artwork.timestamp).toLocaleDateString()}</p>
        <div class="gallery-item-actions">
          <button class="btn-icon" onclick="app.loadGalleryItem('${artwork.id}')" title="Load">
            <i class="fas fa-folder-open"></i>
          </button>
          <button class="btn-icon" onclick="app.deleteGalleryItem('${artwork.id}')" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;
    
    return item;
  }

  async loadGalleryItem(id) {
    try {
      const artwork = await this.gallery.getArtwork(id);
      if (artwork) {
        await this.loadArtworkData(artwork);
      }
    } catch (error) {
      Utils.handleError(error, 'Load Gallery Item');
    }
  }

  async deleteGalleryItem(id) {
    if (!confirm('Are you sure you want to delete this artwork?')) {
      return;
    }

    try {
      await this.gallery.deleteArtwork(id);
      this.refreshGallery();
      Utils.showNotification('Artwork deleted', 'info');
    } catch (error) {
      Utils.handleError(error, 'Delete Gallery Item');
    }
  }

  // UI updates
  updateToolbarState() {
    // Update tool buttons
    document.querySelectorAll('[data-tool]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tool === this.currentTool);
    });

    // Update mode buttons
    document.querySelectorAll('[data-mode]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === this.currentMode);
    });
  }

  updateBrushPreview() {
    const preview = document.getElementById('brushPreview');
    if (!preview) return;

    const size = this.settings.brushSize;
    const color = this.settings.brushColor;
    
    preview.style.width = `${Math.min(size, 50)}px`;
    preview.style.height = `${Math.min(size, 50)}px`;
    preview.style.backgroundColor = color;
    preview.style.opacity = this.settings.brushOpacity;
  }

  updateBrushTypeState() {
    document.querySelectorAll('[data-brush-type]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.brushType === this.settings.brushType);
    });
  }

  updateTextStyleState() {
    document.querySelectorAll('[data-text-style]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.textStyle === this.textArt.currentStyle);
    });
  }

  updateColorPreview() {
    const preview = document.getElementById('colorPreview');
    if (preview) {
      preview.style.backgroundColor = this.settings.brushColor;
    }

    // Update color picker
    const colorPicker = document.getElementById('colorPicker');
    if (colorPicker) {
      colorPicker.value = this.settings.brushColor;
    }
  }

  updateCursor(x, y) {
    const cursor = this.getCursorForTool();
    this.canvas.style.cursor = cursor;
  }

  getCursorForTool() {
    const cursors = {
      brush: 'crosshair',
      eraser: 'crosshair',
      text: 'text',
      line: 'crosshair',
      rectangle: 'crosshair',
      circle: 'crosshair',
      eyedropper: 'crosshair'
    };
    
    return cursors[this.currentTool] || 'default';
  }

  updateUIFromSettings() {
    // Update all UI elements to reflect current settings
    const elements = {
      brushSize: this.settings.brushSize,
      brushOpacity: this.settings.brushOpacity,
      canvasWidth: this.settings.canvasWidth,
      canvasHeight: this.settings.canvasHeight,
      backgroundColor: this.settings.backgroundColor,
      gridToggle: this.settings.gridEnabled,
      autoSaveToggle: this.settings.autoSave
    };

    Object.keys(elements).forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        if (element.type === 'checkbox') {
          element.checked = elements[id];
        } else {
          element.value = elements[id];
        }
      }
    });

    this.updateBrushPreview();
    this.updateColorPreview();
  }

  // Settings management
  loadSettings() {
    try {
      const saved = localStorage.getItem('artstudio-settings');
      if (saved) {
        const settings = JSON.parse(saved);
        this.settings = { ...this.settings, ...settings };
        this.updateUIFromSettings();
      }
    } catch (error) {
      console.warn('Failed to load settings:', error);
    }
  }

  saveSettings() {
    try {
      localStorage.setItem('artstudio-settings', JSON.stringify(this.settings));
    } catch (error) {
      console.warn('Failed to save settings:', error);
    }
  }

  // Auto-save functionality
  autoSave() {
    if (!this.settings.autoSave) return;
    
    try {
      const imageData = this.canvas.toDataURL('image/png');
      localStorage.setItem('artstudio-autosave', imageData);
      localStorage.setItem('artstudio-autosave-timestamp', Date.now().toString());
    } catch (error) {
      console.warn('Auto-save failed:', error);
    }
  }

  loadAutoSave() {
    try {
      const imageData = localStorage.getItem('artstudio-autosave');
      const timestamp = localStorage.getItem('artstudio-autosave-timestamp');
      
      if (imageData && timestamp) {
        const age = Date.now() - parseInt(timestamp);
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours
        
        if (age < maxAge) {
          const img = new Image();
          img.onload = () => {
            this.ctx.drawImage(img, 0, 0);
            Utils.showNotification('Auto-saved work restored', 'info');
          };
          img.src = imageData;
        }
      }
    } catch (error) {
      console.warn('Failed to load auto-save:', error);
    }
  }

  // Utility methods
  hasUnsavedChanges() {
    // Simple check - in a real app, you'd track changes more precisely
    return this.undoStack.length > 0;
  }

  toggleTool() {
    const tools = ['brush', 'eraser'];
    const currentIndex = tools.indexOf(this.currentTool);
    const nextIndex = (currentIndex + 1) % tools.length;
    this.setTool(tools[nextIndex]);
  }

  toggleGrid() {
    // Grid implementation would go here
    Utils.showNotification(
      this.settings.gridEnabled ? 'Grid enabled' : 'Grid disabled',
      'info'
    );
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  toggleAR() {
    if (this.currentMode === 'ar') {
      this.setMode('draw');
    } else {
      this.setMode('ar');
    }
  }

  // Welcome message
  showWelcomeMessage() {
    const isFirstVisit = !localStorage.getItem('artstudio-visited');
    
    if (isFirstVisit) {
      setTimeout(() => {
        Utils.showNotification(
          'Welcome to ArtStudio Teen! 🎨 Start creating amazing digital art!',
          'success',
          5000
        );
        localStorage.setItem('artstudio-visited', 'true');
      }, 1000);
    } else {
      // Try to load auto-save
      this.loadAutoSave();
    }
  }

  // Cleanup
  destroy() {
    // Clean up event listeners and resources
    this.arStencils?.destroy();
    this.effects?.destroy();
    
    // Save settings before exit
    this.saveSettings();
    
    // Auto-save current work
    if (this.settings.autoSave) {
      this.autoSave();
    }
  }
}

// Initialize the application when the page loads
let app;

document.addEventListener('DOMContentLoaded', () => {
  app = new ArtStudioApp();
});

// Handle page unload
window.addEventListener('beforeunload', () => {
  if (app) {
    app.destroy();
  }
});

// Export for global access
window.ArtStudioApp = ArtStudioApp;
