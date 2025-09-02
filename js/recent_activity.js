document.addEventListener('DOMContentLoaded', function() {
    initRecentActivity();
});

const CACHE_KEY = 'recentActivityCache';

function initRecentActivity() {
    loadFromCache();
    fetchAndCacheAll();
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
}

/**
 * Executa totes les funcions de fetch.
 */
function fetchAndCacheAll() {
    fetchLetterboxd();
    fetchStoryGraph();
    fetchLastFm();
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
    if (moviePosterEl && data.imgSrc) moviePosterEl.src = data.imgSrc;
    if (movieLinkEl) movieLinkEl.href = data.link;
}

function updateBookHTML(data) {
    const bookTitleEl = document.querySelector('#recent-book .recent-book-title');
    const bookAuthorEl = document.querySelector('#recent-book .recent-book-author');
    const bookCoverEl = document.querySelector('#recent-book .recent-book-cover');
    const bookLinkEl = document.querySelector('#recent-book .interest-link');

    if (bookTitleEl) bookTitleEl.textContent = data.title;
    if (bookAuthorEl) bookAuthorEl.textContent = data.subtitle;
    if (bookCoverEl && data.imgSrc) bookCoverEl.src = data.imgSrc;
    if (bookLinkEl) bookLinkEl.href = data.link;
}

function updateMusicHTML(data) {
    const musicTitleEl = document.querySelector('#recent-music .recent-music-title');
    const musicArtistEl = document.querySelector('#recent-music .recent-music-artist');
    const musicCoverEl = document.querySelector('#recent-music .recent-music-cover');
    const musicLinkEl = document.querySelector('#recent-music .recent-music-link');

    if (musicTitleEl) musicTitleEl.textContent = data.title;
    if (musicArtistEl) musicArtistEl.textContent = data.subtitle;
    if (musicCoverEl && data.imgSrc) musicCoverEl.src = data.imgSrc;
    if (musicLinkEl) musicLinkEl.href = data.link;
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
    }
    if (titleEl) titleEl.textContent = 'Error en carregar';
    if (subtitleEl) subtitleEl.textContent = 'Refresca la pàgina';
}

// --- FETCH FUNCTIONS ---

function fetchLetterboxd() {
    const letterboxdUrl = 'https://letterboxd.com/tique_011/rss/';
    const proxyUrl = 'https://api.allorigins.win/get?url=';

    fetch(proxyUrl + encodeURIComponent(letterboxdUrl))
        .then(response => response.ok ? response.json() : Promise.reject('Error fetching Letterboxd via proxy'))
        .then(proxyData => {
            if (!proxyData.contents) return Promise.reject('Proxy returned empty contents for Letterboxd');
            
            const data = new window.DOMParser().parseFromString(proxyData.contents, "text/xml");
            const item = data.querySelector("item");
            if (item) {
                const titleWithDetails = item.querySelector("title").textContent;
                const link = item.querySelector("link").textContent;
                const description = item.querySelector("description").textContent;
                const doc = new DOMParser().parseFromString(description, 'text/html');
                const imgSrc = doc.querySelector('img') ? doc.querySelector('img').src.replace(/-\d+-0-\d+-crop/, '-500-0-750-crop') : '';
                const title = titleWithDetails.split(' (')[0];
                const year = (titleWithDetails.match(/\((\d{4})\)/) || [])[1] || '';

                const movieData = { title, subtitle: year, imgSrc, link };
                updateMovieHTML(movieData);
                saveToCache('movie', movieData);
            }
        })
        .catch(error => {
            console.error('Error fetching Letterboxd data:', error);
            updateUIWithError('movie');
        });
}

function fetchStoryGraph() {
    // Llegeix el fitxer JSON local que genera la GitHub Action
    fetch('/js/recent_book.json')
        .then(response => {
            // Afegeix una comprovació per si el fitxer encara no existeix
            if (!response.ok) {
                return Promise.reject('El fitxer recent_book.json no s\'ha trobat.');
            }
            return response.json();
        })
        .then(bookData => {
            if (bookData) {
                updateBookHTML(bookData);
                saveToCache('book', bookData);
            }
        })
        .catch(error => {
            console.error('Error fetching StoryGraph data:', error);
            updateUIWithError('book');
        });
}

function fetchLastFm() {
    const apiKey = '1c59d3b2e1bdf619a62da8b888762fa7';
    const username = 'nilsdula';
    const lastFmUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;
    const proxyUrl = 'https://api.allorigins.win/get?url=';

    fetch(proxyUrl + encodeURIComponent(lastFmUrl))
        .then(response => response.ok ? response.json() : Promise.reject('Error fetching Last.fm via proxy'))
        .then(proxyData => {
            if (!proxyData.contents) return Promise.reject('Proxy returned empty contents for Last.fm');
            
            const data = JSON.parse(proxyData.contents);
            if (data.error) return Promise.reject(`Last.fm API Error: ${data.message}`);

            const track = data?.recenttracks?.track?.[0];
            if (track) {
                const trackName = track.name;
                const artistName = track.artist['#text'];
                const albumArt = (track.image.find(img => img.size === 'extralarge') || {})['#text'] || '';
                const trackUrl = track.url;

                const musicData = { title: trackName, subtitle: artistName, imgSrc: albumArt, link: trackUrl };
                updateMusicHTML(musicData);
                saveToCache('music', musicData);
            }
        })
        .catch(error => {
            console.error('Error fetching Last.fm data:', error);
            updateUIWithError('music');
        });
}