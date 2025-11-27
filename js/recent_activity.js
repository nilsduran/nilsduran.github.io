document.addEventListener('DOMContentLoaded', function() {
    console.log('Recent Activity Script Loaded');
    initRecentActivity();
});

const CACHE_KEY = 'recentActivityCache';

function initRecentActivity() {
    // Comentem loadFromCache() temporalment per forçar sempre les APIs
    // loadFromCache();
    fetchAndCacheAll();
}

/**
 * Neteja la caché per forçar una actualització completa
 */
function clearCache() {
    localStorage.removeItem(CACHE_KEY);
    console.log('Cache cleared - forcing fresh data fetch');
    fetchAndCacheAll();
}

/**
 * Converteix un número (ex: 4.5) a estrelles visuals (ex: ★★★★½)
 */
function convertRatingToStars(rating) {
    if (typeof rating === 'string') return rating; // Si ja és string, retorna tal com està
    if (typeof rating !== 'number') return ''; // Si no és número, retorna buit
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    let stars = '★'.repeat(fullStars);
    if (hasHalfStar) stars += '½';
    
    return stars;
}

/**
 * Carrega les dades des del localStorage i les mostra a la pàgina.
 */
function loadFromCache() {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (!cache) return;

    if (cache.movie) updateMovieHTML(cache.movie);
    if (cache.book) updateBookHTML(cache.book);
    if (cache.music) updateMusicHTML(cache.music);
    if (cache.travel) updateTravelHTML(cache.travel);
}

/**
 * Executa totes les funcions de fetch.
 */
function fetchAndCacheAll() {
    fetchBook();
    fetchMovie();
    fetchMusic();
    fetchTravel();
}

/**
 * Desa les dades al localStorage.
 * @param {string} key - 'movie', 'book', or 'music'
 * @param {object} data - L'objecte de dades a desar.
 */
function saveToCache(key, data) {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY)) || {};
    if (JSON.stringify(cache[key]) !== JSON.stringify(data)) {
        cache[key] = data;
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    }
}

// --- HTML UPDATE FUNCTIONS ---

function updateMovieHTML(data) {
    const movieTitleEl = document.querySelector('#recent-movie .recent-movie-title');
    const movieDirectorEl = document.querySelector('#recent-movie .recent-movie-director');
    const moviePosterEl = document.querySelector('#recent-movie .recent-movie-poster');
    const movieLinkEl = document.querySelector('#recent-movie .interest-link');

    if (movieTitleEl) movieTitleEl.textContent = data.title;
    if (movieDirectorEl) movieDirectorEl.textContent = data.subtitle;
    if (moviePosterEl) moviePosterEl.src = data.imgSrc || '/images/interests/recent/movie.jpg';
    if (movieLinkEl) movieLinkEl.href = data.link;
}

function updateBookHTML(data) {
    const bookTitleEl = document.querySelector('#recent-book .recent-book-title');
    const bookAuthorEl = document.querySelector('#recent-book .recent-book-author');
    const bookCoverEl = document.querySelector('#recent-book .recent-book-cover');
    const bookLinkEl = document.querySelector('#recent-book .interest-link');
    const bookStarsEl = document.querySelector('#recent-book .recent-book-stars');

    if (bookTitleEl) bookTitleEl.textContent = data.title;
    if (bookAuthorEl) bookAuthorEl.textContent = data.subtitle;
    if (bookCoverEl) bookCoverEl.src = data.imgSrc || '/images/interests/recent/book.jpg';
    if (bookLinkEl) bookLinkEl.href = data.link;
    if (bookStarsEl) bookStarsEl.textContent = convertRatingToStars(data.stars);
}

function updateMusicHTML(data) {
    const musicTitleEl = document.querySelector('#recent-music .recent-music-title');
    const musicArtistEl = document.querySelector('#recent-music .recent-music-artist');
    const musicCoverEl = document.querySelector('#recent-music .recent-music-cover');
    const musicLinkEl = document.querySelector('#recent-music .recent-music-link');

    if (musicTitleEl) musicTitleEl.textContent = data.title;
    if (musicArtistEl) musicArtistEl.textContent = data.subtitle;
    if (musicCoverEl) musicCoverEl.src = data.imgSrc || '/images/interests/recent/music.jpg';
    if (musicLinkEl) musicLinkEl.href = data.link;
}

function updateTravelHTML(data) {
    const travelTitleEl = document.querySelector('#recent-travel .recent-travel-title');
    const travelSubtitleEl = document.querySelector('#recent-travel .recent-travel-subtitle');
    const travelImageEl = document.querySelector('#recent-travel .recent-travel-image');
    const travelLinkEl = document.querySelector('#recent-travel .interest-link');
    const travelStarsEl = document.querySelector('#recent-travel .recent-travel-stars');

    if (travelTitleEl) travelTitleEl.textContent = data.title;
    if (travelSubtitleEl) travelSubtitleEl.textContent = data.subtitle;
    if (travelImageEl) travelImageEl.src = '/images/interests/recent/travel.jpg';
    if (travelLinkEl) travelLinkEl.href = data.link;
    if (travelStarsEl) travelStarsEl.textContent = convertRatingToStars(data.stars);
}

function updateUIWithError(section) {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (cache && cache[section]) return;

    let titleEl, subtitleEl;
    if (section === 'movie') {
        titleEl = document.querySelector('#recent-movie .recent-movie-title');
        subtitleEl = document.querySelector('#recent-movie .recent-movie-director');
    } else if (section === 'book') {
        titleEl = document.querySelector('#recent-book .recent-book-title');
        subtitleEl = document.querySelector('#recent-book .recent-book-author');
    } else if (section === 'music') {
        titleEl = document.querySelector('#recent-music .recent-music-title');
        subtitleEl = document.querySelector('#recent-music .recent-music-artist');
    } else if (section === 'travel') {
        titleEl = document.querySelector('#recent-travel .recent-travel-title');
        subtitleEl = document.querySelector('#recent-travel .recent-travel-subtitle');
    }
    if (titleEl) titleEl.textContent = 'Error en carregar';
    if (subtitleEl) subtitleEl.textContent = 'Refresca la pàgina';
}

// --- FETCH FUNCTIONS ---

function fetchBook() {
    fetch('/js/recent_book.json?t=' + new Date().getTime())
        .then(response => {
            if (!response.ok) return Promise.reject('recent_book.json not found');
            return response.json();
        })
        .then(data => {
            if (data) {
                updateBookHTML(data);
                saveToCache('book', data);
            }
        })
        .catch(error => {
            console.error('Error fetching book:', error);
            updateUIWithError('book');
        });
}

function fetchMovie() {
    fetch('/js/recent_movie.json?t=' + new Date().getTime())
        .then(response => {
            if (!response.ok) return Promise.reject('recent_movie.json not found');
            return response.json();
        })
        .then(data => {
            if (data) {
                updateMovieHTML(data);
                saveToCache('movie', data);
            }
        })
        .catch(error => {
            console.error('Error fetching movie:', error);
            updateUIWithError('movie');
        });
}

function fetchMusic() {
    fetch('/js/recent_music.json?t=' + new Date().getTime())
        .then(response => {
            if (!response.ok) return Promise.reject('recent_music.json not found');
            return response.json();
        })
        .then(data => {
            if (data) {
                updateMusicHTML(data);
                saveToCache('music', data);
            }
        })
        .catch(error => {
            console.error('Error fetching music:', error);
            updateUIWithError('music');
        });
}

function fetchTravel() {
    fetch('/js/recent_travel.json?t=' + new Date().getTime())
        .then(response => {
            if (!response.ok) return Promise.reject('recent_travel.json not found');
            return response.json();
        })
        .then(data => {
            if (data) {
                updateTravelHTML(data);
                saveToCache('travel', data);
            }
        })
        .catch(error => {
            console.error('Error fetching travel:', error);
            updateUIWithError('travel');
        });
}