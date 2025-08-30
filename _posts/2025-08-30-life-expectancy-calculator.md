---
layout: post
title: "Calculadora d'Esperança de Vida: Quan Moriràs?"
date: 2025-08-30
categories: health, minigame, interactive
summary: Calcula la teva esperança de vida amb un model de risc multiplicatiu i rep consells personalitzats per millorar la teva longevitat.
permalink: /blog/life-expectancy-calculator/
---

Aquesta calculadora utilitza un model de risc relatiu per predir la teva esperança de vida, assumint que els avenços mèdics continuaran a un ritme d'acceleració constant. Pots ajustar els teus hàbits i rebre consells personalitzats per allargar la teva vida. Les dades que introdueixis no s'emmagatzemaran per a cap motiu.

<div class="life-calculator">
  <div class="calculator-section">
    <h2>📋 Les Teves Dades</h2>
    
    <div class="input-group">
      <label for="birthDate">📅 Data de Naixement:</label>
      <input type="date" id="birthDate" onchange="calculateLifeExpectancy()">
    </div>
    
    <div class="input-group">
      <label for="gender">👤 Sexe:</label>
      <select id="gender" onchange="calculateLifeExpectancy()">
        <option value="">Selecciona...</option>
        <option value="male">Home</option>
        <option value="female">Dona</option>
        <option value="other">Altre</option>
      </select>
    </div>
    
    <div class="input-group">
      <label for="country">🌍 País:</label>
      <select id="country" onchange="calculateLifeExpectancy()">
        <option value="">Selecciona...</option>
        <option value="afghanistan" data-life-expectancy="64.8">Afganistan</option>
        <option value="germany" data-life-expectancy="81.3">Alemanya</option>
        <option value="algeria" data-life-expectancy="76.4">Algèria</option>
        <option value="andorra" data-life-expectancy="84.9">Andorra</option>
        <option value="saudiarabia" data-life-expectancy="75.1">Aràbia Saudita</option>
        <option value="argentina" data-life-expectancy="76.7">Argentina</option>
        <option value="australia" data-life-expectancy="83.4">Austràlia</option>
        <option value="austria" data-life-expectancy="81.6">Àustria</option>
        <option value="bangladesh" data-life-expectancy="72.8">Bangladesh</option>
        <option value="belgium" data-life-expectancy="82.1">Bèlgica</option>
        <option value="brazil" data-life-expectancy="75.9">Brasil</option>
        <option value="canada" data-life-expectancy="82.4">Canadà</option>
        <option value="catalonia" data-life-expectancy="84.1">Catalunya</option>
        <option value="colombia" data-life-expectancy="77.3">Colòmbia</option>
        <option value="korea" data-life-expectancy="83.5">Corea del Sud</option>
        <option value="denmark" data-life-expectancy="81.0">Dinamarca</option>
        <option value="egypt" data-life-expectancy="71.5">Egipte</option>
        <option value="spain" data-life-expectancy="83.8">Espanya</option>
        <option value="usa" data-life-expectancy="79.1">Estats Units</option>
        <option value="ethiopia" data-life-expectancy="67.8">Etiòpia</option>
        <option value="philippines" data-life-expectancy="69.3">Filipines</option>
        <option value="finland" data-life-expectancy="81.7">Finlàndia</option>
        <option value="france" data-life-expectancy="82.7">França</option>
        <option value="ghana" data-life-expectancy="64.1">Ghana</option>
        <option value="greece" data-life-expectancy="82.3">Grècia</option>
        <option value="netherlands" data-life-expectancy="82.3">Holanda</option>
        <option value="iemen" data-life-expectancy="66.1">Iemen</option>
        <option value="balears" data-life-expectancy="83.6">Illes Balears</option>
        <option value="india" data-life-expectancy="69.7">Índia</option>
        <option value="indonesia" data-life-expectancy="71.7">Indonèsia</option>
        <option value="iran" data-life-expectancy="76.7">Iran</option>
        <option value="iraq" data-life-expectancy="70.6">Iraq</option>
        <option value="ireland" data-life-expectancy="82.8">Irlanda</option>
        <option value="iceland" data-life-expectancy="83.3">Islàndia</option>
        <option value="italy" data-life-expectancy="83.5">Itàlia</option>
        <option value="japan" data-life-expectancy="84.8">Japó</option>
        <option value="kenya" data-life-expectancy="61.4">Kenya</option>
        <option value="luxembourg" data-life-expectancy="82.7">Luxemburg</option>
        <option value="madagascar" data-life-expectancy="67.0">Madagascar</option>
        <option value="malaysia" data-life-expectancy="76.2">Malàisia</option>
        <option value="morocco" data-life-expectancy="76.9">Marroc</option>
        <option value="mexico" data-life-expectancy="75.1">Mèxic</option>
        <option value="monaco" data-life-expectancy="86.5">Mònaco</option>
        <option value="myanmar" data-life-expectancy="67.1">Myanmar</option>
        <option value="nigeria" data-life-expectancy="54.7">Nigèria</option>
        <option value="norway" data-life-expectancy="82.3">Noruega</option>
        <option value="newzealand" data-life-expectancy="82.5">Nova Zelanda</option>
        <option value="pakistan" data-life-expectancy="67.3">Pakistan</option>
        <option value="valencia" data-life-expectancy="83.8">País Valencià</option>
        <option value="peru" data-life-expectancy="76.7">Perú</option>
        <option value="poland" data-life-expectancy="78.7">Polònia</option>
        <option value="portugal" data-life-expectancy="81.9">Portugal</option>
        <option value="uk" data-life-expectancy="81.2">Regne Unit</option>
        <option value="congo" data-life-expectancy="60.7">República Democràtica del Congo</option>
        <option value="russia" data-life-expectancy="72.6">Rússia</option>
        <option value="singapore" data-life-expectancy="85.8">Singapur</option>
        <option value="southafrica" data-life-expectancy="64.1">Sud-àfrica</option>
        <option value="sweden" data-life-expectancy="82.8">Suècia</option>
        <option value="switzerland" data-life-expectancy="84.25">Suïssa</option>
        <option value="sudan" data-life-expectancy="65.3">Sudan</option>
        <option value="thailand" data-life-expectancy="77.2">Tailàndia</option>
        <option value="tanzania" data-life-expectancy="65.5">Tanzània</option>
        <option value="turkey" data-life-expectancy="77.7">Turquia</option>
        <option value="chad" data-life-expectancy="54.2">Txad</option>
        <option value="ukraine" data-life-expectancy="72.1">Ucraïna</option>
        <option value="uganda" data-life-expectancy="63.4">Uganda</option>
        <option value="uzbekistan" data-life-expectancy="71.7">Uzbekistan</option>
        <option value="venezuela" data-life-expectancy="72.1">Veneçuela</option>
        <option value="vietnam" data-life-expectancy="75.4">Vietnam</option>
        <option value="chile" data-life-expectancy="80.2">Xile</option>
        <option value="china" data-life-expectancy="78.2">Xina</option>
      </select>
    </div>
    
    <div class="input-group">
      <label for="income">💰 Nivell Econòmic:</label>
      <select id="income" onchange="calculateLifeExpectancy()">
        <option value="">Selecciona...</option>
        <option value="top1" data-risk-multiplier="0.85">Top 1%</option>
        <option value="top10" data-risk-multiplier="0.92">Top 10%</option>
        <option value="middle50" data-risk-multiplier="1.0">Classe mitjana</option>
        <option value="bottom" data-risk-multiplier="1.25">Classe baixa</option>
      </select>
    </div>
  </div>

  <div class="calculator-section">
    <h2>🍎 Hàbits de Salut</h2>
    
    <div class="input-group">
      <label for="diet">🥗 Dieta:</label>
      <select id="diet" onchange="calculateLifeExpectancy()">
        <option value="">Selecciona...</option>
        <option value="omnivore" data-risk-multiplier="1.0">De tot</option>
        <option value="mediterranean" data-risk-multiplier="0.92">Dieta mediterrània</option>
        <option value="vegetarian" data-risk-multiplier="0.88">Dieta vegetariana</option>
        <option value="vegan" data-risk-multiplier="0.82">Dieta vegana</option>
      </select>
    </div>
    
    <div class="input-group">
      <label for="exercise">🏃‍♂️ Exercici (hores/setmana):</label>
      <select id="exercise" onchange="calculateLifeExpectancy()">
        <option value="">Selecciona...</option>
        <option value="none" data-risk-multiplier="1.40">0 hores</option>
        <option value="light" data-risk-multiplier="1.0">1-2 hores</option>
        <option value="moderate" data-risk-multiplier="0.85">3-5 hores</option>
        <option value="heavy" data-risk-multiplier="0.78">6-10 hores</option>
        <option value="extreme" data-risk-multiplier="0.75">10+ hores</option>
      </select>
    </div>
    
    <div class="input-group">
      <label for="smoking">🚬 Tabac:</label>
      <select id="smoking" onchange="calculateLifeExpectancy()">
        <option value="">Selecciona...</option>
        <option value="never" data-risk-multiplier="1.0">Mai he fumat</option>
        <option value="former" data-risk-multiplier="1.15">Ex-fumador</option>
        <option value="light" data-risk-multiplier="1.80">Fumador lleuger</option>
        <option value="heavy" data-risk-multiplier="2.50">Fumador empedreït</option>
      </select>
    </div>
    
    <div class="input-group">
      <label for="alcohol">🍷 Alcohol:</label>
      <select id="alcohol" onchange="calculateLifeExpectancy()">
        <option value="">Selecciona...</option>
        <option value="none" data-risk-multiplier="1.05">No bec</option>
        <option value="light" data-risk-multiplier="0.95">Consum lleuger</option>
        <option value="moderate" data-risk-multiplier="1.0">Consum moderat</option>
        <option value="heavy" data-risk-multiplier="1.50">Consum excessiu</option>
      </select>
    </div>
    
    <div class="input-group">
      <label for="sleep">😴 Hores de son per nit:</label>
      <select id="sleep" onchange="calculateLifeExpectancy()">
        <option value="">Selecciona...</option>
        <option value="poor" data-risk-multiplier="1.15">Menys de 6h</option>
        <option value="short" data-risk-multiplier="1.05">6-7h</option>
        <option value="optimal" data-risk-multiplier="1.0">7-8h</option>
        <option value="long" data-risk-multiplier="1.10">Més de 9h</option>
      </select>
    </div>
  </div>

  <div class="calculator-section">
    <h2>🧠 Benestar i Entorn</h2>
    <div class="input-group">
      <label for="social">🤝 Vida Social:</label>
      <select id="social" onchange="calculateLifeExpectancy()">
        <option value="">Selecciona...</option>
        <option value="strong" data-risk-multiplier="0.85">Molt activa i satisfactòria</option>
        <option value="moderate" data-risk-multiplier="1.0">Normal</option>
        <option value="isolated" data-risk-multiplier="1.35">Poc contacte social</option>
      </select>
    </div>
    <div class="input-group">
      <label for="education">🎓 Nivell d'Estudis:</label>
      <select id="education" onchange="calculateLifeExpectancy()">
        <option value="">Selecciona...</option>
        <option value="university" data-risk-multiplier="0.90">Universitaris o superior</option>
        <option value="secondary" data-risk-multiplier="1.0">Secundaris / Batxillerat</option>
        <option value="primary" data-risk-multiplier="1.15">Primaris o inferior</option>
      </select>
    </div>
  </div>

  <div class="results-section">
    <h2>🎯 Els Teus Resultats</h2>
    
    <div class="result-card" id="results">
      <div class="age-display">
        <span class="current-age">Edat actual: <span id="currentAge">--</span> anys</span>
      </div>
      
      <div class="life-expectancy-display">
        <span class="life-expectancy">Esperança de vida: <span id="lifeExpectancy">--</span> anys</span>
      </div>
      
      <div class="time-left-display">
        <span class="time-left">Temps restant: <span id="timeLeft">--</span></span>
      </div>
      
      <div class="death-date-display">
        <span class="death-date">Data estimada: <span id="deathDate">--</span></span>
      </div>
    </div>
    
    <div class="improvement-suggestions" id="suggestions">
      <h3>💡 Suggeriments per viure més temps</h3>
      <ul id="improvementList">
        <!-- Suggeriments dinàmics -->
      </ul>
    </div>
  </div>
</div>

## 📈 Metodologia

Aquesta calculadora no es limita a sumar o restar anys. Utilitza un **Model de Risc Relatiu Multiplicatiu**, un enfocament més sofisticat inspirat en estudis epidemiològics.

1.  **Esperança de Vida Base**: Comencem amb les dades oficials d'esperança de vida del país i sexe seleccionats.
2.  **Índex de Risc Personalitzat**: En lloc de sumar anys, cada un dels teus hàbits i factors socioeconòmics (dieta, exercici, tabac, etc.) modifica un **índex de risc de mortalitat**.
    *   Els hàbits saludables **redueixen** el teu risc (multiplicador < 1.0).
    *   Els hàbits de risc l'**augmenten** (multiplicador > 1.0).
3.  **Efecte Compost**: El model **multiplica** aquests factors entre si. Això significa que la combinació de múltiples mals hàbits té un impacte molt més gran que la simple suma de les seves parts, reflectint la realitat biològica.
4.  **Ajust Final**: L'índex de risc total s'utilitza per ajustar l'esperança de vida base de manera no lineal, proporcionant una estimació més realista i matisada.
5.  **Progrés Futur**: Finalment, s'aplica una projecció sobre els avenços mèdics futurs per calcular la data final.

### ⚠️ Limitacions

- **No és mèdic**: Aquesta eina és només educativa i estadística.
- **Factors no inclosos**: Genètica, malalties hereditàries, accidents.
- **Prediccions incertes**: Els avenços mèdics poden variar.
- **Promitjos**: Els resultats individuals poden diferir significativament.

<style>
.life-calculator {
  max-width: 800px;
  margin: 2rem auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
}

.calculator-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e9ecef;
}

.calculator-section h2 {
  margin-top: 0;
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.5rem;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.input-group input, .input-group select {
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: 2px solid #bdc3c7;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  height: auto;
  min-height: 44px;
  display: block;
  vertical-align: middle;
  line-height: 1.4;
  box-sizing: border-box;
}

#birthDate {
  width: 45%;
  min-height: 38px;
  padding: 0.5rem 0.6rem;
  font-size: 0.9rem;
}

.input-group input:focus, .input-group select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.results-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 1.5rem;
  color: white;
}

.results-section h2 {
  margin-top: 0;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 0.5rem;
}

.result-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  backdrop-filter: blur(10px);
}

.age-display, .life-expectancy-display, .time-left-display, .death-date-display {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.current-age, .life-expectancy, .time-left, .death-date {
  font-weight: 600;
}

.current-age span, .life-expectancy span, .time-left span, .death-date span {
  font-size: 1.3rem;
  color: #f1c40f;
  font-weight: 700;
}

.improvement-suggestions {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  backdrop-filter: blur(10px);
}

.improvement-suggestions h3 {
  margin-top: 0;
  color: #f39c12;
}

.improvement-suggestions ul {
  list-style: none;
  padding: 0;
}

.improvement-suggestions li {
  background: rgba(241, 196, 15, 0.2);
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  border-left: 4px solid #f1c40f;
}

@media (max-width: 768px) {
  .life-calculator {
    margin: 1rem;
    max-width: none;
  }
  
  .calculator-section, .results-section {
    padding: 1rem;
  }
}
</style>

<script>
let countdownInterval;

function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

function calculateMedicalProgress(yearsLeft) {
  // Assumint acceleració constant de 0.075 anys per any²
  const linearProgress = 0.08 * yearsLeft;
  const acceleratedProgress = 0.075 * Math.pow(yearsLeft, 1.3);
  return Math.round((linearProgress + acceleratedProgress) * 10) / 10;
}

function getCountryLifeExpectancy() {
  const countrySelect = document.getElementById('country');
  const selectedOption = countrySelect.options[countrySelect.selectedIndex];
  if (selectedOption && selectedOption.dataset.lifeExpectancy) {
    return parseFloat(selectedOption.dataset.lifeExpectancy);
  } else {
    // Valor per defecte si no es selecciona res (Catalunya)
    return 84.1;
  }
}

function getMultiplierFromSelect(elementId) {
  const element = document.getElementById(elementId);
  const selectedOption = element.options[element.selectedIndex];
  // Si no hi ha res seleccionat o no té valor, el risc és neutre (1.0)
  return (selectedOption && selectedOption.dataset.riskMultiplier) ? parseFloat(selectedOption.dataset.riskMultiplier) : 1.0;
}

function formatTimeLeft(milliseconds) {
  if (milliseconds <= 0) {
    return "Temps esgotat.";
  }
  
  const totalSeconds = Math.floor(milliseconds / 1000);
  const years = Math.floor(totalSeconds / 31536000);
  const days = Math.floor((totalSeconds % 31536000) / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let result = [];
  if (years > 0) result.push(`${years} ${years === 1 ? 'any' : 'anys'}`);
  if (days > 0) result.push(`${days} ${days === 1 ? 'dia' : 'dies'}`);
  if (hours > 0) result.push(`${hours} ${hours === 1 ? 'hora' : 'hores'}`);
  if (minutes > 0) result.push(`${minutes} ${minutes === 1 ? 'minut' : 'minuts'}`);
  result.push(`${seconds} ${seconds === 1 ? 'segon' : 'segons'}`);
  
  return result.slice(0, 6).join(', ');
}

function updateCountdown(targetDate) {
  const now = new Date().getTime();
  const timeLeft = targetDate.getTime() - now;
  document.getElementById('timeLeft').textContent = formatTimeLeft(timeLeft);
}

function startCountdown(targetDate) {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  updateCountdown(targetDate);
  countdownInterval = setInterval(() => {
    updateCountdown(targetDate);
  }, 1000);
}

function generateSuggestions() {
    const suggestionsList = document.getElementById('improvementList');
    suggestionsList.innerHTML = '';

    const potentialSuggestions = [
        {
            id: 'smoking',
            value: document.getElementById('smoking').value,
            risk: getMultiplierFromSelect('smoking'),
            suggestions: [
                { trigger: 'heavy', text: '🚭 PRIORITAT MÀXIMA: Deixar de fumar és la decisió que més pot allargar la teva vida.' },
                { trigger: 'light', text: '🚭 Deixar de fumar completament eliminaria un dels majors factors de risc per a la teva salut.' }
            ]
        },
        {
            id: 'exercise',
            value: document.getElementById('exercise').value,
            risk: getMultiplierFromSelect('exercise'),
            suggestions: [
                { trigger: 'none', text: '🏃‍♂️ Començar una rutina d\'exercici (150 min/setmana) pot reduir dràsticament el risc de mortalitat.' }
            ]
        },
        {
            id: 'social',
            value: document.getElementById('social').value,
            risk: getMultiplierFromSelect('social'),
            suggestions: [
                { trigger: 'isolated', text: '🤝 Enfortir les teves relacions socials té un impacte positiu sorprenentment gran en la longevitat.' }
            ]
        },
        {
            id: 'alcohol',
            value: document.getElementById('alcohol').value,
            risk: getMultiplierFromSelect('alcohol'),
            suggestions: [
                { trigger: 'heavy', text: '🍷 Reduir el consum d\'alcohol a un nivell moderat o lleuger pot millorar significativament la teva salut a llarg termini.' }
            ]
        },
        {
            id: 'diet',
            value: document.getElementById('diet').value,
            risk: getMultiplierFromSelect('diet'),
            suggestions: [
                { trigger: 'omnivore', text: '🥗 Adoptar una dieta més rica en vegetals (com la Mediterrània) té beneficis demostrats per a la longevitat.' }
            ]
        },
        {
            id: 'sleep',
            value: document.getElementById('sleep').value,
            risk: getMultiplierFromSelect('sleep'),
            suggestions: [
                { trigger: 'poor', text: '😴 Prioritzar un son de 7-8 hores per nit és fonamental per a la reparació cel·lular i la salut cerebral.' }
            ]
        }
    ];

    let applicableSuggestions = [];
    potentialSuggestions.forEach(item => {
        item.suggestions.forEach(suggestion => {
            if (item.value === suggestion.trigger) {
                applicableSuggestions.push({ text: suggestion.text, risk: item.risk });
            }
        });
    });

    // Ordenar per l'impacte (el multiplicador de risc més alt primer)
    applicableSuggestions.sort((a, b) => b.risk - a.risk);

    if (applicableSuggestions.length === 0) {
        suggestionsList.innerHTML = `
            <li>🎉 Felicitats! Els teus hàbits de salut són excel·lents. Continua així!</li>
            <li>🧘‍♂️ Per anar un pas més enllà, considera pràctiques com la meditació per gestionar l'estrès.</li>
        `;
    } else {
        // Mostrar només els 3 suggeriments més importants
        applicableSuggestions.slice(0, 3).forEach(sug => {
            const li = document.createElement('li');
            li.textContent = sug.text;
            suggestionsList.appendChild(li);
        });
    }
}

function calculateLifeExpectancy() {
  const birthDate = document.getElementById('birthDate').value;
  if (!birthDate) {
    clearResults();
    return;
  }

  const currentAge = calculateAge(birthDate);

  // 1. OBTENIR ESPERANÇA DE VIDA BASE (per país i sexe)
  const baseLifeExpectancy = getCountryLifeExpectancy();
  const gender = document.getElementById('gender').value;

  // A Catalunya, la bretxa és d'uns 5.5 anys. Ajustem la base.
  const genderGap = 5.5;
  let genderAdjustedBase = baseLifeExpectancy;
  if (gender === 'female') {
    genderAdjustedBase += genderGap / 2;
  } else if (gender === 'male') {
    genderAdjustedBase -= genderGap / 2;
  }

  // 2. CALCULAR EL MULTIPLICADOR DE RISC TOTAL
  let totalRiskMultiplier = 1.0;
  totalRiskMultiplier *= getMultiplierFromSelect('income');
  totalRiskMultiplier *= getMultiplierFromSelect('diet');
  totalRiskMultiplier *= getMultiplierFromSelect('exercise');
  totalRiskMultiplier *= getMultiplierFromSelect('smoking');
  totalRiskMultiplier *= getMultiplierFromSelect('alcohol');
  totalRiskMultiplier *= getMultiplierFromSelect('sleep');
  totalRiskMultiplier *= getMultiplierFromSelect('social');
  totalRiskMultiplier *= getMultiplierFromSelect('education');

  // 3. CONVERTIR RISC A AJUST D'ANYS
  const lifeExpectancyAdjustment = -12 * Math.log(totalRiskMultiplier);
  let adjustedLifeExpectancy = genderAdjustedBase + lifeExpectancyAdjustment;

  // 4. APLICAR LÒGICA CONDICIONAL
  if (currentAge > 50) {
      const survivalBonus = (currentAge - 50) * 0.1;
      adjustedLifeExpectancy += survivalBonus;
  }
  
  adjustedLifeExpectancy = Math.max(adjustedLifeExpectancy, currentAge + 2);

  // 5. AFEGIR PROGRÉS MÈDIC FUTUR
  const yearsLeft = Math.max(0.1, adjustedLifeExpectancy - currentAge);
  const medicalBonus = calculateMedicalProgress(yearsLeft);
  const finalLifeExpectancy = adjustedLifeExpectancy + medicalBonus;

  // 6. CALCULAR DATA DE MORT I ACTUALITZAR UI
  const birthDateTime = new Date(birthDate);
  const expectedDeathDate = new Date(birthDateTime.getTime() + finalLifeExpectancy * 365.25 * 24 * 60 * 60 * 1000);
  
  document.getElementById('currentAge').textContent = currentAge;
  document.getElementById('lifeExpectancy').textContent = Math.round(finalLifeExpectancy * 10) / 10;
  
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
  const dateStr = expectedDeathDate.toLocaleDateString('ca-ES', dateOptions);
  const timeStr = expectedDeathDate.toLocaleTimeString('ca-ES', timeOptions);
  const capitalizedDateStr = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
  document.getElementById('deathDate').textContent = `${capitalizedDateStr}, a les ${timeStr}`;
  
  startCountdown(expectedDeathDate);
  generateSuggestions();
}

function clearResults() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  document.getElementById('currentAge').textContent = '--';
  document.getElementById('lifeExpectancy').textContent = '--';
  document.getElementById('timeLeft').textContent = '--';
  document.getElementById('deathDate').textContent = '--';
  document.getElementById('improvementList').innerHTML = '<li>Introdueix la teva data de naixement per començar</li>';
}

document.addEventListener('DOMContentLoaded', function() {
  clearResults();
});
</script>