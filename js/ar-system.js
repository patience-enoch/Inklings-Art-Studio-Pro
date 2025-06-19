/**
 * AR Stencils Module for Inklings Art Studio Pro
 */

class ARStencils {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.video = document.getElementById('cameraVideo');
    this.overlay = document.getElementById('arOverlay');
    this.stencilOverlay = document.getElementById('arStencilOverlay');
    this.currentStencil = null;
    this.stencilOpacity = 0.6;
    this.stencilScale = 1.0;
    
    console.log('AR Stencils module initialized');
  }
  
  async startAR() {
    try {
      // Check if camera is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        Utils.showNotification('Camera access is not available in your browser', 'error');
        return false;
      }
      
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      // Set up video
      this.video.srcObject = stream;
      
      // Wait for video to be ready
      await new Promise(resolve => {
        this.video.onloadedmetadata = resolve;
      });
      
      Utils.showNotification('AR mode activated', 'success');
      return true;
    } catch (error) {
      console.error('Failed to start AR:', error);
      Utils.showNotification('Failed to access camera. Please check permissions.', 'error');
      return false;
    }
  }
  
  stopAR() {
    // Stop camera stream
    if (this.video && this.video.srcObject) {
      const tracks = this.video.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      this.video.srcObject = null;
    }
    
    // Clear stencil
    this.currentStencil = null;
    if (this.stencilOverlay) {
      this.stencilOverlay.innerHTML = '';
    }
    
    Utils.showNotification('AR mode deactivated', 'info');
  }
  
  setStencil(templateName) {
    this.currentStencil = templateName;
    
    // Update stencil overlay
    if (this.stencilOverlay) {
      this.stencilOverlay.innerHTML = `<div class="stencil-guide">${templateName}</div>`;
    }
    
    Utils.showNotification(`AR template set: ${templateName}`, 'info');
  }
  
  setStencilOpacity(opacity) {
    this.stencilOpacity = opacity;
    if (this.stencilOverlay) {
      this.stencilOverlay.style.opacity = opacity;
    }
  }
  
  setStencilScale(scale) {
    this.stencilScale = scale;
    if (this.stencilOverlay) {
      this.stencilOverlay.style.transform = `scale(${scale})`;
    }
  }
  
  capturePhoto() {
    if (!this.video || !this.video.videoWidth) {
      Utils.showNotification('Camera not ready', 'error');
      return null;
    }
    
    // Create temporary canvas for the photo
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = this.canvas.width;
    tempCanvas.height = this.canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    
    // Draw video frame to canvas
    const aspectRatio = this.video.videoWidth / this.video.videoHeight;
    let drawWidth = this.canvas.width;
    let drawHeight = this.canvas.width / aspectRatio;
    
    if (drawHeight < this.canvas.height) {
      drawHeight = this.canvas.height;
      drawWidth = this.canvas.height * aspectRatio;
    }
    
    const x = (this.canvas.width - drawWidth) / 2;
    const y = (this.canvas.height - drawHeight) / 2;
    
    tempCtx.drawImage(this.video, x, y, drawWidth, drawHeight);
    
    Utils.showNotification('Photo captured!', 'success');
    return tempCanvas;
  }
}

// Export for use in other modules
window.ARStencils = ARStencils;



