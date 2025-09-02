// Script per actualitzar automàticament les activitats recents
// Inclou integracions amb Letterboxd, Last.fm i altres APIs

class RecentActivityUpdater {
  constructor() {
    this.corsProxy = 'https://proxy.cors.sh/';
    this.usernames = {
      letterboxd: 'Tique_011',
      storygraph: 'nilsnoether73',
      lastfm: 'nilsdula'
    };
    this.apiKeys = {
      lastfm: '1c59d3b2e1bdf619a62da8b888762fa7'
    };
  }

  async updateLetterboxdActivity() {
    try {
      // Letterboxd no té API oficial, però podem fer scraping del RSS
      const rssUrl = `https://letterboxd.com/${this.usernames.letterboxd}/rss/`;
      const response = await fetch(`${this.corsProxy}${rssUrl}`, {
        headers: {
          'x-requested-with': 'XMLHttpRequest'
        }
      });
      const text = await response.text();
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, 'text/xml');
      const items = xmlDoc.querySelectorAll('item');
      
      if (items.length > 0) {
        const latestItem = items[0];
        const title = latestItem.querySelector('letterboxd\\:filmTitle, filmTitle')?.textContent;
        const year = latestItem.querySelector('letterboxd\\:filmYear, filmYear')?.textContent;
        const director = latestItem.querySelector('letterboxd\\:director, director')?.textContent;
        const image = latestItem.querySelector('description')?.textContent?.match(/src="([^"]+)"/)?[1];
        
        this.updateMovieCard({
          title: title || 'Última pel·lícula',
          director: director || 'Director desconegut',
          year: year,
          image: image || '/images/interests/recent/movie.jpg'
        });
      }
    } catch (error) {
      console.log('No s\'ha pogut actualitzar Letterboxd:', error);
      this.setMovieFallback();
    }
  }

  async updateLastFmActivity() {
    try {
      const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${this.usernames.lastfm}&api_key=${this.apiKeys.lastfm}&format=json&limit=1`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.recenttracks && data.recenttracks.track && data.recenttracks.track.length > 0) {
        const track = Array.isArray(data.recenttracks.track) ? data.recenttracks.track[0] : data.recenttracks.track;
        
        this.updateMusicCard({
          title: track.name || 'Cançó desconeguda',
          artist: track.artist?.['#text'] || 'Artista desconegut',
          image: track.image?.[3]?.['#text'] || '/images/interests/recent/music.jpg',
          url: track.url
        });
      }
    } catch (error) {
      console.log('No s\'ha pogut actualitzar Last.fm:', error);
      this.setMusicFallback();
    }
  }

  async updateStoryGraphActivity() {
    try {
      const response = await fetch(`${this.corsProxy}https://app.thestorygraph.com/profile/${this.usernames.storygraph}`, {
        headers: {
          'x-requested-with': 'XMLHttpRequest'
        }
      });
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');

      let bookData = null;

      // Prioritize "Currently Reading"
      const currentlyReading = doc.querySelector('.currently-reading-group-container .book-pane-content');
      if (currentlyReading) {
        const title = currentlyReading.querySelector('h3 a')?.textContent.trim();
        const author = currentlyReading.querySelector('p a')?.textContent.trim();
        const image = currentlyReading.querySelector('img')?.src;
        if (title && author && image) {
          bookData = { title, author, image };
        }
      }

      // If no "Currently Reading", find the latest "Read" book
      if (!bookData) {
        const feedEntries = doc.querySelectorAll('.feed-entry-container');
        for (const entry of feedEntries) {
          const actionText = entry.querySelector('.action-text-container')?.innerHTML;
          if (actionText && actionText.includes('as <strong>Read</strong>')) {
            const title = entry.querySelector('.book-title-author-and-series h3 a')?.textContent.trim();
            const author = entry.querySelector('.book-title-author-and-series p a')?.textContent.trim();
            const image = entry.querySelector('.book-cover-container img')?.src;
            if (title && author && image) {
              bookData = { title, author, image };
              break; // Found the latest one
            }
          }
        }
      }

      if (bookData) {
        this.updateBookCard(bookData);
      } else {
        this.setBookFallback();
      }
    } catch (error) {
      console.log('No s\'ha pogut actualitzar The StoryGraph:', error);
      this.setBookFallback();
    }
  }

  updateMovieCard(movieData) {
    const movieCard = document.getElementById('recent-movie');
    if (movieCard) {
      const img = movieCard.querySelector('.recent-movie-poster');
      const title = movieCard.querySelector('.recent-movie-title');
      const director = movieCard.querySelector('.recent-movie-director');
      
      if (img) img.src = movieData.image;
      if (title) title.textContent = movieData.title;
      if (director) director.textContent = `${movieData.director}${movieData.year ? ' \u2022 ' + movieData.year : ''}`;
    }
  }

  updateMusicCard(musicData) {
    const musicCard = document.getElementById('recent-music');
    if (musicCard) {
      const img = musicCard.querySelector('.recent-music-cover');
      const title = musicCard.querySelector('.recent-music-title');
      const artist = musicCard.querySelector('.recent-music-artist');
      const link = musicCard.querySelector('.recent-music-link');
      
      if (img) img.src = musicData.image;
      if (title) title.textContent = musicData.title;
      if (artist) artist.textContent = musicData.artist;
      if (link && musicData.url) link.href = musicData.url;
    }
  }

  updateBookCard(bookData) {
    const bookCard = document.getElementById('recent-book');
    if (bookCard) {
      const img = bookCard.querySelector('.recent-book-cover');
      const title = bookCard.querySelector('.recent-book-title');
      const author = bookCard.querySelector('.recent-book-author');
      
      if (img) img.src = bookData.image;
      if (title) title.textContent = bookData.title;
      if (author) author.textContent = bookData.author;
    }
  }

  setMovieFallback() {
    this.updateMovieCard({
      title: 'Última pel·lícula',
      director: 'Visita Letterboxd',
      image: '/images/interests/recent/movie.jpg'
    });
  }

  setMusicFallback() {
    this.updateMusicCard({
      title: 'Última cançó',
      artist: 'Connecta Last.fm',
      image: '/images/interests/recent/music.jpg'
    });
  }

  setBookFallback() {
    this.updateBookCard({
      title: 'Últim llibre',
      author: 'Actualització manual',
      image: '/images/interests/recent/book.jpg'
    });
  }

  async updateAll() {
    console.log('Actualitzant activitats recents...');
    
    // Executem totes les actualitzacions en paral·lel
    await Promise.allSettled([
      this.updateLetterboxdActivity(),
      this.updateLastFmActivity(),
      this.updateStoryGraphActivity()
    ]);
    
    console.log('Actualització d\'activitats recents completada');
  }
}

// Inicialitzem quan la pàgina es carregui
document.addEventListener('DOMContentLoaded', () => {
  const updater = new RecentActivityUpdater();
  updater.updateAll();
  
  // Actualitzem cada 5 minuts
  setInterval(() => {
    updater.updateAll();
  }, 5 * 60 * 1000);
});