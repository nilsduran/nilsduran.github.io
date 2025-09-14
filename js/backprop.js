// Simple Backpropagation Demo
class BackpropDemo {
  constructor() {
    this.canvas = document.getElementById('bp-network');
    this.ctx = this.canvas.getContext('2d');
    // Set up responsive canvas sizing
    this.setupResponsiveCanvas();
    this.currentStep = 0;
  this.maxSteps = 16; // Afegim segona passada endavant per veure efecte entrenament
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
  // Learning rate configurable
  this.lr = 0.3; // augmentat per fer els canvis més visibles
  // Track which steps (updates) have been applied to avoid double-updating on re-render
  this.executedSteps = new Set();
    
  // Hover/tooltip state
  this.hover = null; // { type: 'node'|'edge', id: string, meta: {...} }
  this.layout = null; // computed positions for hit testing
  this.tooltipEl = document.getElementById('bp-tooltip');
  this.nodeRadius = Math.min((this.canvas.getBoundingClientRect().height) * (window.devicePixelRatio ? 1 : 1) * 0.12, 34); // default; will be recomputed on resize

  this.setupEventListeners();
    this.updateDisplay();
  }

  setupResponsiveCanvas() {
    // Set canvas internal dimensions based on CSS rendered size
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
    this.ctx.scale(dpr, dpr);
    
    // Store logical dimensions for drawing calculations
    this.logicalWidth = rect.width;
    this.logicalHeight = rect.height;
  }
  
  setupEventListeners() {
    document.getElementById('bp-reset').onclick = () => this.reset();
    const stepForwardBtn = document.getElementById('bp-step-forward');
    const stepBackBtn = document.getElementById('bp-step-back');
    const stepSlider = document.getElementById('bp-step-slider');
    if (stepForwardBtn) stepForwardBtn.onclick = () => this.nextStep();
    if (stepBackBtn) stepBackBtn.onclick = () => this.prevStep();
    if (stepSlider) {
      stepSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val)) {
          this.currentStep = val;
          this.updateDisplay();
        }
      });
    }
    document.getElementById('bp-play').onclick = () => this.togglePlay();
    
    document.getElementById('speed').oninput = (e) => {
      const delay = this.getDelayMs();
      const label = document.getElementById('speed-value');
      if (label) label.textContent = Math.round(delay) + 'ms';
      if (this.isPlaying) {
        if (this.playInterval) clearInterval(this.playInterval);
        this.playInterval = setInterval(() => {
          if (this.currentStep >= this.maxSteps) {
            this.togglePlay();
          } else {
            this.nextStep();
          }
        }, delay);
      }
    };
    
    // Handle window resize for responsive canvas
    window.addEventListener('resize', () => {
      this.setupResponsiveCanvas();
      this.updateDisplay();
    });

    // Mouse interactions for hover highlight + tooltip
    if (this.canvas) {
      this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
      this.canvas.addEventListener('mouseleave', () => this.onMouseLeave());
    }

    // Learning rate slider
    const lrSlider = document.getElementById('bp-lr');
    if (lrSlider) {
      lrSlider.addEventListener('input', (e) => {
        const v = parseFloat(e.target.value);
        if (!isNaN(v)) {
          this.lr = v;
          const lbl = document.getElementById('bp-lr-value');
          if (lbl) lbl.textContent = this.formatNumber(this.lr);
          // Re-render update equations if we are in update steps
          this.updateDisplay();
        }
      });
    }
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
  btn.textContent = '⏸ Pausa';
      const speed = this.getDelayMs();
      this.playInterval = setInterval(() => {
        if (this.currentStep >= this.maxSteps) {
          this.togglePlay();
        } else {
          this.nextStep();
        }
      }, speed);
    } else {
  btn.textContent = '⏯ Reprodueix';
      if (this.playInterval) clearInterval(this.playInterval);
    }
  }

  // Map slider position to delay ms so that higher position = faster (smaller delay)
  getDelayMs() {
    const slider = document.getElementById('speed');
  const min = parseFloat(slider.min || '250');
  const max = parseFloat(slider.max || '4500');
  const val = parseFloat(slider.value || ((min + max) / 2));
  // Non-linear (ease-out) invert so high values accelerate more: delay spans wider range
  const tLinear = (val - min) / (max - min);
  const t = Math.pow(tLinear, 0.6); // ease-out curve keeps more time in slower region
  const delay = max - t * (max - min);
  return delay * 1.2; // moderate slowdown
  }
  
  updateDisplay() {
  this.updateButtons();
  this.updatePhaseLabel();
  // Compute current step state BEFORE rendering so values appear immediately
  this.computeStep();
  this.drawNetwork();
  this.updateEquations();
  }
  
  updateButtons() {
  const back = document.getElementById('bp-step-back');
  const fwd = document.getElementById('bp-step-forward');
  const slider = document.getElementById('bp-step-slider');
  if (back) back.disabled = this.currentStep === 0;
  if (fwd) fwd.disabled = this.currentStep >= this.maxSteps;
  if (slider && parseInt(slider.value,10) !== this.currentStep) slider.value = this.currentStep;
  }
  
  updatePhaseLabel() {
    const phases = [
      'Pas 0: Inicialització de la xarxa',
      'Pas 1: Passada endavant - Entrada',
      'Pas 1: Passada endavant - Neurona oculta z₁',
      'Pas 1: Passada endavant - Neurona oculta z₂',
      'Pas 1: Passada endavant - Capa de sortida',
      'Pas 2: Càlcul de la funció de pèrdua',
      'Pas 3: Retropropagació - Gradient de sortida',
      'Pas 3: Retropropagació - Error a z₁',
      'Pas 3: Retropropagació - Error a z₂',
      'Pas 4: Actualització - Pesos de sortida',
      'Pas 4: Actualització - Pesos de z₁',
      'Pas 4: Actualització - Pesos de z₂',
  'Pas 5: Nova passada - z₁ (pesos actualitzats)',
  'Pas 5: Nova passada - z₂ (pesos actualitzats)',
  'Pas 5: Nova passada - Sortida (actualitzada)',
  'Pas 5: Nova pèrdua',
  'Iteració completada'
    ];
    document.getElementById('bp-phase-label').textContent = phases[this.currentStep] || '';
  }
  
  computeStep() {
  const lr = this.lr; // taxa d'aprenentatge configurable
    // ensure gradient storage
    if (!this.network.grad) {
      this.network.grad = { deltaOut: 0, deltaH: [0,0] };
    }
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
        // Guarda valors previs per poder comparar després de l'actualització
        if (!this.network.prev) {
          this.network.prev = {
            hiddenOutputs: [...this.network.hiddenOutputs],
            finalOutput: this.network.finalOutput,
            error: this.network.error
          };
        }
        break;
      case 6: { // Backprop output gradient
        // δ_out = (ŷ - y) * σ'(z_out)
        const yhat = this.network.finalOutput;
        const y = this.network.target;
        const deriv = yhat * (1 - yhat);
        this.network.grad.deltaOut = (yhat - y) * deriv;
        break;
      }
      case 7: { // Backprop hidden neuron z1
        const a1 = this.network.hiddenOutputs[0];
        const deriv1 = a1 * (1 - a1);
        this.network.grad.deltaH[0] = this.network.outputWeights[0] * this.network.grad.deltaOut * deriv1;
        break;
      }
      case 8: { // Backprop hidden neuron z2
        const a2 = this.network.hiddenOutputs[1];
        const deriv2 = a2 * (1 - a2);
        this.network.grad.deltaH[1] = this.network.outputWeights[1] * this.network.grad.deltaOut * deriv2;
        break;
      }
      case 9: { // Update output weights (only once)
        if (!this.executedSteps.has(9)) {
          const a1 = this.network.hiddenOutputs[0];
          const a2 = this.network.hiddenOutputs[1];
          const dOut = this.network.grad.deltaOut;
          const oldW = [...this.network.outputWeights];
            const oldB = this.network.outputBias;
          const dw1 = dOut * a1;
          const dw2 = dOut * a2;
          const db = dOut;
          // Apply update
          this.network.outputWeights[0] = oldW[0] - lr * dw1;
          this.network.outputWeights[1] = oldW[1] - lr * dw2;
          this.network.outputBias = oldB - lr * db;
          // Store for equation display
          this.network.grad.outputUpdate = {
            oldW, oldB, dw: [dw1, dw2], db, newW: [...this.network.outputWeights], newB: this.network.outputBias
          };
          this.executedSteps.add(9);
        }
        break;
      }
      case 10: { // Update hidden weights z1
        if (!this.executedSteps.has(10)) {
          const dH1 = this.network.grad.deltaH[0];
          const old = { w: [...this.network.hiddenWeights[0]], b: this.network.hiddenBiases[0] };
          const gradW0 = dH1 * this.network.inputs[0];
          const gradW1 = dH1 * this.network.inputs[1];
          this.network.hiddenWeights[0][0] = old.w[0] - lr * gradW0;
          this.network.hiddenWeights[0][1] = old.w[1] - lr * gradW1;
          this.network.hiddenBiases[0] = old.b - lr * dH1;
          this.network.grad.hidden1Update = { old, grad:[gradW0, gradW1], gradB: dH1, new:{ w:[...this.network.hiddenWeights[0]], b:this.network.hiddenBiases[0] } };
          this.executedSteps.add(10);
        }
        break;
      }
      case 12: { // New forward pass hidden z1 (after updates)
        // recomputem amb pesos nous
        this.network.hiddenOutputs[0] = this.sigmoid(
          this.network.inputs[0] * this.network.hiddenWeights[0][0] + 
          this.network.inputs[1] * this.network.hiddenWeights[0][1] + 
          this.network.hiddenBiases[0]
        );
        break;
      }
      case 13: { // New forward pass hidden z2
        this.network.hiddenOutputs[1] = this.sigmoid(
          this.network.inputs[0] * this.network.hiddenWeights[1][0] + 
          this.network.inputs[1] * this.network.hiddenWeights[1][1] + 
          this.network.hiddenBiases[1]
        );
        break;
      }
      case 14: { // New forward pass output
        this.network.finalOutput = this.sigmoid(
          this.network.hiddenOutputs[0] * this.network.outputWeights[0] + 
          this.network.hiddenOutputs[1] * this.network.outputWeights[1] + 
          this.network.outputBias
        );
        break;
      }
      case 15: { // New loss after update
        this.network.newError = 0.5 * Math.pow(this.network.target - this.network.finalOutput, 2);
        document.getElementById('bp-loss').textContent = this.formatNumber(this.network.newError) + ' (abans: ' + this.formatNumber(this.network.prev?.error ?? this.network.error) + ')';
        break;
      }
      case 11: { // Update hidden weights z2
        if (!this.executedSteps.has(11)) {
          const dH2 = this.network.grad.deltaH[1];
          const old = { w: [...this.network.hiddenWeights[1]], b: this.network.hiddenBiases[1] };
          const gradW0 = dH2 * this.network.inputs[0];
          const gradW1 = dH2 * this.network.inputs[1];
          this.network.hiddenWeights[1][0] = old.w[0] - lr * gradW0;
          this.network.hiddenWeights[1][1] = old.w[1] - lr * gradW1;
          this.network.hiddenBiases[1] = old.b - lr * dH2;
          this.network.grad.hidden2Update = { old, grad:[gradW0, gradW1], gradB: dH2, new:{ w:[...this.network.hiddenWeights[1]], b:this.network.hiddenBiases[1] } };
          this.executedSteps.add(11);
        }
        break;
      }
    }
  }
  
  sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }
  
  // Smart number formatting: remove unnecessary zeros and limit to 2 decimals
  formatNumber(num) {
  if (num === undefined || num === null || isNaN(num)) return '-';
  let formatted = Number(num).toFixed(2);
  return formatted.replace(/\.0+$/, '').replace(/\.(\d*[1-9])0+$/, '.$1');
  }
  
  drawNetwork() {
    this.ctx.clearRect(0, 0, this.logicalWidth, this.logicalHeight);
    
    // Use logical dimensions for responsive layout
    const canvasWidth = this.logicalWidth;
    const canvasHeight = this.logicalHeight;
    const margin = Math.min(canvasWidth * 0.05, 40); // reduced to 5% margin, max 40px
    
    // Posicions X més properes entre capes
    const inputX = margin + 100; // increased offset to move closer
    const hiddenX = canvasWidth / 2; // centered
    const outputX = canvasWidth - margin - 100; // increased offset to move closer
    
    // Posicions Y centrades verticalment amb escala responsiva
    const centerY = canvasHeight / 2;
    const nodeSpacing = Math.min(canvasHeight * 0.35, 90); // increased to 35% of height, max 90px
    
    // Input layer (2 neurones centrades)
    const inputY = [centerY - nodeSpacing/2, centerY + nodeSpacing/2];
    
    // Hidden layer (2 neurones centrades)
    const hiddenY = [centerY - nodeSpacing/2, centerY + nodeSpacing/2];
    
    // Output layer (1 neurona centrada)
    const outputY = centerY;
    
    // Pre-compute layout for hit-testing and tooltips
    const radius = Math.min(this.logicalHeight * 0.12, 34);
    this.nodeRadius = radius;
    const offset = radius + 4; // match line endpoints with node visuals

    // Build nodes list
    const nodes = [
      { id: 'input-0', type: 'input', label: 'Entrada x₁', x: inputX, y: inputY[0], r: radius, value: this.network.inputs[0], active: this.currentStep >= 1 },
      { id: 'input-1', type: 'input', label: 'Entrada x₂', x: inputX, y: inputY[1], r: radius, value: this.network.inputs[1], active: this.currentStep >= 1 },
      { id: 'hidden-0', type: 'hidden', label: 'Oculta z₁', x: hiddenX, y: hiddenY[0], r: radius, value: this.network.hiddenOutputs[0], active: this.currentStep >= 2 },
      { id: 'hidden-1', type: 'hidden', label: 'Oculta z₂', x: hiddenX, y: hiddenY[1], r: radius, value: this.network.hiddenOutputs[1], active: this.currentStep >= 3 },
      { id: 'output-0', type: 'output', label: 'Sortida ŷ', x: outputX, y: outputY, r: radius, value: this.network.finalOutput, active: this.currentStep >= 4 }
    ];

    // Build edges list
    const edges = [];
    // input -> hidden (2x2)
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        const x1 = inputX + offset, y1 = inputY[i];
        const x2 = hiddenX - offset, y2 = hiddenY[j];
        const w = this.network.hiddenWeights[i][j];
        const id = `ih-${i}-${j}`;
        const active = (this.currentStep > 3) || (this.currentStep === 2 && j === 0) || (this.currentStep === 3 && j === 1) || (this.currentStep >= 1);
        edges.push({ id, group: 'ih', i, j, x1, y1, x2, y2, weight: w, color: w >= 0 ? '#3b82f6' : '#ef4444', active });
      }
    }
    // hidden -> output (2x1)
    for (let i = 0; i < 2; i++) {
      const x1 = hiddenX + offset, y1 = hiddenY[i];
      const x2 = outputX - offset, y2 = outputY;
      const w = this.network.outputWeights[i];
      const id = `ho-${i}-0`;
      const active = this.currentStep >= 4;
      edges.push({ id, group: 'ho', i, j: 0, x1, y1, x2, y2, weight: w, color: w >= 0 ? '#3b82f6' : '#ef4444', active });
    }
    this.layout = { nodes, edges };

    // Draw connections first (behind nodes)
    this.drawConnections3B1B(inputX, inputY, hiddenX, hiddenY, this.currentStep >= 1);
    this.drawConnections3B1B(hiddenX, hiddenY, outputX, [outputY], this.currentStep >= 4);
    
    // Draw nodes with grayscale style (no colors)
  this.drawNode3B1B(inputX, inputY[0], this.network.inputs[0], 'input', this.currentStep >= 1, 0);
  this.drawNode3B1B(inputX, inputY[1], this.network.inputs[1], 'input', this.currentStep >= 1, 1);
    
    // Hidden nodes - show individual activation based on step
  // After second forward pass (>=12) they should also be active (already covered by >=2 / >=3)
  const showHidden1 = this.currentStep >= 2;
  const showHidden2 = this.currentStep >= 3;
  this.drawNode3B1B(hiddenX, hiddenY[0], this.network.hiddenOutputs[0], 'hidden', showHidden1, 2);
  this.drawNode3B1B(hiddenX, hiddenY[1], this.network.hiddenOutputs[1], 'hidden', showHidden2, 3);
    
  this.drawNode3B1B(outputX, outputY, this.network.finalOutput, 'output', this.currentStep >= 4, 4);
    
    // Draw layer labels with adjusted positions
    this.ctx.fillStyle = '#1e40af';
    this.ctx.font = 'bold 16px SF Pro Display, sans-serif';
    this.ctx.textAlign = 'center';
    const labelY = Math.max(20, canvasHeight * 0.15); // responsive label position
  this.ctx.fillText('Entrada', inputX, labelY);
  this.ctx.fillText('Oculta', hiddenX, labelY);
  this.ctx.fillText('Sortida', outputX, labelY);

    // Draw update / delta arrows (visual change indicators)
    this.drawChangeArrows({
      step: this.currentStep,
      inputX, inputY, hiddenX, hiddenY, outputX, outputY,
      radius: this.nodeRadius
    });
  }

  // Utility: compute color for delta (positive green, negative red) with magnitude-based saturation/alpha
  deltaStroke(delta, maxMag) {
    const mag = Math.abs(delta);
    const norm = maxMag > 0 ? Math.min(1, mag / maxMag) : 0;
    if (delta >= 0) {
      // green palette
      const g = 160; // keep stable
      const r = 34 + Math.round(30 * (1 - norm));
      const b = 60 + Math.round(20 * (1 - norm));
      const alpha = 0.35 + 0.55 * norm;
      return `rgba(${r},${g},${b},${alpha})`;
    } else {
      const r = 239;
      const g = 68 + Math.round(40 * (1 - norm));
      const b = 68 + Math.round(10 * (1 - norm));
      const alpha = 0.35 + 0.55 * norm;
      return `rgba(${r},${g},${b},${alpha})`;
    }
  }

  drawCurvedArrow(x1, y1, x2, y2, color, thickness, curvature=0.25) {
    const ctx = this.ctx;
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    // perpendicular normal
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const cpx = mx + nx * curvature * len * 0.3; // control point offset
    const cpy = my + ny * curvature * len * 0.3;
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(cpx, cpy, x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.stroke();
    // Arrow head at end: compute tangent near end
    const t = 0.92; // point close to end
    const qx = (1 - t)*(1 - t)*x1 + 2*(1 - t)*t*cpx + t*t*x2;
    const qy = (1 - t)*(1 - t)*y1 + 2*(1 - t)*t*cpy + t*t*y2;
    const tx = x2 - qx;
    const ty = y2 - qy;
    const th = Math.atan2(ty, tx);
    const ah = Math.max(6, thickness * 2.2);
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - ah * Math.cos(th - Math.PI/6), y2 - ah * Math.sin(th - Math.PI/6));
    ctx.lineTo(x2 - ah * Math.cos(th + Math.PI/6), y2 - ah * Math.sin(th + Math.PI/6));
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  drawCircularArrow(x, y, radius, delta, maxMag) {
    const color = this.deltaStroke(delta, maxMag);
    const ctx = this.ctx;
    const start = delta >= 0 ? -Math.PI*0.25 : Math.PI*0.75;
    const end = start + (delta >= 0 ? Math.PI*1.2 : -Math.PI*1.2);
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, radius + 10, start, end, delta < 0);
    ctx.stroke();
    // Arrow head
    const hx = x + (radius + 10) * Math.cos(end);
    const hy = y + (radius + 10) * Math.sin(end);
    const angle = end + (delta >= 0 ? 0 : Math.PI);
    ctx.beginPath();
    ctx.moveTo(hx, hy);
    ctx.lineTo(hx - 8 * Math.cos(angle - Math.PI/6), hy - 8 * Math.sin(angle - Math.PI/6));
    ctx.lineTo(hx - 8 * Math.cos(angle + Math.PI/6), hy - 8 * Math.sin(angle + Math.PI/6));
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  drawVerticalArrow(x, y, delta, maxMag) {
    const mag = Math.abs(delta);
    const norm = maxMag > 0 ? Math.min(1, mag / maxMag) : 0;
    const len = 30 + 20 * norm; // arrow length
    const dir = delta >= 0 ? -1 : 1; // up for positive
    const color = this.deltaStroke(delta, maxMag);
    const ctx = this.ctx;
    const y1 = y + dir * (this.nodeRadius + 8);
    const y2 = y1 + dir * len;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
    // head
    ctx.beginPath();
    ctx.moveTo(x, y2);
    ctx.lineTo(x - 7, y2 + dir * 10);
    ctx.lineTo(x + 7, y2 + dir * 10);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  // New compact activation delta indicator (arrow head pointing toward neuron)
  drawActivationDelta(x, y, delta) {
    if (!delta) return;
    const ctx = this.ctx;
    const color = this.deltaStroke(delta, Math.abs(delta));
    ctx.save();
    ctx.translate(x, y);
    // Positive delta shown above neuron (shaft away from neuron, head at neuron rim)
    // Negative delta shown below neuron similarly.
    const dir = delta > 0 ? -1 : 1; // displacement sign
  // Arrow now originates exactly at neuron center (0,0)
  const startY = 0;
  const length = this.nodeRadius + 32; // total length outward from center
  const endY = dir * length;           // far endpoint
  // shaft
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(0, startY);
  ctx.lineTo(0, endY);
  ctx.stroke();
  // head (apex at endY pointing outward)
  ctx.beginPath();
  const baseY = endY - dir * 10; // triangle base closer to center
  ctx.moveTo(0, endY);           // apex
  ctx.lineTo(-6, baseY);
  ctx.lineTo(6, baseY);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  // label slightly beyond apex
  const label = `Δa=${this.formatNumber(delta)}`;
  ctx.font = 'bold 11px SF Mono, monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = color;
  ctx.shadowColor = 'rgba(0,0,0,0.35)';
  ctx.shadowBlur = 4;
  const labelY = endY + dir * 16;
  ctx.fillText(label, 0, labelY);
    ctx.restore();
  }

  // Small helper to draw a delta label near arrows
  drawDeltaLabel(x, y, text, color) {
    const ctx = this.ctx;
    ctx.save();
    ctx.font = 'bold 11px SF Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = color;
    // background bubble for readability
    ctx.beginPath();
    const padX = 4, padY = 3;
    const metrics = ctx.measureText(text);
    const w = metrics.width + padX * 2;
    const h = 14 + padY * 2;
    ctx.roundRect?.(x - w/2, y - h/2, w, h, 4);
    if (!ctx.roundRect) {
      ctx.rect(x - w/2, y - h/2, w, h);
    }
    ctx.fillStyle = 'rgba(15,23,42,0.75)';
    ctx.fill();
    ctx.fillStyle = color;
    ctx.fillText(text, x, y + 4 - padY);
    ctx.restore();
  }

  drawChangeArrows(layout) {
    const step = layout.step;
    const { inputX, inputY, hiddenX, hiddenY, outputX, outputY, radius } = layout;
    const r = radius || 30;
    const lw = this.lr;
    // Step 9: output weights & bias updates
    if (step === 9 && this.network.grad.outputUpdate) {
      const upd = this.network.grad.outputUpdate;
      const deltasW = upd.newW.map((w,i)=> w - upd.oldW[i]);
      const maxMag = Math.max(...deltasW.map(Math.abs), Math.abs(upd.newB - upd.oldB));
      // For each hidden neuron to output
      deltasW.forEach((dw,i)=> {
        if (dw === 0) return;
        const x1 = hiddenX + r + 4;
        const y1 = hiddenY[i];
        const x2 = outputX - r - 4;
        const y2 = outputY;
        const midx = (x1 + x2)/2; // mid for label
        const midy = (y1 + y2)/2;
        const color = this.deltaStroke(dw, maxMag);
        // shorten arrow start/end a bit so it floats over original edge
        const sx = x1 + (x2 - x1)*0.18;
        const sy = y1 + (y2 - y1)*0.18;
        const ex = x1 + (x2 - x1)*0.82;
        const ey = y1 + (y2 - y1)*0.82;
        // curvature sign conveys sign: above (positive), below (negative)
        const curvature = dw >= 0 ? 0.45 : -0.45;
        this.drawCurvedArrow(sx, sy, ex, ey, color, 3 + 4*Math.abs(dw)/Math.max(maxMag,1e-9), curvature);
        this.drawDeltaLabel(midx, midy + (dw >= 0 ? -18 : 18), `Δw${i+1}=${this.formatNumber(dw)}`, color);
      });
      // Bias update arrow around output node
      const db = upd.newB - upd.oldB;
      if (db !== 0) {
        this.drawCircularArrow(outputX, outputY, r, db, maxMag);
        this.drawDeltaLabel(outputX + r + 40, outputY, `Δb=${this.formatNumber(db)}`, this.deltaStroke(db, maxMag));
      }
    }
    // Step 10: hidden neuron z1 weights/bias
    if (step === 10 && this.network.grad.hidden1Update) {
      const upd = this.network.grad.hidden1Update;
      const deltasW = upd.new.w.map((w,i)=> w - upd.old.w[i]);
      const maxMag = Math.max(...deltasW.map(Math.abs), Math.abs(upd.new.b - upd.old.b));
      deltasW.forEach((dw,i)=> {
        if (dw === 0) return;
        // connection from input i to hidden 0
        const x1 = inputX + r + 4;
        const y1 = inputY[i];
        const x2 = hiddenX - r - 4;
        const y2 = hiddenY[0];
        const sx = x1 + (x2 - x1)*0.18;
        const sy = y1 + (y2 - y1)*0.18;
        const ex = x1 + (x2 - x1)*0.82;
        const ey = y1 + (y2 - y1)*0.82;
        const color = this.deltaStroke(dw, maxMag);
        const curvature = dw >= 0 ? -0.5 : 0.5; // flip side to avoid overlapping with base edge
        this.drawCurvedArrow(sx, sy, ex, ey, color, 3 + 4*Math.abs(dw)/Math.max(maxMag,1e-9), curvature);
        const midx = (x1 + x2)/2;
        const midy = (y1 + y2)/2;
        this.drawDeltaLabel(midx, midy + (dw >=0 ? -18 : 18), `Δw1,${i+1}=${this.formatNumber(dw)}`, color);
      });
      const db = upd.new.b - upd.old.b;
      if (db !== 0) {
        this.drawCircularArrow(hiddenX, hiddenY[0], r, db, maxMag);
        this.drawDeltaLabel(hiddenX - r - 42, hiddenY[0], `Δb1=${this.formatNumber(db)}`, this.deltaStroke(db, maxMag));
      }
    }
    // Step 11: hidden neuron z2 weights/bias
    if (step === 11 && this.network.grad.hidden2Update) {
      const upd = this.network.grad.hidden2Update;
      const deltasW = upd.new.w.map((w,i)=> w - upd.old.w[i]);
      const maxMag = Math.max(...deltasW.map(Math.abs), Math.abs(upd.new.b - upd.old.b));
      deltasW.forEach((dw,i)=> {
        if (dw === 0) return;
        // connection from input i to hidden 1
        const x1 = inputX + r + 4;
        const y1 = inputY[i];
        const x2 = hiddenX - r - 4;
        const y2 = hiddenY[1];
        const sx = x1 + (x2 - x1)*0.18;
        const sy = y1 + (y2 - y1)*0.18;
        const ex = x1 + (x2 - x1)*0.82;
        const ey = y1 + (y2 - y1)*0.82;
        const color = this.deltaStroke(dw, maxMag);
        const curvature = dw >= 0 ? 0.5 : -0.5;
        this.drawCurvedArrow(sx, sy, ex, ey, color, 3 + 4*Math.abs(dw)/Math.max(maxMag,1e-9), curvature);
        const midx = (x1 + x2)/2;
        const midy = (y1 + y2)/2;
        this.drawDeltaLabel(midx, midy + (dw >=0 ? -18 : 18), `Δw2,${i+1}=${this.formatNumber(dw)}`, color);
      });
      const db = upd.new.b - upd.old.b;
      if (db !== 0) {
        this.drawCircularArrow(hiddenX, hiddenY[1], r, db, maxMag);
        this.drawDeltaLabel(hiddenX + r + 42, hiddenY[1], `Δb2=${this.formatNumber(db)}`, this.deltaStroke(db, maxMag));
      }
    }
    // Steps 12-14: activation changes (compact anchored indicators only on that specific step)
    if (step >= 12 && step <= 14 && this.network.prev) {
      const prev = this.network.prev;
      if (step === 12) {
        const deltaA1 = this.network.hiddenOutputs[0] - prev.hiddenOutputs[0];
        if (deltaA1 !== 0) this.drawActivationDelta(hiddenX, hiddenY[0], deltaA1);
      }
      if (step === 13) {
        const deltaA2 = this.network.hiddenOutputs[1] - prev.hiddenOutputs[1];
        if (deltaA2 !== 0) this.drawActivationDelta(hiddenX, hiddenY[1], deltaA2);
      }
      if (step === 14) {
        const deltaOut = this.network.finalOutput - prev.finalOutput;
        if (deltaOut !== 0) this.drawActivationDelta(outputX, outputY, deltaOut);
      }
    }
  }
  
  // 3Blue1Brown style node rendering (simple grayscale, no colors)
  drawNode3B1B(x, y, value, type, active, nodeIndex) {
    const radius = Math.min(this.logicalHeight * 0.12, 34); // responsive radius: 12% of height, max 34px    // Focus mode: dim inactive nodes strongly
    const focusActive = this.isNodeActiveForStep(type, nodeIndex);
    const effectiveActive = active && focusActive;
    // Hover detection for this node
    const nodeId = type === 'input' ? `input-${nodeIndex}` : (type === 'hidden' ? `hidden-${nodeIndex - 2}` : 'output-0');
    const isHovered = this.hover && this.hover.type === 'node' && this.hover.id === nodeId;
    // More pronounced grayscale: 0 = dark gray, 1 = white
  let grayValue = (effectiveActive || isHovered) ? Math.round(70 + ((value ?? 0.5)) * 160) : 100; // Dim others
    let fillColor = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
    
    // Simple gray rim - no colors
    let rimColor = (effectiveActive || isHovered) ? '#4b5563' : '#6b7280';
    
    // Draw outer rim
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius + 2, 0, 2 * Math.PI);
    this.ctx.fillStyle = rimColor;
    this.ctx.fill();
    // Hover highlight outline
    if (isHovered) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius + 5, 0, 2 * Math.PI);
      this.ctx.strokeStyle = '#f59e0b';
      this.ctx.lineWidth = 3;
      this.ctx.stroke();
    }
    
    // Draw main node
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = fillColor;
    this.ctx.fill();
    
    // Draw subtle inner highlight for 3D effect
  // Removed inner highlight for cleaner flat style
    
    // Draw activation value INSIDE the neuron
  if ((effectiveActive || isHovered) && value !== undefined && value !== null) {
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
        const connectionActive = this.isConnectionActiveForStep(fromX, i, j);
        const dir = fromX < 300 ? 'ih' : 'ho';
        const edgeId = dir === 'ih' ? `ih-${i}-${j}` : `ho-${i}-${j}`;
        const isHovered = this.hover && this.hover.type === 'edge' && this.hover.id === edgeId;
        let color = (active && connectionActive) || isHovered ? (weight >= 0 ? '#3b82f6' : '#ef4444') : 'rgba(148,163,184,0.25)';
        // Line thickness based on weight magnitude (dim if inactive); boost on hover
        let lineWidth = ((active && connectionActive) || isHovered) ? Math.max(2, Math.abs(weight) * 6) : 1.2;
        
        this.ctx.beginPath();
        const radius = this.nodeRadius || 34;
        const offset = radius + 4;
        this.ctx.moveTo(fromX + offset, fy); // Adjusted for actual radius
        this.ctx.lineTo(toX - offset, ty);   // Adjusted for actual radius
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.stroke();

        // Hover glow overlay
        if (isHovered) {
          this.ctx.save();
          this.ctx.shadowColor = '#f59e0b';
          this.ctx.shadowBlur = 8;
          this.ctx.beginPath();
          this.ctx.moveTo(fromX + offset, fy);
          this.ctx.lineTo(toX - offset, ty);
          this.ctx.strokeStyle = '#f59e0b';
          this.ctx.lineWidth = lineWidth + 1.5;
          this.ctx.stroke();
          this.ctx.restore();
        }
        
        // Draw weight value on connection when active and relevant
        if ((active && connectionActive) || isHovered) {
          const midX = (fromX + toX) / 2;
          const midY = (fy + ty) / 2;
          
          // Show weights only when they're being used in current step
          let showWeight = isHovered;
          if (!isHovered) {
            if (this.currentStep >= 2 && fromX < 300) showWeight = connectionActive; // Input to hidden
            if (this.currentStep >= 4 && fromX > 300) showWeight = connectionActive; // Hidden to output
          }
          
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

  // Determine if a node should be highlighted (focus mode always on)
  isNodeActiveForStep(type, nodeIndex) {
    switch (type) {
      case 'input':
        return this.currentStep >= 1; // inputs visible after step 1
      case 'hidden':
        if (nodeIndex === 2) return this.currentStep >= 2; // first hidden
        if (nodeIndex === 3) return this.currentStep >= 3; // second hidden
        return false;
      case 'output':
        return this.currentStep >= 4; // output active
      default: return false;
    }
  }

  // Determine if a connection is active for current step
  isConnectionActiveForStep(fromX, i, j) {
    const isInputToHidden = fromX < 300;
    if (isInputToHidden) {
      // At step 2 highlight edges into first hidden neuron (j === 0)
      if (this.currentStep === 2) return j === 0;
      // At step 3 highlight edges into second hidden neuron (j === 1)
      if (this.currentStep === 3) return j === 1;
      // After both computed, show all input->hidden connections
      return this.currentStep > 3;
    } else {
      // Hidden to output edges active when computing output step 4+
      return this.currentStep >= 4;
    }
  }
  
  updateEquations() {
    const overlay = document.getElementById('bp-equation-overlay');
    const equations = this.getEquationsForStep();
    
    const fixed = equations.map(raw => {
      let eq = raw; // copy
      const trimmed = eq.trim();
      // Only auto-close inline math if there's an unmatched opening $
      if (trimmed.startsWith('$')) {
        const dollarCount = (trimmed.match(/\$/g) || []).length;
        if (dollarCount % 2 === 1) {
          eq = trimmed + '$';
        } else {
          eq = trimmed;
        }
      } else {
        eq = trimmed;
      }
      return `<div class="eq-line">${eq}</div>`;
    });
    overlay.innerHTML = fixed.join('');
    
    // Re-render MathJax if available
    if (window.MathJax) {
      MathJax.typesetPromise([overlay]).catch(err => console.log('Error de MathJax:', err));
    }
  }
  
  getEquationsForStep() {
    switch(this.currentStep) {
      case 0: return [
        '🧠 Xarxa neuronal a punt',
        '$W \\in [-1, 1]$, $b \\in [-1, 1]$',
        '$\\mathbf{x} = [1, 0]^T$ (entrada XOR)',
        '$y_{objectiu} = 1$ (sortida XOR: 1⊕0=1)'
      ];
      case 1: return [
  '➡️ Passada endavant: capa d’entrada activa',
        '$\\mathbf{x} = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}$',
        'Entrada XOR carregada: primer bit = 1, segon bit = 0',
        'Sortida esperada: 1 ⊕ 0 = 1'
      ];
      case 2: return [
        '🔄 Càlcul de la neurona oculta $z_1$',
        '$z_1 = w_{1,1} x_1 + w_{1,2} x_2 + b_1$',
        `$z_1 = ${this.formatNumber(this.network.hiddenWeights[0][0])} \\cdot 1 + ${this.formatNumber(this.network.hiddenWeights[0][1])} \\cdot 0 + ${this.formatNumber(this.network.hiddenBiases[0])}$`,
        `$z_1 = ${this.formatNumber(this.network.hiddenWeights[0][0])} + 0 + ${this.formatNumber(this.network.hiddenBiases[0])} = ${this.formatNumber(this.network.hiddenWeights[0][0] + this.network.hiddenBiases[0])}$`,
        `$a_1 = \\sigma(z_1) = ${this.formatNumber(this.network.hiddenOutputs[0])}$`
      ];
      case 3: return [
        '🔄 Càlcul de la neurona oculta $z_2$',
        '$z_2 = w_{2,1} x_1 + w_{2,2} x_2 + b_2$',
        `$z_2 = ${this.formatNumber(this.network.hiddenWeights[1][0])} \\cdot 1 + ${this.formatNumber(this.network.hiddenWeights[1][1])} \\cdot 0 + ${this.formatNumber(this.network.hiddenBiases[1])}$`,
        `$z_2 = ${this.formatNumber(this.network.hiddenWeights[1][0])} + 0 + ${this.formatNumber(this.network.hiddenBiases[1])} = ${this.formatNumber(this.network.hiddenWeights[1][0] + this.network.hiddenBiases[1])}$`,
        `$a_2 = \\sigma(z_2) = ${this.formatNumber(this.network.hiddenOutputs[1])}$`
      ];
      case 4: return [
        '🎯 Càlcul de la capa de sortida',
        '$z^{out} = w_1^{out} a_1 + w_2^{out} a_2 + b^{out}$',
        `$z^{out} = ${this.formatNumber(this.network.outputWeights[0])} \\cdot ${this.formatNumber(this.network.hiddenOutputs[0])} + ${this.formatNumber(this.network.outputWeights[1])} \\cdot ${this.formatNumber(this.network.hiddenOutputs[1])} + ${this.formatNumber(this.network.outputBias)}$`,
  `$\\hat{y} = \\sigma(z^{out}) = ${this.formatNumber(this.network.finalOutput)}` + '$',
        'Ha d’estar a prop d’1 per a XOR(1,0)'
      ];
      case 5: return [
        '📊 Càlcul de la funció de pèrdua',
        '$\\mathcal{L} = \\frac{1}{2}(y - \\hat{y})^2$',
        `$\\mathcal{L} = \\frac{1}{2}(${this.network.target} - ${this.formatNumber(this.network.finalOutput)})^2$`,
        `$\\mathcal{L} = ${this.formatNumber(this.network.error)}$`,
        'Més baix és millor — a quina distància estem de XOR(1,0)=1?'
      ];
      case 6: { // output gradient numeric
        const yhat = this.network.finalOutput;
        const y = this.network.target;
        const dL_dyhat = (yhat - y); // derivative of 0.5(y - yhat)^2 wrt yhat
        const deriv = yhat * (1 - yhat);
        const deltaOut = this.network.grad.deltaOut;
        return [
          '⬅️ Retropropagació (Sortida)',
          `$dL/d\\hat{y} = (\\hat{y} - y) = (${this.formatNumber(yhat)} - ${y}) = ${this.formatNumber(dL_dyhat)}`,
          `$\\sigma'(z^{out}) = \\hat{y}(1-\\hat{y}) = ${this.formatNumber(yhat)}(1-${this.formatNumber(yhat)}) = ${this.formatNumber(deriv)}`,
          `$\\delta^{out} = (\\hat{y}-y)\\sigma'(z^{out}) = ${this.formatNumber(dL_dyhat)} \\cdot ${this.formatNumber(deriv)} = ${this.formatNumber(deltaOut)}`
        ];
      }
      case 7: { // hidden z1
        const a1 = this.network.hiddenOutputs[0];
        const deriv1 = a1 * (1 - a1);
        const deltaOut = this.network.grad.deltaOut;
        const w_out1 = this.network.outputWeights[0];
        const deltaH1 = this.network.grad.deltaH[0];
        return [
          '🔙 Retropropagació (z₁)',
          `$\\frac{\\partial L}{\\partial a_1} = w_1^{out} \\delta^{out} = ${this.formatNumber(w_out1)} \\cdot ${this.formatNumber(deltaOut)} = ${this.formatNumber(w_out1 * deltaOut)}`,
          `$\\sigma'(z_1) = a_1(1-a_1) = ${this.formatNumber(a1)}(1-${this.formatNumber(a1)}) = ${this.formatNumber(deriv1)}`,
          `$\\delta_1 = ${this.formatNumber(w_out1 * deltaOut)} \\cdot ${this.formatNumber(deriv1)} = ${this.formatNumber(deltaH1)}`
        ];
      }
      case 8: {
        const a2 = this.network.hiddenOutputs[1];
        const deriv2 = a2 * (1 - a2);
        const deltaOut = this.network.grad.deltaOut;
        const w_out2 = this.network.outputWeights[1];
        const deltaH2 = this.network.grad.deltaH[1];
        return [
          '🔙 Retropropagació (z₂)',
          `$\\frac{\\partial L}{\\partial a_2} = w_2^{out} \\delta^{out} = ${this.formatNumber(w_out2)} \\cdot ${this.formatNumber(deltaOut)} = ${this.formatNumber(w_out2 * deltaOut)}`,
            `$\\sigma'(z_2) = a_2(1-a_2) = ${this.formatNumber(a2)}(1-${this.formatNumber(a2)}) = ${this.formatNumber(deriv2)}`,
            `$\\delta_2 = ${this.formatNumber(w_out2 * deltaOut)} \\cdot ${this.formatNumber(deriv2)} = ${this.formatNumber(deltaH2)}`
        ];
      }
      case 9: {
        const dOut = this.network.grad.deltaOut;
        const a1 = this.network.hiddenOutputs[0];
        const a2 = this.network.hiddenOutputs[1];
        const dw1 = dOut * a1;
        const dw2 = dOut * a2;
        const db = dOut;
        const upd = this.network.grad.outputUpdate || { oldW: this.network.outputWeights, newW: this.network.outputWeights, oldB: this.network.outputBias, newB: this.network.outputBias, dw:[dw1,dw2], db:db };
        return [
          '🔄 Actualització (Sortida)',
          `$dL/dw_1^{out} = \\delta^{out} a_1 = ${this.formatNumber(dOut)} \\cdot ${this.formatNumber(a1)} = ${this.formatNumber(dw1)}`,
          `$dL/dw_2^{out} = \\delta^{out} a_2 = ${this.formatNumber(dOut)} \\cdot ${this.formatNumber(a2)} = ${this.formatNumber(dw2)}`,
          `$dL/db^{out} = \\delta^{out} = ${this.formatNumber(db)}`,
          `$w_1^{out}: ${this.formatNumber(upd.oldW[0])} - ${this.lr}\\cdot${this.formatNumber(dw1)} = ${this.formatNumber(upd.newW[0])}`,
          `$w_2^{out}: ${this.formatNumber(upd.oldW[1])} - ${this.lr}\\cdot${this.formatNumber(dw2)} = ${this.formatNumber(upd.newW[1])}`,
          `$b^{out}: ${this.formatNumber(upd.oldB)} - ${this.lr}\\cdot${this.formatNumber(db)} = ${this.formatNumber(upd.newB)}`
        ];
      }
      case 10: {
        const dH1 = this.network.grad.deltaH[0];
        const dw10 = dH1 * this.network.inputs[0];
        const dw11 = dH1 * this.network.inputs[1];
        const upd = this.network.grad.hidden1Update || { old:{ w:[this.network.hiddenWeights[0][0], this.network.hiddenWeights[0][1]], b:this.network.hiddenBiases[0]}, new:{ w:[this.network.hiddenWeights[0][0], this.network.hiddenWeights[0][1]], b:this.network.hiddenBiases[0]}, grad:[dw10,dw11], gradB:dH1 };
        return [
          '🔄 Actualització (z₁)',
          `$dL/dw_{1,1} = \\delta_1 x_1 = ${this.formatNumber(dH1)} \\cdot 1 = ${this.formatNumber(dw10)}`,
          `$dL/dw_{1,2} = \\delta_1 x_2 = ${this.formatNumber(dH1)} \\cdot 0 = ${this.formatNumber(dw11)}`,
          `$dL/db_1 = \\delta_1 = ${this.formatNumber(dH1)}`,
          `$w_{1,1}: ${this.formatNumber(upd.old.w[0])} - ${this.lr}\\cdot${this.formatNumber(dw10)} = ${this.formatNumber(upd.new.w[0])}`,
          `$w_{1,2}: ${this.formatNumber(upd.old.w[1])} - ${this.lr}\\cdot${this.formatNumber(dw11)} = ${this.formatNumber(upd.new.w[1])}`,
          `$b_1: ${this.formatNumber(upd.old.b)} - ${this.lr}\\cdot${this.formatNumber(dH1)} = ${this.formatNumber(upd.new.b)}`
        ];
      }
      case 11: {
        const dH2 = this.network.grad.deltaH[1];
        const dw20 = dH2 * this.network.inputs[0];
        const dw21 = dH2 * this.network.inputs[1];
        const upd = this.network.grad.hidden2Update || { old:{ w:[this.network.hiddenWeights[1][0], this.network.hiddenWeights[1][1]], b:this.network.hiddenBiases[1]}, new:{ w:[this.network.hiddenWeights[1][0], this.network.hiddenWeights[1][1]], b:this.network.hiddenBiases[1]}, grad:[dw20,dw21], gradB:dH2 };
        return [
          '🔄 Actualització (z₂)',
          `$dL/dw_{2,1} = \\delta_2 x_1 = ${this.formatNumber(dH2)} \\cdot 1 = ${this.formatNumber(dw20)}`,
          `$dL/dw_{2,2} = \\delta_2 x_2 = ${this.formatNumber(dH2)} \\cdot 0 = ${this.formatNumber(dw21)}`,
          `$dL/db_2 = \\delta_2 = ${this.formatNumber(dH2)}`,
          `$w_{2,1}: ${this.formatNumber(upd.old.w[0])} - ${this.lr}\\cdot${this.formatNumber(dw20)} = ${this.formatNumber(upd.new.w[0])}`,
          `$w_{2,2}: ${this.formatNumber(upd.old.w[1])} - ${this.lr}\\cdot${this.formatNumber(dw21)} = ${this.formatNumber(upd.new.w[1])}`,
          `$b_2: ${this.formatNumber(upd.old.b)} - ${this.lr}\\cdot${this.formatNumber(dH2)} = ${this.formatNumber(upd.new.b)}`
        ];
      }
      case 12: return [
        '🔁 Nova passada endavant (z₁)',
        'Recalculam activació amb pesos actualitzats',
        `$z_1' = w_{1,1}^{nou} x_1 + w_{1,2}^{nou} x_2 + b_1^{nou}`,
        `$a_1' = \\sigma(z_1') = ${this.formatNumber(this.network.hiddenOutputs[0])}`,
        'Comparar amb valor anterior: ' + (this.network.prev ? this.formatNumber(this.network.prev.hiddenOutputs[0]) + ' → ' + this.formatNumber(this.network.hiddenOutputs[0]) : '—')
      ];
      case 13: return [
        '🔁 Nova passada endavant (z₂)',
        'Recalculam activació amb pesos actualitzats',
        `$z_2' = w_{2,1}^{nou} x_1 + w_{2,2}^{nou} x_2 + b_2^{nou}`,
        `$a_2' = \\sigma(z_2') = ${this.formatNumber(this.network.hiddenOutputs[1])}`,
        'Comparar: ' + (this.network.prev ? this.formatNumber(this.network.prev.hiddenOutputs[1]) + ' → ' + this.formatNumber(this.network.hiddenOutputs[1]) : '—')
      ];
      case 14: return [
        '🔁 Nova passada endavant (sortida)',
        'Utilitzant noves activacions i pesos ajustats',
  `$z^{out,\\text{nou}} = w_1^{out,\\text{nou}} a_1' + w_2^{out,\\text{nou}} a_2' + b^{out,\\text{nou}}$`,
  `$\\hat{y}^{\\text{nou}} = \\sigma(z^{out,\\text{nou}}) = ${this.formatNumber(this.network.finalOutput)}$`,
        'Comparar: ' + (this.network.prev ? this.formatNumber(this.network.prev.finalOutput) + ' → ' + this.formatNumber(this.network.finalOutput) : '—')
      ];
      case 15: return [
        '📉 Nova pèrdua després d’una iteració',
        `$\\mathcal{L}_{abans} = ${this.network.prev ? this.formatNumber(this.network.prev.error) : '?'}`,
        `$\\mathcal{L}_{ara} = ${this.formatNumber(this.network.newError ?? this.network.error)}`,
        (this.network.prev ? `∆ = ${this.formatNumber((this.network.prev.error - (this.network.newError ?? this.network.error)))} (reducció)` : ''),
        'Si ∆ > 0, l’entrenament ha millorat l’ajust'
      ];
      case 16: return [
        '✅ Iteració d’entrenament completada',
        'Propagació endavant inicial ✓',
        'Retropropagació i gradients ✓',
        'Actualització de pesos ✓',
        'Nova passada endavant i comparació de pèrdua ✓'
      ];
      default: return ['A punt per començar...'];
    }
  }
}

// Initialize demo when page loads
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('bp-network');
  if (canvas && !canvas.dataset.bpInit) {
    new BackpropDemo();
    canvas.dataset.bpInit = '1';
  }
});

// --- Hover & Tooltip helpers ---
BackpropDemo.prototype.onMouseMove = function(e) {
  if (!this.layout) return;
  const rect = this.canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Hit-test nodes first
  let found = null;
  for (const n of this.layout.nodes) {
    const dx = x - n.x, dy = y - n.y;
    const dist = Math.hypot(dx, dy);
    if (dist <= n.r + 6) {
      found = { type: 'node', id: n.id, meta: n };
      break;
    }
  }

  // If no node, test edges
  if (!found) {
    for (const ed of this.layout.edges) {
      const d = this.pointToSegmentDistance(x, y, ed.x1, ed.y1, ed.x2, ed.y2);
      if (d <= 8) { // tolerance
        found = { type: 'edge', id: ed.id, meta: ed };
        break;
      }
    }
  }

  this.hover = found;
  if (found) {
    this.showTooltip(found, x, y);
  } else {
    this.hideTooltip();
  }
  this.drawNetwork();
};

BackpropDemo.prototype.onMouseLeave = function() {
  this.hover = null;
  this.hideTooltip();
  this.drawNetwork();
};

BackpropDemo.prototype.pointToSegmentDistance = function(px, py, x1, y1, x2, y2) {
  const vx = x2 - x1, vy = y2 - y1;
  const wx = px - x1, wy = py - y1;
  const c1 = vx * wx + vy * wy;
  if (c1 <= 0) return Math.hypot(px - x1, py - y1);
  const c2 = vx * vx + vy * vy;
  if (c2 <= c1) return Math.hypot(px - x2, py - y2);
  const b = c1 / c2;
  const bx = x1 + b * vx, by = y1 + b * vy;
  return Math.hypot(px - bx, py - by);
};

BackpropDemo.prototype.showTooltip = function(item, x, y) {
  if (!this.tooltipEl) return;
  let html = '';
  if (item.type === 'node') {
    const n = item.meta;
    html = `
      <div class="bp-tip-row"><span class="bp-tip-label">Neurona:</span> <span>${n.label}</span></div>
      <div class="bp-tip-row"><span class="bp-tip-label">Valor:</span> <code>${this.formatNumber(n.value)}</code></div>
    `;
  } else if (item.type === 'edge') {
    const e = item.meta;
    const name = e.group === 'ih' ? `w_${e.i + 1},${e.j + 1}` : `w_${e.i + 1}^{out}`;
    html = `
  <div class="bp-tip-row"><span class="bp-tip-label">Pes:</span> <span>${name}</span></div>
      <div class="bp-tip-row"><span class="bp-tip-label">Valor:</span> <code>${this.formatNumber(e.weight)}</code></div>
    `;
  }
  this.tooltipEl.innerHTML = html;
  this.tooltipEl.removeAttribute('hidden');

  // Position near cursor, constrained within wrapper
  const wrapper = this.canvas.parentElement; // .bp-canvas-wrapper
  const wrapRect = wrapper.getBoundingClientRect();
  const tipRect = this.tooltipEl.getBoundingClientRect();
  let left = x + 12;
  let top = y + 12;
  // Convert to wrapper-relative px
  // x,y are canvas-relative; canvas is inside wrapper; place using absolute within wrapper matching canvas top-left offset
  const canvasRect = this.canvas.getBoundingClientRect();
  const offsetX = canvasRect.left - wrapRect.left;
  const offsetY = canvasRect.top - wrapRect.top;
  left += offsetX;
  top += offsetY;
  // Constrain
  const maxLeft = wrapRect.width - tipRect.width - 8;
  const maxTop = wrapRect.height - tipRect.height - 8;
  left = Math.max(8, Math.min(left, maxLeft));
  top = Math.max(8, Math.min(top, maxTop));
  this.tooltipEl.style.left = left + 'px';
  this.tooltipEl.style.top = top + 'px';
};

BackpropDemo.prototype.hideTooltip = function() {
  if (!this.tooltipEl) return;
  this.tooltipEl.setAttribute('hidden', '');
};
