---
layout: page
title: Interessos
permalink: /interests/
lang: ca
---

<style>
.interests-container {
  max-width: 800px;
  margin: 0 auto;
}

.interest-category {
  margin-bottom: 2rem; /* Reduït de 3rem a 2rem */
}

.interest-category h2 {
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.5rem; /* Tornat a la mida original de seccions */
  font-weight: 700; /* Pes normal per seccions */
  line-height: 1.25;
}

.interest-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
  align-items: end; /* Alinea els elements a la base per uniformitat visual */
}

.interest-item {
  position: relative;
  height: 240px; /* Altura fixa - les imatges s'adapten mantenint proporcions */
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.interest-link {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.interest-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}

.interest-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.interest-placeholder {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 0.8rem;
  text-align: center;
  padding: 1rem;
  height: 100%;
}

.interest-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  color: white;
  padding: 0.75rem 0.5rem 0.5rem;
  font-size: 0.75rem;
  line-height: 1.2;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.interest-item:hover .interest-overlay {
  opacity: 1;
}

.interest-title {
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.interest-subtitle {
  font-size: 0.7rem;
  opacity: 0.9;
}

.category-description {
  margin-top: 0.5rem;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
}

@media (max-width: 600px) {
  .interest-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  
  .interest-item {
    height: 200px; /* Altura lleugerament menor per mòbil */
  }
  
  .interest-category h2 {
    font-size: 1.6rem; /* Ajustat per mòbil */
  }
}
</style>

<div class="interests-container">
  
  <div class="interest-category">
    <h2>🎬 Pel·lícules</h2>
    <div class="interest-grid">
      <div class="interest-item">
        <a href="https://letterboxd.com/tique_011/film/the-sound-of-music/activity/" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/movies/movie1.jpg" alt="Pel·lícula 1" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Poster 1</div>'">
          <div class="interest-overlay">
            <div class="interest-title">The Sound of Music</div>
            <div class="interest-subtitle">Robert Wise • 1965</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="https://letterboxd.com/tique_011/film/dune-part-two/activity/" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/movies/movie2.jpg" alt="Pel·lícula 2" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Poster 2</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Dune: Part II</div>
            <div class="interest-subtitle">Denis Villeneuve • 2024</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="https://letterboxd.com/tique_011/film/little-women-2019/" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/movies/movie3.jpg" alt="Pel·lícula 3" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Poster 3</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Little Women</div>
            <div class="interest-subtitle">Greta Gerwig • 2019</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="https://letterboxd.com/tique_011/film/when-hitler-stole-pink-rabbit/activity/" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/movies/movie4.jpg" alt="Pel·lícula 4" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Poster 4</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Als Hitler das Rosa Kaninchen Stahl</div>
            <div class="interest-subtitle">Caroline Link • 2019</div>
          </div>
        </a>
      </div>
    </div>
    <div class="category-description">
      Les meves pel·lícules preferides que m'han marcat i continuen inspirant-me.
    </div>
  </div>

  <div class="interest-category">
    <h2>📚 Llibres</h2>
    <div class="interest-grid">
      <div class="interest-item">
        <a href="https://app.thestorygraph.com/reviews/99441071-67b2-40ee-9ec1-123df94e262b" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/books/book1.jpg" alt="Llibre 1" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Portada 1</div>'">
          <div class="interest-overlay">
            <div class="interest-title">The Power Broker</div>
            <div class="interest-subtitle">Robert A. Caro • 1974</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="https://app.thestorygraph.com/reviews/62ca5c57-16c9-4e55-a183-8cda391934f9" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/books/book2.jpg" alt="Llibre 2" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Portada 2</div>'">
          <div class="interest-overlay">
            <div class="interest-title">El Matí de la Sega</div>
            <div class="interest-subtitle">Suzanne Collins • 2025</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="https://app.thestorygraph.com/reviews/c42b426c-e800-43e2-b7ef-04952358426a" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/books/book3.jpg" alt="Llibre 3" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Portada 3</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Born a Crime</div>
            <div class="interest-subtitle">Trevor Noah • 2016</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="https://app.thestorygraph.com/reviews/ffc91366-cbd6-4234-bbe0-47f26c611906" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/books/book4.jpg" alt="Llibre 4" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Portada 4</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Percy Jackson 3: La maledicció del tità</div>
            <div class="interest-subtitle">Rick Riordan • 2007</div>
          </div>
        </a>
      </div>
    </div>
    <div class="category-description">
      Lectures que han enriquit la meva perspectiva i m'han ajudat a créixer.
    </div>
  </div>

  <div class="interest-category">
    <h2>🎵 Música</h2>
    <div class="interest-grid">
      <div class="interest-item">
        <a href="#" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/music/album1.jpg" alt="Àlbum 1" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Àlbum 1</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Nom Àlbum 1</div>
            <div class="interest-subtitle">Artista • Any</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="#" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/music/album2.jpg" alt="Àlbum 2" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Àlbum 2</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Nom Àlbum 2</div>
            <div class="interest-subtitle">Artista • Any</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="#" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/music/album3.jpg" alt="Àlbum 3" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Àlbum 3</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Nom Àlbum 3</div>
            <div class="interest-subtitle">Artista • Any</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="#" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/music/album4.jpg" alt="Àlbum 4" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Àlbum 4</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Nom Àlbum 4</div>
            <div class="interest-subtitle">Artista • Any</div>
          </div>
        </a>
      </div>
    </div>
    <div class="category-description">
      Els sons que acompanyen les meves jornades i alimenten la meva creativitat.
    </div>
  </div>

  <div class="interest-category">
    <h2>⚽ Esports</h2>
    <div class="interest-grid">
      <div class="interest-item">
        <img src="/images/interests/sports/sport1.jpg" alt="Esport 1" onerror="this.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Esport 1</div>'">
        <div class="interest-overlay">
          <div class="interest-title">Tennis</div>
          <div class="interest-subtitle">Roger Federer • Jannick Sinner</div>
        </div>
      </div>
      <div class="interest-item">
        <img src="/images/interests/sports/sport2.jpg" alt="Esport 2" onerror="this.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Esport 2</div>'">
        <div class="interest-overlay">
          <div class="interest-title">Futbol (Barça)</div>
          <div class="interest-subtitle">Messi • Lamine Yamal • Casadó</div>
        </div>
      </div>
      <div class="interest-item">
        <img src="/images/interests/sports/sport3.jpg" alt="Esport 3" onerror="this.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Esport 3</div>'">
        <div class="interest-overlay">
          <div class="interest-title">Escalada</div>
          <div class="interest-subtitle">Janja Garnbret</div>
        </div>
      </div>
      <div class="interest-item">
        <img src="/images/interests/sports/sport4.jpg" alt="Esport 4" onerror="this.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Esport 4</div>'">
        <div class="interest-overlay">
          <div class="interest-title">Escacs</div>
          <div class="interest-subtitle">Magnus Carlsen • Andrew Tang (penguingm1)</div>
        </div>
      </div>
    </div>
    <div class="category-description">
      Les disciplines esportives que segueixo, practico i m'emocionen.
    </div>
  </div>

  <div class="interest-category">
    <h2>🎨 Art</h2>
    <div class="interest-grid">
      <div class="interest-item">
        <a href="#" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/art/art1.jpg" alt="Obra 1" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Obra 1</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Nom Obra 1</div>
            <div class="interest-subtitle">Artista • Any</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="#" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/art/art2.jpg" alt="Obra 2" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Obra 2</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Nom Obra 2</div>
            <div class="interest-subtitle">Artista • Any</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="#" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/art/art3.jpg" alt="Obra 3" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Obra 3</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Nom Obra 3</div>
            <div class="interest-subtitle">Artista • Any</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="#" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/art/art4.jpg" alt="Obra 4" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Obra 4</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Nom Obra 4</div>
            <div class="interest-subtitle">Artista • Any</div>
          </div>
        </a>
      </div>
    </div>
    <div class="category-description">
      Peces artístiques que m'emocionen i m'inspiren en la meva vida quotidiana.
    </div>
  </div>

</div>
