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
  font-size: 1.5rem; /* Tornat a la     <h2>🎵 Música</h2>   <h2>🎵 Música (només 4 artistes)</h2>ida original de seccions */
  font-weight: 700; /* Pes normal per seccions */
  line-height: 1.25;
}

.interest-grid {
  display: grid;
  grid-template-columns: repeat(4, 170px); /* Mida intermèdia: 170×255px = ratio 2:3 */
  gap: 0.75rem;
  margin-bottom: 1rem;
  align-items: end; /* Alinea els elements a la base per uniformitat visual */
  justify-content: center; /* Centra la grid si no omple tota l'amplada */
}

.interest-item {
  position: relative;
  width: 170px; /* Mida intermèdia */
  height: 255px; /* Altura proporcionalment correcta (170 × 1.5 = 255) */
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); /* Fons neutre per espais buits */
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

/* Estil especial per la categoria Art - grid 2x2 amb proporcions originals */
.art-category .interest-grid {
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem; /* Més espai entre imatges d'art */
  max-width: 900px; /* Amplada màxima per centrar millor */
  margin: 0 auto; /* Centrar la grid */
  align-items: start; /* Alinear al principi per evitar estiraments */
  justify-items: center; /* Centrar cada element dins la seva cel·la */
}

.art-category .interest-item {
  height: auto; /* Altura completament automàtica */
  width: auto; /* Amplada completament automàtica */
  max-width: 100%; /* No superar l'amplada de la cel·la de grid */
  background: transparent; /* Eliminar el fons gris per art */
  display: inline-block; /* Per ajustar-se al contingut */
}

.art-category .interest-item img {
  height: auto; /* Altura natural de la imatge */
  width: auto; /* Amplada natural de la imatge */
  max-width: 400px; /* Amplada màxima per evitar imatges massa grans */
  max-height: 350px; /* Altura màxima per evitar imatges massa altes */
  object-fit: contain; /* Mantenir proporcions exactes sense retallar */
  object-position: center;
  border-radius: 4px; /* Afegir border-radius directament a la imatge */
  display: block; /* Per eliminar espai extra sota la imatge */
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
  
  .art-category .interest-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .art-category .interest-item {
    min-height: 150px; /* Altura mínima menor per mòbil */
  }
  
  .art-category .interest-item img {
    max-height: 220px; /* Altura màxima menor per mòbil */
  }
}
</style>
<div class="interests-container">
  
  <!-- Pel·lícules -->
  <div class="interest-category">
    <h2>🎬 Pel·lícules</h2>
    <div class="interest-grid">
      <div class="interest-item">
        <a href="https://letterboxd.com/tique_011/film/the-sound-of-music/activity/" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/movies/the-sound-of-music.jpg" alt="Pel·lícula 1" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Poster 1</div>'">
          <div class="interest-overlay">
            <div class="interest-title">The Sound of Music</div>
            <div class="interest-subtitle">Robert Wise • 1965</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="https://letterboxd.com/tique_011/film/dune-part-two/activity/" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/movies/dune-part-two.jpg" alt="Pel·lícula 2" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Poster 2</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Dune: Part II</div>
            <div class="interest-subtitle">Denis Villeneuve • 2024</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="https://letterboxd.com/tique_011/film/little-women-2019/" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/movies/little-women.jpg" alt="Pel·lícula 3" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Poster 3</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Little Women</div>
            <div class="interest-subtitle">Greta Gerwig • 2019</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="https://letterboxd.com/tique_011/film/when-hitler-stole-pink-rabbit/activity/" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/movies/als-hitler-das-rosa-kaninchen-stahl.jpg" alt="Pel·lícula 4" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Poster 4</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Als Hitler das Rosa Kaninchen Stahl</div>
            <div class="interest-subtitle">Caroline Link • 2019</div>
          </div>
        </a>
      </div>
    </div>
  </div>

  <!-- Sèries -->
  <div class="interest-category">
    <h2> Sèries</h2>
    <div class="interest-grid">
      <div class="interest-item">
        <a href="https://www.imdb.com/title/tt0367279/" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/shows/arrested-development.jpg" alt="Sèrie 1" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Sèrie 1</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Arrested Development</div>
            <div class="interest-subtitle">Mitchell Hurwitz • 2003-2019</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="https://www.imdb.com/title/tt2467372/" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/shows/brooklyn-nine-nine.jpg" alt="Sèrie 2" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Sèrie 2</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Brooklyn Nine-Nine</div>
            <div class="interest-subtitle">Dan Goor, Michael Schur • 2013-2021</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="https://www.imdb.com/title/tt0352089/" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/shows/plats-bruts.jpg" alt="Sèrie 3" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Sèrie 3</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Plats Bruts</div>
            <div class="interest-subtitle">Joel Joan, Jordi Sánchez • 1999-2002</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="https://www.imdb.com/title/tt1439629/" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/shows/community.jpg" alt="Sèrie 4" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Sèrie 4</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Community</div>
            <div class="interest-subtitle">Dan Harmon • 2009-2015</div>
          </div>
        </a>
      </div>
    </div>
  </div>

  <!-- Llibres de ficció -->
  <div class="interest-category">
    <h2>📚 Ficció</h2>
    <div class="interest-grid">
      <div class="interest-item">
        <a href="https://app.thestorygraph.com/reviews/9b49ae8e-0b73-4d4b-bb89-ee7c98a80aef" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/fiction/el-mati-de-la-sega.jpg" alt="Llibre ficció 1" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Portada 1</div>'">
          <div class="interest-overlay">
            <div class="interest-title">El matí de la sega</div>
            <div class="interest-subtitle">Suzanne Collins • 2025</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="https://app.thestorygraph.com/reviews/ffc91366-cbd6-4234-bbe0-47f26c611906" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/fiction/percy-jackson-la-malediccio-del-tita.jpg" alt="Llibre ficció 2" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Portada 2</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Percy Jackson 3: La maledicció del tità</div>
            <div class="interest-subtitle">Rick Riordan • 2007</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="https://app.thestorygraph.com/reviews/cbe98c2e-abb0-434d-94f2-ec25f4a718b5" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/fiction/la-placa-del-diamant.jpg" alt="Llibre ficció 3" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Portada 3</div>'">
          <div class="interest-overlay">
            <div class="interest-title">La plaça del diamant</div>
            <div class="interest-subtitle">Mercè Rodoreda • 1962</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="https://app.thestorygraph.com/reviews/14927454-0ced-4db7-a46a-b111e596a9a3" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/fiction/the-hate-u-give.jpg" alt="Llibre ficció 4" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Portada 4</div>'">
          <div class="interest-overlay">
            <div class="interest-title">The Hate U Give</div>
            <div class="interest-subtitle">Angie Thomas • 2017</div>
          </div>
        </a>
      </div>
    </div>
  </div>

  <!-- Llibres de no-ficció -->
  <div class="interest-category">
    <h2>📖 No-ficció</h2>
    <div class="interest-grid">
      <div class="interest-item">
        <a href="https://app.thestorygraph.com/reviews/99441071-67b2-40ee-9ec1-123df94e262b" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/nonfiction/the-power-broker.jpg" alt="Llibre no-ficció 1" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Portada 1</div>'">
          <div class="interest-overlay">
            <div class="interest-title">The Power Broker</div>
            <div class="interest-subtitle">Robert Caro • 1974</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="https://app.thestorygraph.com/books/b73a25c2-bcf4-4b66-a14e-1df9c1a4d59c" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/nonfiction/artificial-intelligence-modern-approach.jpg" alt="Llibre no-ficció 2" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Portada 2</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Artificial Intelligence: A Modern Approach</div>
            <div class="interest-subtitle">Stuart Russell i Peter Norvig • 1994</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="#" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/nonfiction/africa-is-not-a-country.jpg" alt="Llibre no-ficció 3" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Portada 3</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Africa is Not a Country</div>
            <div class="interest-subtitle">Dipo Faloyin • 2022</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="https://app.thestorygraph.com/reviews/3cb87e45-cbe7-4fcf-8c7b-c2a519eb7a4d" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/nonfiction/everything-is-tuberculosis.jpg" alt="Llibre no-ficció 4" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Portada 4</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Everything is Tuberculosis</div>
            <div class="interest-subtitle">John Green • 2025</div>
          </div>
        </a>
      </div>
    </div>
  </div>

  <!-- Música (artistes i àlbums favorits) -->
  <div class="interest-category">
    <h2>� Música</h2>
    <div class="interest-grid">
      <!-- Artistes seleccionats -->
      <div class="interest-item">
        <a href="https://open.spotify.com/artist/1hOwyBjBzD71G76KApDEy5" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/music/la-ludwig-band.jpg" alt="La Ludwig Band" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>La Ludwig Band</div>'">
          <div class="interest-overlay">
            <div class="interest-title">La Ludwig Band</div>
            <div class="interest-subtitle">Pop-rock folk • Àlbums favorits</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="#" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/music/snarky-puppy.jpg" alt="Snarky Puppy" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Snarky Puppy</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Snarky Puppy</div>
            <div class="interest-subtitle">Jazz Fusion • We Like It Here, Culcha Vulcha</div>
          </div>
        </a>
      </div>
      <!-- Artistes individuals -->
      <div class="interest-item">
        <a href="#" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/music/kendrick-lamar.jpg" alt="Kendrick Lamar" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Kendrick Lamar</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Kendrick Lamar</div>
            <div class="interest-subtitle">Hip Hop • To Pimp a Butterfly</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="#" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/music/james-newton-howard.jpg" alt="James Newton Howard" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>James Newton Howard</div>'">
          <div class="interest-overlay">
            <div class="interest-title">James Newton Howard</div>
            <div class="interest-subtitle">Film Composer • BSO The Hunger Games</div>
          </div>
        </a>
      </div>
    </div>
  </div>

  <!-- Musicals -->
  <div class="interest-category">
    <h2>🎭 Musicals</h2>
    <div class="interest-grid">
      <div class="interest-item">
        <a href="#🎭-musicals" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/musicals/hamilton.jpg" alt="Musical 1" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Musical 1</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Hamilton</div>
            <div class="interest-subtitle">Lin-Manuel Miranda • 2015</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="https://www.teatrevictoria.com/ca/cartellera/c/183-mar-i-cel.html" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/musicals/the-phantom-of-the-opera.jpg" alt="Musical 2" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Musical 2</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Mar i Cel</div>
            <div class="interest-subtitle">Dagoll Dagom • 1988</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="#🎭-musicals" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/musicals/west-side-story.jpg" alt="Musical 3" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Musical 3</div>'">
          <div class="interest-overlay">
            <div class="interest-title">West Side Story</div>
            <div class="interest-subtitle">Leonard Bernstein • 1957</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="#🎭-musicals" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/musicals/matilda.jpg" alt="Musical 4" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Musical 4</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Matilda</div>
            <div class="interest-subtitle">Tim Minchin i Dennis Kelly • 2010</div>
          </div>
        </a>
      </div>
    </div>
  </div>

  <!-- Menjar -->
  <div class="interest-category">
    <h2>🍽️ Menjar</h2>
    <div class="interest-grid">
      <div class="interest-item">
        <a href="#" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/food/canelons.png" alt="Menjar 1" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Menjar 1</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Canelons</div>
            <div class="interest-subtitle"></div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="https://3focs.com/ca/" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/food/carxofes.jpg" alt="Menjar 2" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Menjar 2</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Carxofes a la brasa</div>
            <div class="interest-subtitle"></div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="https://www.timeout.cat/barcelona/ca/restaurants/gaig-barcelona" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/food/macarrons.jpg" alt="Menjar 3" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Menjar 3</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Macarrons gratinats</div>
            <div class="interest-subtitle"></div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="https://www.barmolina.com/ca/" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/food/pa-amb-tomàquet.jpg" alt="Menjar 4" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Menjar 4</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Pa amb tomàquet</div>
            <div class="interest-subtitle"></div>
          </div>
        </a>
      </div>
    </div>
  </div>

  <!-- Animals -->
  <div class="interest-category">
    <h2>🐾 Animals</h2>
    <div class="interest-grid">
      <div class="interest-item">
        <a href="#" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/animals/orca.jpg" alt="Animal 1" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Animal 1</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Orca</div>
            <div class="interest-subtitle"></div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="#" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/animals/gat.jpg" alt="Animal 2" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Animal 2</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Gat</div>
            <div class="interest-subtitle"></div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="#" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/animals/elefant.jpg" alt="Animal 3" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Animal 3</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Elefant</div>
            <div class="interest-subtitle"></div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="#" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/animals/lleopard.jpg" alt="Animal 4" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Animal 4</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Lleopard</div>
            <div class="interest-subtitle"></div>
          </div>
        </a>
      </div>
    </div>
  </div>

  <!-- Esports -->
  <div class="interest-category">
    <h2>⚽ Esports</h2>
    <div class="interest-grid">
      <div class="interest-item">
        <a href="#⚽-esports" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/sports/tennis.jpg" alt="Esport 1" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Esport 1</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Tennis</div>
            <div class="interest-subtitle">Roger Federer, Jannik Sinner</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="#⚽-esports" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/sports/fc-barcelona.jpg" alt="Esport 2" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Esport 2</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Futbol (Barça)</div>
            <div class="interest-subtitle">Messi, Lamine Yamal, Casadó</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="#⚽-esports" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/sports/climbing.jpg" alt="Esport 3" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Esport 3</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Escalada</div>
            <div class="interest-subtitle">Janja Garnbret</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="#⚽-esports" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/sports/chess.jpg" alt="Esport 4" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Esport 4</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Escacs</div>
            <div class="interest-subtitle">Magnus Carlsen, penguingm1</div>
          </div>
        </a>
      </div>
    </div>
  </div>

  <!-- Obres d'art -->
  <div class="interest-category art-category">
    <h2>🎨 Obres d'art</h2>
    <div class="interest-grid">
      <div class="interest-item">
        <a href="https://artsandculture.google.com/asset/shipwreck-off-a-rocky-coast-nuijen-wijnand/jwHeR2DfWY0qpw" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/art/shipwreck-off-rocky-coast-nuijen.jpg" alt="Obra 1" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Obra 1</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Naufragi a la costa rocosa</div>
            <div class="interest-subtitle">Wijnand Nuijen • 1837</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="https://artsandculture.google.com/asset/california-spring-albert-bierstadt-1830%E2%80%931902/bAE9fcwSxFxp4w" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/art/california-spring-bierstadt.jpg" alt="Obra 2" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Obra 2</div>'">
          <div class="interest-overlay">
            <div class="interest-title">California Spring</div>
            <div class="interest-subtitle">Alfred Bierstadt • 1875</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="https://sagradafamilia.org/" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/art/sagrada-familia-gaudi.jpg" alt="Obra 3" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Obra 3</div>'">
          <div class="interest-overlay">
            <div class="interest-title">La Sagrada Família</div>
            <div class="interest-subtitle">Antoni Gaudí • 1882-</div>
          </div>
        </a>
      </div>
      <div class="interest-item">
        <a href="https://artsandculture.google.com/asset/avenue-of-plane-trees/wQFzEqx_dpfP6Q" class="interest-link" target="_blank" rel="noopener">
          <img src="/images/interests/art/avenue-plane-trees-rusinol.jpg" alt="Obra 4" onerror="this.parentElement.parentElement.innerHTML='<div class=&quot;interest-placeholder&quot;>Obra 4</div>'">
          <div class="interest-overlay">
            <div class="interest-title">Passeig dels plàtans</div>
            <div class="interest-subtitle">Santiago Rusiñol • 1916</div>
          </div>
        </a>
      </div>
    </div>
  </div>

</div>