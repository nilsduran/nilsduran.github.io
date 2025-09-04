(function(){
  if(!document.getElementById('backprop-demo')) return;
  const canvas = document.getElementById('bp-network');
  const ctx = canvas.getContext('2d');
  const elLoss = document.getElementById('bp-loss');
  const elPred = document.getElementById('bp-pred');
  const elSampleVal = document.getElementById('bp-sample-val');
  const lrEl = document.getElementById('lr');
  const speedEl = document.getElementById('speed');
  const btnStep = document.getElementById('bp-step');
  const btnPrev = document.getElementById('bp-prev');
  const btnPlay = document.getElementById('bp-play');
  const btnReset = document.getElementById('bp-reset');
  const btnSample = document.getElementById('bp-sample');
  const formulasBox = document.getElementById('bp-formulas');
  const eqBox = document.getElementById('bp-equation');
  const phaseLabel = document.getElementById('bp-phase-label');
  const phaseIndexEl = document.getElementById('bp-phase-index');
  const phaseTotalEl = document.getElementById('bp-phase-total');

  const data = [ {x:[0,0], y:0}, {x:[0,1], y:1}, {x:[1,0], y:1}, {x:[1,1], y:0} ];
  let sampleIdx = 0;

  // Parameters (initial)
  let W = [ [0.7,-0.3], [0.4,0.9] ];
  let V = [1.2,-0.8];
  let b1 = [0,0];
  let b2 = 0;

  // Cache per cicle
  let forwardCache = null;
  let gradsCache = null;

  // Phases definides
  const PHASES = [
    { key:'forward_h1', label:'Forward: càlcul z₁ i a₁', focus:{nodes:['x1','x2','h1'], weights:[['x1','h1'],['x2','h1']]}, sub:[
      {k:'sym', txt:'z₁ = W₁₁ x₁ + W₁₂ x₂ + b₁'},
      {k:'num', txt: (s)=>`z₁ = ${W[0][0].toFixed(2)}·${s.x[0]} + ${W[0][1].toFixed(2)}·${s.x[1]} + ${b1[0].toFixed(2)}`},
      {k:'act', txt:(s,f)=>`a₁ = σ(${f.z1[0].toFixed(4)}) = ${f.a1[0].toFixed(4)}`}
    ] },
    { key:'forward_h2', label:'Forward: càlcul z₂ i a₂', focus:{nodes:['x1','x2','h2'], weights:[['x1','h2'],['x2','h2']]}, sub:[
      {k:'sym', txt:'z₂ = W₂₁ x₁ + W₂₂ x₂ + b₂'},
      {k:'num', txt:(s)=>`z₂ = ${W[1][0].toFixed(2)}·${s.x[0]} + ${W[1][1].toFixed(2)}·${s.x[1]} + ${b1[1].toFixed(2)}`},
      {k:'act', txt:(s,f)=>`a₂ = σ(${f.z1[1].toFixed(4)}) = ${f.a1[1].toFixed(4)}`}
    ] },
    { key:'forward_out', label:'Forward: càlcul z³ i ŷ', focus:{nodes:['h1','h2','out'], weights:[['h1','out'],['h2','out']]}, sub:[
      {k:'sym', txt:'z³ = v₁ a₁ + v₂ a₂ + b'},
      {k:'num', txt:(s,f)=>`z³ = ${V[0].toFixed(2)}·${f.a1[0].toFixed(2)} + ${V[1].toFixed(2)}·${f.a1[1].toFixed(2)} + ${b2.toFixed(2)}`},
      {k:'act', txt:(s,f)=>`ŷ = σ(${f.z2.toFixed(4)}) = ${f.a2.toFixed(4)}`}
    ] },
    { key:'loss', label:'Càlcul de la pèrdua L', focus:{nodes:['out'], weights:[]}, sub:[
      {k:'sym', txt:'L = (ŷ - y)²'},
      {k:'num', txt:(s,f)=>`L = (${f.a2.toFixed(4)} - ${s.y})² = ${(loss(f.a2,s.y)).toFixed(6)}`}
    ] },
    { key:'grad_out', label:'Gradient sortida ∂L/∂v, ∂L/∂z³', focus:{nodes:['h1','h2','out'], weights:[['h1','out'],['h2','out']]}, sub:[
      {k:'sym', txt:'∂L/∂z³ = 2(ŷ - y) σ′(z³)'},
      {k:'num', txt:(s,f)=>`∂L/∂z³ = 2(${f.a2.toFixed(4)} - ${s.y}) σ′(${f.z2.toFixed(4)}) = TBD`},
      {k:'exp', txt:(s,f,g)=>`= ${g.dL_dz2.toFixed(6)}`},
      {k:'v', txt:(s,f,g)=>`∂L/∂v₁ = ${g.dL_dV0.toFixed(5)}, ∂L/∂v₂ = ${g.dL_dV1.toFixed(5)}`}
    ] },
    { key:'grad_h1', label:'Gradient cap a h1', focus:{nodes:['x1','x2','h1'], weights:[['x1','h1'],['x2','h1']]}, sub:[
      {k:'sym', txt:'∂L/∂W₁₁ = ∂L/∂z₁ x₁'},
      {k:'num', txt:(s,f,g)=>`∂L/∂z₁ = ${g.dL_dW[0][0]!==undefined? (g.dL_dW[0][0]/s.x[0]||0).toFixed(5):''}`},
      {k:'w', txt:(s,f,g)=>`∂L/∂W₁₁ = ${g.dL_dW[0][0].toFixed(5)}, ∂L/∂W₁₂ = ${g.dL_dW[0][1].toFixed(5)}`}
    ] },
    { key:'grad_h2', label:'Gradient cap a h2', focus:{nodes:['x1','x2','h2'], weights:[['x1','h2'],['x2','h2']]}, sub:[
      {k:'sym', txt:'∂L/∂W₂₁ = ∂L/∂z₂ x₁'},
      {k:'w', txt:(s,f,g)=>`∂L/∂W₂₁ = ${g.dL_dW[1][0].toFixed(5)}, ∂L/∂W₂₂ = ${g.dL_dW[1][1].toFixed(5)}`}
    ] },
    { key:'update', label:'Actualització de pesos', focus:{nodes:['x1','x2','h1','h2','out'], weights:[['x1','h1'],['x2','h1'],['x1','h2'],['x2','h2'],['h1','out'],['h2','out']]}, sub:[
      {k:'sym', txt:'w ← w - η·gradient'},
      {k:'num', txt:(s,f,g)=>`v₁ ← ${ (V[0]+parseFloat(lrEl.value)*g.dL_dV0).toFixed(2)} - η·${g.dL_dV0.toFixed(4)}`},
      {k:'done', txt:'Pesos actualitzats'}
    ] }
  ];
  phaseTotalEl.textContent = PHASES.length.toString();
  let phase = 0; // index dins PHASES
  let substep = 0; // index dins phase.sub
  let playing = false;
  let playTimer = null;

  function sigmoid(z){return 1/(1+Math.exp(-z));}
  function sigmoidDeriv(z){const s=sigmoid(z);return s*(1-s);}  
  function loss(pred, y){ return (pred - y)**2; }

  function forward(x){
    const z1 = [ W[0][0]*x[0] + W[0][1]*x[1] + b1[0], W[1][0]*x[0] + W[1][1]*x[1] + b1[1] ];
    const a1 = [ sigmoid(z1[0]), sigmoid(z1[1]) ];
    const z2 = V[0]*a1[0] + V[1]*a1[1] + b2;
    const a2 = sigmoid(z2);
    return {z1,a1,z2,a2};
  }

  function backward(x, y, cache){
    const dL_dz2 = 2*(cache.a2 - y)*sigmoidDeriv(cache.z2);
    const dL_dV0 = dL_dz2 * cache.a1[0];
    const dL_dV1 = dL_dz2 * cache.a1[1];
    const dL_db2 = dL_dz2;
    const dL_da1 = [ dL_dz2 * V[0], dL_dz2 * V[1] ];
    const dL_dz1 = [ dL_da1[0]*sigmoidDeriv(cache.z1[0]), dL_da1[1]*sigmoidDeriv(cache.z1[1]) ];
    const dL_dW = [ [ dL_dz1[0]*x[0], dL_dz1[0]*x[1] ], [ dL_dz1[1]*x[0], dL_dz1[1]*x[1] ] ];
    const dL_db1 = [ dL_dz1[0], dL_dz1[1] ];
    return {dL_dz2,dL_dV0,dL_dV1,dL_db2,dL_dW,dL_db1};
  }

  function updateWeights(grads){
    const lr = parseFloat(lrEl.value);
    V[0] -= lr*grads.dL_dV0; V[1] -= lr*grads.dL_dV1; b2 -= lr*grads.dL_db2;
    W[0][0] -= lr*grads.dL_dW[0][0]; W[0][1] -= lr*grads.dL_dW[0][1];
    W[1][0] -= lr*grads.dL_dW[1][0]; W[1][1] -= lr*grads.dL_dW[1][1];
    b1[0] -= lr*grads.dL_db1[0]; b1[1] -= lr*grads.dL_db1[1];
  }

  // animation state
  let animStart = null;
  let animProgress = 0; // 0..1

  function draw(sample, phaseObj){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    const fadeActive = phaseObj && phaseObj.focus;
    const f = forwardCache;

    // Node coordinates
    const coords = {
      x1:{x:110,y:110}, x2:{x:110,y:250},
      h1:{x:350,y:110}, h2:{x:350,y:250},
      out:{x:600,y:180}
    };

    function isNodeFocused(name){
      if(!fadeActive) return true;
      return phaseObj.focus.nodes.includes(name);
    }
    function isWeightFocused(a,b){
      if(!fadeActive) return true;
      return phaseObj.focus.weights.some(w=> w[0]===a && w[1]===b);
    }

    function weightColor(w){return w>=0? '#0b6bcb':'#d13f3f';}

    // Draw connections with optional fade + animated pulse thickness
    const weightsSpec = [
      ['x1','h1', W[0][0]], ['x2','h1', W[0][1]],
      ['x1','h2', W[1][0]], ['x2','h2', W[1][1]],
      ['h1','out', V[0]], ['h2','out', V[1]]
    ];
    weightsSpec.forEach(w=>{
      const a = coords[w[0]], b = coords[w[1]], val = w[2];
      ctx.save();
      if(!isWeightFocused(w[0], w[1])) ctx.globalAlpha = 0.08;
      // thickness pulse if focused edge in current substep
      const isFocus = isWeightFocused(w[0], w[1]);
      const baseWidth = 2;
      let width = baseWidth;
      if(isFocus && animProgress < 1 && phaseObj && phaseObj.key.startsWith('forward')){
        width = baseWidth + 3*Math.sin(animProgress*Math.PI);
      }
      ctx.beginPath(); ctx.moveTo(a.x+38,a.y); ctx.lineTo(b.x-38,b.y);
      ctx.strokeStyle = weightColor(val); ctx.lineWidth = width; ctx.stroke();
      // arrowhead
      const ang = Math.atan2(b.y - a.y, b.x - a.x);
      ctx.beginPath(); ctx.moveTo(b.x-38,b.y);
      ctx.lineTo(b.x-48*Math.cos(ang+0.25), b.y-48*Math.sin(ang+0.25));
      ctx.lineTo(b.x-48*Math.cos(ang-0.25), b.y-48*Math.sin(ang-0.25));
      ctx.closePath(); ctx.fillStyle = weightColor(val); ctx.fill();
      // weight label
      if(isWeightFocused(w[0],w[1])){
        const mx = (a.x+38 + b.x-38)/2; const my = (a.y + b.y)/2;
        ctx.fillStyle='#333'; ctx.font='12px Cabin'; ctx.fillText(val.toFixed(2), mx-12, my-6);
      }
      ctx.restore();
    });

    // Draw nodes
  const nodeList = ['x1','x2','h1','h2','out'];
    nodeList.forEach(name=>{
      const c = coords[name];
      ctx.save();
      const focused = isNodeFocused(name);
      if(!focused) ctx.globalAlpha = 0.08;
      const r = 36;
      // shell
      ctx.beginPath(); ctx.arc(c.x,c.y,r,0,Math.PI*2);
      const grad = ctx.createRadialGradient(c.x-5,c.y-8,4,c.x,c.y,r);
      if(name==='out') grad.addColorStop(0,'#fff7ed'), grad.addColorStop(1,'#ffe4cc');
      else if(name.startsWith('h')) grad.addColorStop(0,'#faf7ff'), grad.addColorStop(1,'#e9ddff');
      else grad.addColorStop(0,'#f2f9ff'), grad.addColorStop(1,'#d9ecff');
      ctx.fillStyle = grad; ctx.fill();
      ctx.lineWidth = focused?2.4:1.5; ctx.strokeStyle = focused? '#16394a':'#6d7a80'; ctx.stroke();
      // label & value
      ctx.fillStyle = '#111'; ctx.font='12px Cabin'; ctx.textAlign='center';
      let label = name;
      let valText='';
      if(forwardCache){
        if(name==='x1') valText = sample.x[0];
        if(name==='x2') valText = sample.x[1];
        if(name==='h1') valText = forwardCache.a1[0].toFixed(3);
        if(name==='h2') valText = forwardCache.a1[1].toFixed(3);
        if(name==='out') valText = forwardCache.a2.toFixed(3);
      }
      ctx.fillText(label, c.x, c.y-4);
      if(focused && valText!=='' && phase <= 3) { // only show values in forward/loss phases
        ctx.fillStyle='#333'; ctx.font='11px Cabin'; ctx.fillText(valText, c.x, c.y+14);
      }
      ctx.restore();
    });

    // Phase overlay explanation
    ctx.save();
  ctx.fillStyle='#385766'; ctx.font='14px Cabin';
  ctx.fillText(PHASES[phase].label + ` (${substep+1}/${PHASES[phase].sub.length})`, canvas.width/2 - 140, 30);
    ctx.restore();
  }

  function updateUI(sample){
  phaseIndexEl.textContent = (phase+1).toString();
    phaseLabel.textContent = PHASES[phase].label;
    btnPrev.disabled = phase===0;
    btnStep.textContent = phase === PHASES.length-1 ? 'Completa cicle' : 'Següent ⟩';
    elSampleVal.textContent = `[${sample.x[0]}, ${sample.x[1]}] → ${sample.y}`;
    const L = forwardCache ? loss(forwardCache.a2, sample.y) : NaN;
    if(!isNaN(L)) elLoss.textContent = L.toFixed(4);
    if(forwardCache) elPred.textContent = forwardCache.a2.toFixed(4);
  }

  function formulas(sample){
    const f = forwardCache;
    const g = gradsCache;
    let html = `<div class="formula-row"><strong>x</strong> = [${sample.x[0]}, ${sample.x[1]}], y=${sample.y}</div>`;
    if(phase>=0){
      html += `<div class="formula-row">z₁ = W₁₁ x₁ + W₁₂ x₂ + b₁ = ${W[0][0].toFixed(2)}*${sample.x[0]} + ${W[0][1].toFixed(2)}*${sample.x[1]} + ${b1[0].toFixed(2)} = ${f.z1[0].toFixed(4)}</div>`;
    }
    if(phase>=1){
      html += `<div class="formula-row">z₂ = W₂₁ x₁ + W₂₂ x₂ + b₂ = ${W[1][0].toFixed(2)}*${sample.x[0]} + ${W[1][1].toFixed(2)}*${sample.x[1]} + ${b1[1].toFixed(2)} = ${f.z1[1].toFixed(4)}</div>`;
    }
    if(phase>=2){
      html += `<div class="formula-row">z³ = v₁ a₁ + v₂ a₂ + b = ${V[0].toFixed(2)}*${f.a1[0].toFixed(2)} + ${V[1].toFixed(2)}*${f.a1[1].toFixed(2)} + ${b2.toFixed(2)} = ${f.z2.toFixed(4)}</div>`;
      html += `<div class="formula-row">ŷ = σ(z³) = ${f.a2.toFixed(4)}</div>`;
    }
    if(phase>=3){
      html += `<div class="formula-row">L = (ŷ - y)² = (${f.a2.toFixed(4)} - ${sample.y})² = ${(loss(f.a2,sample.y)).toFixed(6)}</div>`;
    }
    if(phase>=4 && g){
      html += `<div class="formula-row grad-title">∂L/∂v₁=${g.dL_dV0.toFixed(4)}, ∂L/∂v₂=${g.dL_dV1.toFixed(4)}; ∂L/∂z³=${g.dL_dz2.toFixed(4)}</div>`;
    }
    if(phase>=5 && g){
      html += `<div class="formula-row">∂L/∂W₁₁=${g.dL_dW[0][0].toFixed(4)}, ∂L/∂W₁₂=${g.dL_dW[0][1].toFixed(4)}</div>`;
    }
    if(phase>=6 && g){
      html += `<div class="formula-row">∂L/∂W₂₁=${g.dL_dW[1][0].toFixed(4)}, ∂L/∂W₂₂=${g.dL_dW[1][1].toFixed(4)}</div>`;
    }
    if(phase>=7 && g){
      html += `<div class="formula-row grad-title">Update: w ← w - η·gradient</div>`;
    }
    formulasBox.innerHTML = html;
  }

  function advance(){
    const sample = data[sampleIdx];
    if(phase === 0){
      forwardCache = forward(sample.x);
    } else if(phase === 4){
      // compute grads at start of outward gradient phase if not yet
      if(!gradsCache) gradsCache = backward(sample.x, sample.y, forwardCache);
    } else if(phase === 7){
      // apply update & reset caches for next cycle
      if(!gradsCache) gradsCache = backward(sample.x, sample.y, forwardCache);
      updateWeights(gradsCache);
    }
    // Redraw + formulas
    draw(sample, PHASES[phase]);
    updateUI(sample);
    formulas(sample);
    // manage substeps
    if(substep < PHASES[phase].sub.length-1){
      substep++;
    } else {
      substep = 0;
      phase = (phase + 1) % PHASES.length;
      if(phase===0){ gradsCache = null; forwardCache = null; }
    }
    updateEquation(sample);
  }

  function stepForward(){
    advance();
  }

  function stepBackward(){
    // Go back one substep or phase
    if(substep>0){ substep--; }
    else { phase = (phase-1+PHASES.length)%PHASES.length; substep = PHASES[phase].sub.length-1; }
    const sample=data[sampleIdx]; if(!forwardCache) forwardCache = forward(sample.x); if(!gradsCache && phase>=4) gradsCache= backward(sample.x, sample.y, forwardCache);
    draw(sample, PHASES[phase]); updateUI(sample); formulas(sample); updateEquation(sample, true);
  }

  function togglePlay(){
    if(!playing){
      playing = true; btnPlay.textContent='⏸ Pausa';
      const tick = ()=>{ stepForward(); const speed = parseFloat(speedEl.value); playTimer = setTimeout(tick, 900 / speed); };
      tick();
    } else {
      playing = false; btnPlay.textContent='▶ Auto'; clearTimeout(playTimer);
    }
  }

  function changeSample(){ sampleIdx = (sampleIdx+1)%data.length; phase=0; substep=0; gradsCache=null; forwardCache=null; const s=data[sampleIdx]; draw(s, PHASES[phase]); updateUI(s); formulas(s); updateEquation(s); }

  function resetAll(){ W = [ [0.7,-0.3], [0.4,0.9] ]; V=[1.2,-0.8]; b1=[0,0]; b2=0; sampleIdx=0; phase=0; substep=0; gradsCache=null; forwardCache=null; draw(data[0], PHASES[phase]); updateUI(data[0]); formulas(data[0]); updateEquation(data[0]); }

  function updateEquation(sample, backwards=false){
    if(!eqBox) return; const ph = PHASES[phase]; const s = sample; const f = forwardCache; const g = gradsCache;
    const sub = ph.sub[substep];
    let lines = [];
    for(let i=0;i<=substep;i++){
      const desc = ph.sub[i];
      let content = typeof desc.txt === 'function' ? desc.txt(s,f,g) : desc.txt;
      // refine numeric placeholders after grads computed
      if(desc.k==='num' && ph.key==='grad_out' && g){
        content = `∂L/∂z³ = 2(${f.a2.toFixed(4)} - ${s.y}) · σ′(${f.z2.toFixed(4)}) = ${(g.dL_dz2).toFixed(6)}`;
      }
      lines.push(`<div class="eq-line ${i===substep?'visible':'visible fade-out'}" data-k="${desc.k}">${content}</div>`);
    }
    eqBox.innerHTML = lines.join('');
  }

  function animLoop(ts){
    if(!animStart) animStart = ts; const dt = ts - animStart; animProgress = Math.min(1, dt/650);
    const sample = data[sampleIdx]; if(forwardCache) draw(sample, PHASES[phase]);
    if(animProgress<1) requestAnimationFrame(animLoop); else { animStart=null; animProgress=0; }
  }

  // Hook into step to trigger animation
  const origAdvance = advance;
  advance = function(){ origAdvance(); animStart=null; animProgress=0; requestAnimationFrame(animLoop); };

  // Events
  btnStep.addEventListener('click', stepForward);
  btnPrev.addEventListener('click', stepBackward);
  btnPlay.addEventListener('click', togglePlay);
  btnReset.addEventListener('click', resetAll);
  btnSample.addEventListener('click', changeSample);

  resetAll();
})();
