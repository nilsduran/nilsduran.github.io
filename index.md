---
layout: default
lang: ca
permalink: /
---

<style>
.home-container {
  max-width: 1000px;
  margin: 2rem auto 0;
  position: relative;
}

.home-content {
  width: 100%;
}

.home-image {
  float: right;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}

.profile-image {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  border: 3px solid #f0f0f0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: block;
}

.home-title {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
  line-height: 1.3;
}

.home-subtitle {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #555;
  line-height: 1.5;
}

.home-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
}

/* Clear float after content */
.home-container::after {
  content: "";
  display: table;
  clear: both;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .home-image {
    float: none;
    text-align: center;
    margin: 2rem auto;
    display: block;
  }
  
  .profile-image {
    width: 180px;
    height: 180px;
  }
  
  .home-title {
    font-size: 1.5rem;
  }
}
</style>

<div class="home-container">
  <div class="home-content">
    <div class="home-image">
        <img src="/images/misc/headshot.jpg" alt="Nils Duran" class="profile-image">
        </div>
        
        <div class="home-title">
        Hola, soc en Nils Duran, estudiant d'IA de Barcelona, Catalunya.
        </div>
        
        <div class="home-subtitle">
        M'interessen tot tipus d'especialitats de la IA com ara NLP, CV, ML, Deep Learning i Reinforcement Learning. També m'interessen camps científics relacionats com ara la neurociència i biologia, i la física i les matemàtiques.
        </div>
        
        <div class="home-description">
        Actualment estudio Intel·ligència Artificial a la Facultat d'Informàtica de Barcelona a la Universitat Politècnica de Catalunya (FIB-UPC). Faré un Erasmus al Karlsruhe Institut für Technologie (KIT) a Karlsruhe, Baden-Württemberg, Alemanya.
        <br><br>
        
        Sóc un gran fan de:
          <br>
          
          <div style="margin-left: 1rem;">
            • 🧠 La Intel·ligència Artificial i el seu potencial per resoldre problemes del món real.<br>
            • 🎨 L'art en totes les seves formes com a eina transformadora. Alguns dels meus artistes preferits són l'Antoni Gaudí i en <a href="https://cjthex.com">CJ The X</a><br>
            • 📚 Els llibres per reflexionar i somiar. Alguns que recomano són <a href="https://app.thestorygraph.com/books/6b6b5cc8-3724-4a9a-8465-2fb9ea94b69d">The Power Broker, Robert A. Caro</a> i <a href="https://app.thestorygraph.com/books/fde79989-1f95-4499-b879-81e4722e14c7">La plaça del Diamant, Mercè Rodoreda</a>.<br>
            • L'escalada🧗, el tennis🎾, els escacs♟️ i el Barça<img src="/images/misc/escut-barça.png" alt="Barça Logo" style="width: 25px; height: 25px; vertical-align: middle;">. </div>
        </div>
  </div>
</div>


