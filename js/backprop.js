// Simple Backpropagation Demo
class BackpropDemo {
  constructor() {
    this.canvas = document.getElementById('bp-network');
    this.ctx = this.canvas.getContext('2d');
    this.currentStep = 0;
    this.maxSteps = 12; // Més passos per ser més detallat
    this.isPlaying = false;
    this.playInterval = null;
    
    // Neural network structure - XOR example with normalized weights
    this.network = {
      inputs: [1, 0], // XOR input: 1 XOR 0 = 1
      hiddenWeights: [[0.8, -0.6], [0.5, 0.9]], // Weights between -1 and 1
      hiddenBiases: [0, -0.3], // Biases between -1 and 1
      outputWeights: [0.7, -0.8], // Output weights between -1 and 1
      outputBias: 0, // No output bias for simplicity
      hiddenOutputs: [0, 0],
      finalOutput: 0,
      target: 1, // XOR(1,0) should be 1
      error: 0
    };
    
    this.setupEventListeners();
    this.updateDisplay();
  }
  
  setupEventListeners() {
    document.getElementById('bp-reset').onclick = () => this.reset();
    document.getElementById('bp-step').onclick = () => this.nextStep();
    document.getElementById('bp-prev').onclick = () => this.prevStep();
    document.getElementById('bp-play').onclick = () => this.togglePlay();
    
    document.getElementById('lr').oninput = (e) => {
      document.getElementById('lr-value').textContent = e.target.value;
    };
    
    document.getElementById('speed').oninput = (e) => {
      document.getElementById('speed-value').textContent = e.target.value + 'ms';
    };
  }
  
  reset() {
    this.currentStep = 0;
    this.isPlaying = false;
    if (this.playInterval) clearInterval(this.playInterval);
    
    // Reset network to initial state - XOR example
    this.network.hiddenWeights = [[0.8, -0.6], [0.5, 0.9]];
    this.network.hiddenBiases = [0, -0.3];
    this.network.outputWeights = [0.7, -0.8];
    this.network.outputBias = 0;
    
    this.updateDisplay();
  }
  
  nextStep() {
    if (this.currentStep < this.maxSteps) {
      this.currentStep++;
      this.updateDisplay();
    }
  }
  
  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.updateDisplay();
    }
  }
  
  togglePlay() {
    this.isPlaying = !this.isPlaying;
    const btn = document.getElementById('bp-play');
    
    if (this.isPlaying) {
      btn.textContent = '⏸ Pause';
      const speed = parseInt(document.getElementById('speed').value);
      this.playInterval = setInterval(() => {
        if (this.currentStep >= this.maxSteps) {
          this.togglePlay();
        } else {
          this.nextStep();
        }
      }, speed);
    } else {
      btn.textContent = '⏯ Auto Play';
      if (this.playInterval) clearInterval(this.playInterval);
    }
  }
  
  updateDisplay() {
    this.updateButtons();
    this.updatePhaseLabel();
    this.drawNetwork();
    this.updateEquations();
    this.computeStep();
  }
  
  updateButtons() {
    document.getElementById('bp-prev').disabled = this.currentStep === 0;
    document.getElementById('bp-step').disabled = this.currentStep >= this.maxSteps;
  }
  
  updatePhaseLabel() {
    const phases = [
      "Initialize Network",
      "Forward Pass - Input Layer",
      "Forward Pass - Hidden Neuron z₁",
      "Forward Pass - Hidden Neuron z₂", 
      "Forward Pass - Output Layer",
      "Compute Loss Function",
      "Backward Pass - Output Error Gradient",
      "Backward Pass - Hidden Layer Error z₁",
      "Backward Pass - Hidden Layer Error z₂",
      "Update Output Layer Weights",
      "Update Hidden Layer Weights z₁",
      "Update Hidden Layer Weights z₂",
      "Training Iteration Complete"
    ];
    
    document.getElementById('bp-phase-label').textContent = 
      `Step ${this.currentStep + 1}: ${phases[this.currentStep]}`;
  }
  
  computeStep() {
    switch(this.currentStep) {
      case 2: // Forward pass - hidden neuron z1
        this.network.hiddenOutputs[0] = this.sigmoid(
          this.network.inputs[0] * this.network.hiddenWeights[0][0] + 
          this.network.inputs[1] * this.network.hiddenWeights[0][1] + 
          this.network.hiddenBiases[0]
        );
        break;
        
      case 3: // Forward pass - hidden neuron z2
        this.network.hiddenOutputs[1] = this.sigmoid(
          this.network.inputs[0] * this.network.hiddenWeights[1][0] + 
          this.network.inputs[1] * this.network.hiddenWeights[1][1] + 
          this.network.hiddenBiases[1]
        );
        break;
        
      case 4: // Forward pass - output layer
        this.network.finalOutput = this.sigmoid(
          this.network.hiddenOutputs[0] * this.network.outputWeights[0] + 
          this.network.hiddenOutputs[1] * this.network.outputWeights[1] + 
          this.network.outputBias
        );
        break;
        
      case 5: // Compute loss
        this.network.error = 0.5 * Math.pow(this.network.target - this.network.finalOutput, 2);
        document.getElementById('bp-loss').textContent = this.formatNumber(this.network.error);
        break;
    }
  }
  
  sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }
  
  // Smart number formatting: remove unnecessary zeros and limit to 2 decimals
  formatNumber(num) {
    if (Number.isInteger(num)) return num.toString();
    let formatted = num.toFixed(2);
    // Remove trailing zeros: 1.00 -> 1, 0.80 -> 0.8
    return formatted.replace(/\.?0+$/, '');
  }
  
  drawNetwork() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Millor centrat i equidistant - usa tot l'ample del canvas
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    const margin = 100;
    
    // Posicions X equidistants
    const inputX = margin + 80;
    const hiddenX = canvasWidth / 2;
    const outputX = canvasWidth - margin - 80;
    
    // Posicions Y centrades verticalment
    const centerY = canvasHeight / 2;
    const nodeSpacing = 80;
    
    // Input layer (2 neurones centrades)
    const inputY = [centerY - nodeSpacing/2, centerY + nodeSpacing/2];
    
    // Hidden layer (2 neurones centrades)
    const hiddenY = [centerY - nodeSpacing/2, centerY + nodeSpacing/2];
    
    // Output layer (1 neurona centrada)
    const outputY = centerY;
    
    // Draw connections first (behind nodes) 
    this.drawConnections3B1B(inputX, inputY, hiddenX, hiddenY, this.currentStep >= 1);
    this.drawConnections3B1B(hiddenX, hiddenY, outputX, [outputY], this.currentStep >= 4);
    
    // Draw nodes with grayscale style (no colors)
    this.drawNode3B1B(inputX, inputY[0], this.network.inputs[0], 'input', this.currentStep >= 1);
    this.drawNode3B1B(inputX, inputY[1], this.network.inputs[1], 'input', this.currentStep >= 1);
    
    // Hidden nodes - show individual activation based on step
    const showHidden1 = this.currentStep >= 2;
    const showHidden2 = this.currentStep >= 3;
    this.drawNode3B1B(hiddenX, hiddenY[0], this.network.hiddenOutputs[0], 'hidden', showHidden1);
    this.drawNode3B1B(hiddenX, hiddenY[1], this.network.hiddenOutputs[1], 'hidden', showHidden2);
    
    this.drawNode3B1B(outputX, outputY, this.network.finalOutput, 'output', this.currentStep >= 4);
    
    // Draw layer labels
    this.ctx.fillStyle = '#1e40af';
    this.ctx.font = 'bold 16px SF Pro Display, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Input', inputX, 80);
    this.ctx.fillText('Hidden', hiddenX, 80);
    this.ctx.fillText('Output', outputX, 80);
  }
  
  // 3Blue1Brown style node rendering (simple grayscale, no colors)
  drawNode3B1B(x, y, value, type, active) {
    const radius = 38; // Increased from 32 to 38
    
    // More pronounced grayscale: 0 = dark gray, 1 = white
    let grayValue = active ? Math.round(50 + value * 180) : 160; // Wider range: 50-255
    let fillColor = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
    
    // Simple gray rim - no colors
    let rimColor = active ? '#4b5563' : '#9ca3af';
    
    // Draw outer rim
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius + 2, 0, 2 * Math.PI);
    this.ctx.fillStyle = rimColor;
    this.ctx.fill();
    
    // Draw main node
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = fillColor;
    this.ctx.fill();
    
    // Draw subtle inner highlight for 3D effect
    if (active && value > 0.3) {
      this.ctx.beginPath();
      this.ctx.arc(x - 8, y - 8, radius * 0.3, 0, 2 * Math.PI);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${value * 0.4})`;
      this.ctx.fill();
    }
    
    // Draw activation value INSIDE the neuron
    if (active && value > 0) {
      this.ctx.fillStyle = grayValue > 150 ? '#1e293b' : '#ffffff';
      this.ctx.font = 'bold 14px SF Mono, monospace'; // Increased from 12px to 14px
      this.ctx.textAlign = 'center';
      this.ctx.fillText(this.formatNumber(value), x, y + 4);
    }
  }
  
  // 3Blue1Brown style connections (blue for positive weights, red for negative)
  drawConnections3B1B(fromX, fromY, toX, toY, active) {
    if (!Array.isArray(fromY)) fromY = [fromY];
    if (!Array.isArray(toY)) toY = [toY];
    
    const weights = fromX < 300 ? this.network.hiddenWeights : this.network.outputWeights;
    
    fromY.forEach((fy, i) => {
      toY.forEach((ty, j) => {
        let weight = Array.isArray(weights[0]) ? weights[i][j] : weights[j];
        let color = active ? (weight >= 0 ? '#3b82f6' : '#ef4444') : '#94a3b8';
        
        // Line thickness based on weight magnitude
        let lineWidth = active ? Math.max(2, Math.abs(weight) * 6) : 2;
        
        this.ctx.beginPath();
        this.ctx.moveTo(fromX + 38, fy); // Adjusted for larger radius
        this.ctx.lineTo(toX - 38, ty);   // Adjusted for larger radius
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.stroke();
        
        // Draw weight value on connection when active and relevant
        if (active) {
          const midX = (fromX + toX) / 2;
          const midY = (fy + ty) / 2;
          
          // Show weights only when they're being used in current step
          let showWeight = false;
          if (this.currentStep >= 2 && fromX < 300) showWeight = true; // Input to hidden
          if (this.currentStep >= 4 && fromX > 300) showWeight = true; // Hidden to output
          
          if (showWeight) {
            this.ctx.fillStyle = weight >= 0 ? '#3b82f6' : '#ef4444';
            this.ctx.font = 'bold 12px SF Mono, monospace'; // Més gran
            this.ctx.textAlign = 'center';
            this.ctx.fillText(this.formatNumber(weight), midX, midY - 8);
          }
        }
      });
    });
  }
  
  updateEquations() {
    const overlay = document.getElementById('bp-equation-overlay');
    const equations = this.getEquationsForStep();
    
    overlay.innerHTML = equations.map(eq => 
      `<div class="eq-line">${eq}</div>`
    ).join('');
    
    // Re-render MathJax if available
    if (window.MathJax) {
      MathJax.typesetPromise([overlay]).catch(err => console.log('MathJax error:', err));
    }
  }
  
  getEquationsForStep() {
    switch(this.currentStep) {
      case 0: return [
        '🧠 Neural Network Ready',
        '$W \\in [-1, 1]$, $b \\in [-1, 1]$',
        '$\\mathbf{x} = [1, 0]^T$ (XOR input)',
        '$y_{target} = 1$ (XOR output: 1⊕0=1)'
      ];
      case 1: return [
        '➡️ Forward Pass: Input Layer Active',
        '$\\mathbf{x} = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}$',
        'XOR input loaded: first bit = 1, second bit = 0',
        'Expected output: 1 ⊕ 0 = 1'
      ];
      case 2: return [
        '🔄 Computing Hidden Neuron $z_1$',
        '$z_1 = w_{1,1} x_1 + w_{1,2} x_2 + b_1$',
        `$z_1 = ${this.formatNumber(this.network.hiddenWeights[0][0])} \\cdot 1 + ${this.formatNumber(this.network.hiddenWeights[0][1])} \\cdot 0 + ${this.formatNumber(this.network.hiddenBiases[0])}$`,
        `$z_1 = ${this.formatNumber(this.network.hiddenWeights[0][0])} + 0 + ${this.formatNumber(this.network.hiddenBiases[0])} = ${this.formatNumber(this.network.hiddenWeights[0][0] + this.network.hiddenBiases[0])}$`,
        `$a_1 = \\sigma(z_1) = ${this.formatNumber(this.network.hiddenOutputs[0])}$`
      ];
      case 3: return [
        '🔄 Computing Hidden Neuron $z_2$',
        '$z_2 = w_{2,1} x_1 + w_{2,2} x_2 + b_2$',
        `$z_2 = ${this.formatNumber(this.network.hiddenWeights[1][0])} \\cdot 1 + ${this.formatNumber(this.network.hiddenWeights[1][1])} \\cdot 0 + ${this.formatNumber(this.network.hiddenBiases[1])}$`,
        `$z_2 = ${this.formatNumber(this.network.hiddenWeights[1][0])} + 0 + ${this.formatNumber(this.network.hiddenBiases[1])} = ${this.formatNumber(this.network.hiddenWeights[1][0] + this.network.hiddenBiases[1])}$`,
        `$a_2 = \\sigma(z_2) = ${this.formatNumber(this.network.hiddenOutputs[1])}$`
      ];
      case 4: return [
        '🎯 Computing Output Layer',
        '$z^{out} = w_1^{out} a_1 + w_2^{out} a_2 + b^{out}$',
        `$z^{out} = ${this.formatNumber(this.network.outputWeights[0])} \\cdot ${this.formatNumber(this.network.hiddenOutputs[0])} + ${this.formatNumber(this.network.outputWeights[1])} \\cdot ${this.formatNumber(this.network.hiddenOutputs[1])} + ${this.formatNumber(this.network.outputBias)}$`,
        `$\\hat{y} = \\sigma(z^{out}) = ${this.formatNumber(this.network.finalOutput)}$`,
        'Should be close to 1 for XOR(1,0)'
      ];
      case 5: return [
        '📊 Computing Loss Function',
        '$\\mathcal{L} = \\frac{1}{2}(y - \\hat{y})^2$',
        `$\\mathcal{L} = \\frac{1}{2}(${this.network.target} - ${this.formatNumber(this.network.finalOutput)})^2$`,
        `$\\mathcal{L} = ${this.formatNumber(this.network.error)}$`,
        'Lower is better - how far are we from XOR(1,0)=1?'
      ];
      case 6: return [
        '⬅️ Backprop: Output Layer Gradient',
        '$\\frac{\\partial \\mathcal{L}}{\\partial \\hat{y}} = -(y - \\hat{y})$',
        '$\\delta^{out} = \\frac{\\partial \\mathcal{L}}{\\partial \\hat{y}} \\cdot \\sigma\'(z^{out})$',
        '$\\sigma\'(z) = \\sigma(z)(1 - \\sigma(z))$',
        'Output error computed'
      ];
      case 7: return [
        '🔙 Hidden Layer Error: $z_1$',
        '$\\frac{\\partial \\mathcal{L}}{\\partial a_1} = w_1^{out} \\cdot \\delta^{out}$',
        '$\\delta_1 = \\frac{\\partial \\mathcal{L}}{\\partial a_1} \\cdot \\sigma\'(z_1)$',
        'Error for $z_1$ computed'
      ];
      case 8: return [
        '🔙 Hidden Layer Error: $z_2$',
        '$\\frac{\\partial \\mathcal{L}}{\\partial a_2} = w_2^{out} \\cdot \\delta^{out}$',
        '$\\delta_2 = \\frac{\\partial \\mathcal{L}}{\\partial a_2} \\cdot \\sigma\'(z_2)$',
        'Error for $z_2$ computed'
      ];
      case 9: return [
        '🔄 Update Output Weights',
        '$w^{out} \\leftarrow w^{out} - \\alpha \\frac{\\partial \\mathcal{L}}{\\partial w^{out}}$',
        '$b^{out} \\leftarrow b^{out} - \\alpha \\frac{\\partial \\mathcal{L}}{\\partial b^{out}}$',
        '$\\alpha = 0.5$ (learning rate from slider)'
      ];
      case 10: return [
        '🔄 Update Hidden Weights: $z_1$',
        '$w_{1,j} \\leftarrow w_{1,j} - \\alpha \\delta_1 x_j$',
        '$b_1 \\leftarrow b_1 - \\alpha \\delta_1$',
        'Weights for neuron $z_1$ updated'
      ];
      case 11: return [
        '🔄 Update Hidden Weights: $z_2$',
        '$w_{2,j} \\leftarrow w_{2,j} - \\alpha \\delta_2 x_j$',
        '$b_2 \\leftarrow b_2 - \\alpha \\delta_2$',
        'Weights for neuron $z_2$ updated'
      ];
      case 12: return [
        '✅ Training Iteration Complete',
        'Forward pass: $\\mathbf{x} \\rightarrow \\mathbf{h} \\rightarrow \\hat{y}$ ✓',
        'Loss computation: $\\mathcal{L}(y, \\hat{y})$ ✓',
        'Backpropagation: $\\nabla \\mathcal{L}$ ✓',
        'Weight updates: $\\theta \\leftarrow \\theta - \\alpha \\nabla \\mathcal{L}$ ✓'
      ];
      default: return ['Ready to start...'];
    }
  }
}

// Initialize demo when page loads
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('bp-network')) {
    new BackpropDemo();
  }
});
