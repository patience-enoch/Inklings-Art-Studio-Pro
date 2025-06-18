
Here's the continuation of your main.js file:


      if (localStorage.getItem('inklings-large-buttons') === 'true') {
        document.body.classList.add('large-buttons');
        document.getElementById('largeButtonsToggle')?.classList.add('active');
      }
      
      if (localStorage.getItem('inklings-screen-reader') === 'true') {
        document.getElementById('screenReaderToggle')?.classList.add('active');
      }
    } catch (error) {
      console.warn('Failed to load settings:', error);
    }
  }
  
  // Auto-save functionality
  autoSave() {
    if (!this.settings.autoSave) return;
    
    try {
      const imageData = this.canvas.toDataURL('image/png');
      localStorage.setItem('inklings-autosave', imageData);
      localStorage.setItem('inklings-autosave-timestamp', Date.now().toString());
    } catch (error) {
      console.warn('Auto-save failed:', error);
    }
  }
  
  loadAutoSave() {
    try {
      const imageData = localStorage.getItem('inklings-autosave');
      const timestamp = localStorage.getItem('inklings-autosave-timestamp');
      
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
  
  updateToolbarState() {
    // Update active tool in toolbar
    document.querySelectorAll('[data-tool]').forEach(tool => {
      tool.classList.toggle('active', tool.dataset.tool === this.currentTool);
    });
  }
  
  updateCursor() {
    // Update cursor based on current tool
    let cursorClass = '';
    
    switch (this.currentTool) {
      case 'brush':
      case 'pencil':
      case 'marker':
        cursorClass = 'cursor-brush';
        break;
      case 'eraser':
        cursorClass = 'cursor-eraser';
        break;
      case 'fill':
        cursorClass = 'cursor-fill';
        break;
      case 'text':
        cursorClass = 'cursor-text';
        break;
      case 'line':
      case 'rectangle':
      case 'circle':
      case 'triangle':
        cursorClass = 'cursor-shape';
        break;
      case 'spray':
        cursorClass = 'cursor-spray';
        break;
      default:
        cursorClass = '';
    }
    
    this.canvas.className = cursorClass;
  }
  
  updateColorPreview() {
    const preview = document.getElementById('colorPreview');
    if (preview) {
      preview.style.backgroundColor = this.settings.brushColor;
    }
  }
  
  showWelcomeMessage() {
    // Show welcome message for first-time users
    if (!localStorage.getItem('inklings-welcomed')) {
      Utils.showNotification('Welcome to Inklings Art Studio Pro! 🎨', 'info', 5000);
      localStorage.setItem('inklings-welcomed', 'true');
    }
    
    // Show tip of the day
    this.showTipOfTheDay();
  }
  
  showTipOfTheDay() {
    const tips = [
      'Use the keyboard shortcut Ctrl+Z to undo your last action.',
      'Try the AR mode to trace real-world objects!',
      'Double-click on the canvas to quickly toggle between brush and eraser.',
      'Use the Text Art tool to add stylish text to your creations.',
      'Experiment with different Magic Effects for unique results!',
      'Save your artwork often using the Save button or Ctrl+S.',
      'Adjust brush size with the slider for more control.',
      'Try the Teen Templates for quick inspiration!',
      'Use the Accessibility panel to customize your experience.',
      'Share your creations directly from the app!'
    ];
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTimeout(() => {
      Utils.showNotification(`Tip: ${randomTip}`, 'info', 8000);
    }, 3000);
  }
  
  newArtwork() {
    if (this.hasUnsavedChanges()) {
      if (confirm('You have unsaved changes. Are you sure you want to start a new artwork?')) {
        this.clearCanvas();
      }
    } else {
      this.clearCanvas();
    }
  }
  
  loadArtwork() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            // Save state for undo
            this.saveState();
            
            // Clear canvas
            Utils.clearCanvas(this.canvas);
            
            // Draw image
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            
            Utils.showNotification('Artwork loaded successfully!', 'success');
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new InklingsArtStudioApp();
});


T
