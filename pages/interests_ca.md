---
layout: page
title: Interessos
permalink: /interests_ca/
lang: ca
---

<div id="stats">

<h3 id="dashboard"><code>#dashboard</code></h3>

<h2>Acabats de llegir.</h2>

<p>Tens curiositat per saber què estic llegint? Aquí tens les meves lectures més recents.</p>

<div id="recent-finished-books">
    <a target="_blank" rel="noopener noreferrer" class="book-item" target="_blank" rel="noopener noreferrer" href="https://www.goodreads.com/book/show/40121378-atomic-habits">
    <div class="cover-container">
        <img class="grow-me" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1535115320l/40121378._SY475_.jpg">
    </div>
    <div class="book-info">
        <h4>Atomic Habits</h4>
        <p>James Clear</p>
    </div>
    </a>
    <a target="_blank" rel="noopener noreferrer" class="book-item" target="_blank" rel="noopener noreferrer" href="https://www.goodreads.com/book/show/23692271-sapiens">
    <div class="cover-container">
        <img class="grow-me" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1420585954l/23692271.jpg">
    </div>
    <div class="book-info">
        <h4>Sapiens: Una breu història de la humanitat</h4>
        <p>Yuval Noah Harari</p>
    </div>
    </a>
</div>

<h2>Cançons preferides.</h2>

<p>Tens curiositat per saber què estic escoltant? Aquí tens les meves cançons preferides a Spotify.</p>

<ol id="top-spotify-tracks">
    <li>
        <a target="_blank" rel="noopener noreferrer" href="https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh"><strong>Bohemian Rhapsody</strong></a>
        <p>Queen</p>
    </li>
    <li>
        <a target="_blank" rel="noopener noreferrer" href="https://open.spotify.com/track/02M6vucOvmRfMxTXDUwRXu"><strong>Stairway to Heaven</strong></a>
        <p>Led Zeppelin</p>
    </li>
</ol>

</div>

<style>
#stats {
  background-color: #f7f7f9;
  border-radius: 1rem;
  padding: 1.5em;
  margin-top: 2.5em;
}

#dashboard {
  margin: 0rem;
}

#dashboard code {
  background-color: #f7f7f9;
}

#recent-finished-books {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
}

#recent-finished-books a {
    color: #111;
}

.book-item {
    margin-left: 0.4em;
    margin-right: 0.4em;
}

.book-item div {
    width: 200px;
}

.book-info h4 {
    color: #222;
}

.book-info p {
    color: #555;
}

.grow-me {
  border-radius: 4px;
  transition: all .2s ease-in-out;
}

.grow-me:hover {
  transform: scale(1.02);
}

#top-spotify-tracks {
    padding-left: 1em;
}

#top-spotify-tracks li {
    color: #888;
    border-bottom: 1px solid #ededed;
    margin-top: 1rem;
}

#top-spotify-tracks a {
    color: #111;
}

#top-spotify-tracks a:hover {
    color: #1DB954; /* Spotify green */
}

#top-spotify-tracks p {
    color: #555;
}

@media screen and (max-width: 900px) {


  #recent-finished-books {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .book-item div {
    width: 400px;
  }

  .book-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .cover-container, .book-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 80%;
  }

  #top-spotify-tracks {
    padding-left: 1.2em;
  }
}
</style>
