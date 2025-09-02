document.addEventListener('DOMContentLoaded', function() {
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
    fetchBook();        // Manual - llegeix JSON local
    fetchTravel();      // Manual - llegeix JSON local
    fetchLetterboxd();  // Automàtic - API en temps real
    fetchLastFm();      // Automàtic - API en temps real
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
    if (bookCoverEl) bookCoverEl.src = '/images/interests/recent/book.jpg';
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
    fetch('/js/recent_book.json')
        .then(response => {
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
            console.error('Error fetching book data:', error);
            updateUIWithError('book');
        });
}

function fetchTravel() {
    fetch('/js/recent_travel.json')
        .then(response => {
            if (!response.ok) {
                return Promise.reject('El fitxer recent_travel.json no s\'ha trobat.');
            }
            return response.json();
        })
        .then(travelData => {
            if (travelData) {
                updateTravelHTML(travelData);
                saveToCache('travel', travelData);
            }
        })
        .catch(error => {
            console.error('Error fetching travel data:', error);
            updateUIWithError('travel');
        });
}

function fetchLetterboxd() {
    const letterboxdUrl = 'https://letterboxd.com/tique_011/rss/';
    const proxyUrl = 'https://api.allorigins.win/get?url=';

    console.log('🎬 Fetching Letterboxd data from:', letterboxdUrl);

    fetch(proxyUrl + encodeURIComponent(letterboxdUrl))
        .then(response => {
            console.log('🎬 Letterboxd response status:', response.status);
            return response.ok ? response.json() : Promise.reject('Error fetching Letterboxd via proxy');
        })
        .then(proxyData => {
            console.log('🎬 Letterboxd proxy response:', proxyData);
            
            let rssContent = proxyData.contents;
            
            // Comprovar si les dades estan en base64
            if (rssContent && rssContent.startsWith('data:application/rss+xml;charset=utf-8;base64,')) {
                console.log('🎬 Detected base64 encoded RSS, decoding...');
                const base64Data = rssContent.replace('data:application/rss+xml;charset=utf-8;base64,', '');
                
                // Descodificar base64 amb suport UTF-8 adequat
                try {
                    const binaryString = atob(base64Data);
                    const bytes = new Uint8Array(binaryString.length);
                    for (let i = 0; i < binaryString.length; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }
                    rssContent = new TextDecoder('utf-8').decode(bytes);
                } catch (error) {
                    console.warn('🎬 UTF-8 decode failed, using simple atob:', error);
                    rssContent = atob(base64Data);
                }
                
                console.log('🎬 Decoded RSS content (first 500 chars):', rssContent.substring(0, 500));
            } else if (!rssContent) {
                return Promise.reject('Proxy returned empty contents for Letterboxd');
            }
            
            const data = new window.DOMParser().parseFromString(rssContent, "text/xml");
            const items = data.querySelectorAll("item");
            console.log('🎬 Found', items.length, 'items in RSS');
            
            const item = data.querySelector("item");
            if (item) {
                const titleWithDetails = item.querySelector("title").textContent;
                const link = item.querySelector("link").textContent;
                const description = item.querySelector("description").textContent;
                
                console.log('🎬 Raw title:', titleWithDetails);
                console.log('🎬 Raw description:', description);
                
                const doc = new DOMParser().parseFromString(description, 'text/html');
                const imgElement = doc.querySelector('img');
                const imgSrc = imgElement ? imgElement.src.replace(/-\d+-0-\d+-crop/, '-500-0-750-crop') : '';
                
                // Extreure títol i estrelles
                const titleParts = titleWithDetails.split(' - ');
                let movieTitle = titleParts[0]; // Títol complet amb any entre parèntesis
                let stars = '';
                
                // Neteja caràcters malmesos al títol també
                movieTitle = movieTitle.replace(/&#039;/g, "'").replace(/&amp;/g, "&").replace(/&quot;/g, '"');
                
                // Convertir format "Title, Year" a "Title (Year)"
                const yearMatch = movieTitle.match(/^(.+), (\d{4})$/);
                if (yearMatch) {
                    movieTitle = `${yearMatch[1]} (${yearMatch[2]})`;
                }
                
                if (titleParts.length > 1) {
                    // Les estrelles estan després del guió
                    stars = titleParts[1];
                    // Neteja caràcters estranys i converteix a estrelles
                    stars = stars.replace(/[âââ]/g, '★').replace(/â/g, '★');
                    console.log('🎬 Extracted stars:', stars);
                }
                
                // El títol ja inclou l'any entre parèntesis
                // El subtítol són les estrelles
                const subtitle = stars || '';

                const movieData = { title: movieTitle, subtitle: subtitle, stars: '', imgSrc, link };
                console.log('🎬 Final movie data:', movieData);
                updateMovieHTML(movieData);
                saveToCache('movie', movieData);
            } else {
                console.log('🎬 No items found in Letterboxd RSS');
            }
        })
        .catch(error => {
            console.error('🎬 Error fetching Letterboxd data:', error);
            updateUIWithError('movie');
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