---
layout: default
title: "CV"
permalink: /cv/
---

<div class="cv-container">
  <h1>Curriculum Vitae</h1>
  <p class="cv-subtitle">Darrera actualització: Agost 2025</p>
  
  <div class="cv-embed">
    <embed src="/Nils Duran CV.pdf" type="application/pdf" width="100%" height="965px">
    <p class="cv-fallback">
      Si no pots veure el PDF, <a href="/Nils Duran CV.pdf" target="_blank" download>descarrega'l aquí</a>.
    </p>
  </div>
</div>

<style>
.cv-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem 2rem 1rem;
}

.cv-subtitle {
  color: #666;
  font-style: italic;
  margin-bottom: 2rem;
  text-align: center;
}

.cv-embed {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: #f9f9f9;
  margin-bottom: 2rem;
}

.cv-embed embed {
  display: block;
  border: none;
}

.cv-fallback {
  text-align: center;
  padding: 1rem;
  margin: 0;
  background: #f0f0f0;
  border-top: 1px solid #ddd;
}

.cv-fallback a {
  color: #007acc;
  text-decoration: none;
  font-weight: bold;
}

.cv-fallback a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .cv-embed embed {
    height: 750px;
  }
  
  .cv-container {
    padding: 1rem 0.5rem;
  }
}
</style>
