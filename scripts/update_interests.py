import requests
from bs4 import BeautifulSoup
import json
import os
import sys
import cloudscraper
import re
import math

# Constants
STORYGRAPH_PROFILE_URL = "https://app.thestorygraph.com/profile/nilsnoether73"
LETTERBOXD_RSS_URL = "https://letterboxd.com/tique_011/rss/"
LASTFM_USER = "nilsdula"
LASTFM_API_URL = "https://ws.audioscrobbler.com/2.0/"
INTERESTS_FILE = "interests.md"

def create_scraper():
    return cloudscraper.create_scraper()

def convert_rating_to_stars(rating):
    if isinstance(rating, str):
        return rating
    if not isinstance(rating, (int, float)):
        return ""
    
    full_stars = math.floor(rating)
    has_half_star = (rating % 1) != 0
    
    stars = "★" * full_stars
    if has_half_star:
        stars += "½"
    return stars

def update_markdown(data_map):
    print(f"\n📝 Updating {INTERESTS_FILE}...")
    
    if not os.path.exists(INTERESTS_FILE):
        print(f"   ❌ {INTERESTS_FILE} not found.")
        return

    with open(INTERESTS_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    # Split frontmatter
    frontmatter = ""
    body = content
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            frontmatter = parts[1]
            body = parts[2]

    soup = BeautifulSoup(body, "html.parser")

    for key, data in data_map.items():
        if not data:
            continue
            
        print(f"   Updating {key}...")
        element = soup.find(id=key)
        if not element:
            print(f"   ⚠️ Element with id '{key}' not found.")
            continue

        # Create new content
        if key == "recent-book":
            stars = convert_rating_to_stars(data.get("stars", 0))
            new_inner_html = f"""
        <a href="{data['link']}" class="interest-link" target="_blank" rel="noopener">
          <img src="{data['imgSrc']}" alt="{data['title']}" class="recent-book-cover" onerror="this.src='/images/interests/recent/book.jpg'">
          <div class="interest-overlay">
            <div class="interest-title recent-book-title">{data['title']}</div>
            <div class="interest-subtitle recent-book-author">{data['subtitle']}</div>
            <div class="interest-stars recent-book-stars">{stars}</div>
          </div>
        </a>"""
        elif key == "recent-movie":
            new_inner_html = f"""
        <a href="{data['link']}" class="interest-link" target="_blank" rel="noopener">
          <img src="{data['imgSrc']}" alt="{data['title']}" class="recent-movie-poster" onerror="this.src='/images/interests/recent/movie.jpg'">
          <div class="interest-overlay">
            <div class="interest-title recent-movie-title">{data['title']}</div>
            <div class="interest-subtitle recent-movie-director">{data['subtitle']}</div>
          </div>
        </a>"""
        elif key == "recent-music":
            new_inner_html = f"""
        <a href="{data['link']}" class="interest-link recent-music-link" target="_blank" rel="noopener">
          <img src="{data['imgSrc']}" alt="{data['title']}" class="recent-music-cover" onerror="this.src='/images/interests/recent/music.jpg'">
          <div class="interest-overlay">
            <div class="interest-title recent-music-title">{data['title']}</div>
            <div class="interest-subtitle recent-music-artist">{data['subtitle']}</div>
          </div>
        </a>"""
        elif key == "recent-travel":
            stars = convert_rating_to_stars(data.get("stars", 0))
            new_inner_html = f"""
        <a href="{data['link']}" class="interest-link" target="_blank" rel="noopener">
          <img src="{data['imgSrc']}" alt="{data['title']}" class="recent-travel-image" onerror="this.src='/images/interests/recent/travel.jpg'">
          <div class="interest-overlay">
            <div class="interest-title recent-travel-title">{data['title']}</div>
            <div class="interest-subtitle recent-travel-subtitle">{data['subtitle']}</div>
            <div class="interest-stars recent-travel-stars">{stars}</div>
          </div>
        </a>"""
        else:
            continue

        # Parse new inner HTML
        new_tag = BeautifulSoup(new_inner_html.strip(), "html.parser")
        
        # Clear existing content and append new
        element.clear()
        # Append children of new_tag to element
        for child in new_tag.contents:
             element.append(child)

    # Write back
    with open(INTERESTS_FILE, "w", encoding="utf-8") as f:
        if frontmatter:
            f.write(f"---{frontmatter}---")
        f.write(str(soup))
    print("✅ Markdown updated.")

# --- STORYGRAPH (BOOKS) ---
def fetch_book(scraper):
    print("\n📚 Fetching Storygraph...")
    try:
        # Cookie handling
        cookie = os.environ.get("STORYGRAPH_COOKIE")
        if not cookie:
            cookie_file = os.path.join(os.path.dirname(__file__), "..", "storygraph_cookie.txt")
            if os.path.exists(cookie_file):
                with open(cookie_file, "r") as f:
                    cookie = f.read().strip()
                print("   Loaded cookie from file.")
        
        if cookie:
            scraper.headers.update({"Cookie": cookie})
        else:
            print("   ⚠️ No Storygraph cookie found. Results might be limited.")

        response = scraper.get(STORYGRAPH_PROFILE_URL)
        if "sign_in" in response.url:
             print("   ⚠️ Redirected to sign_in. Cookie might be invalid.")
        
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
        
        # Helper to find book in section
        def find_book(section_name):
            header = soup.find("a", string=lambda t: t and section_name in t)
            if not header: return None
            container = header.find_parent("div", class_="col-span-2")
            if not container: return None
            carousel = container.find("ul", class_="homepage-horizontal-scroll")
            return carousel.find("li", class_="item-new") if carousel else None

        # Try sections in order
        book_item = find_book("Recently Read") or find_book("Currently Reading") or find_book("Read recently")
        
        if not book_item:
            print("   ❌ No book found in profile.")
            return None

        link_tag = book_item.find("a")
        img_tag = book_item.find("img")
        
        if not link_tag or not img_tag: return None

        link = "https://app.thestorygraph.com" + link_tag["href"]
        img_src = img_tag["src"]
        alt_text = img_tag.get("alt", "")
        
        title = alt_text
        author = "Unknown Author"
        if " by " in alt_text:
            parts = alt_text.rsplit(" by ", 1)
            title = parts[0]
            author = parts[1]

        # Fetch rating
        stars = 0
        try:
            book_page = scraper.get(link)
            if book_page.status_code == 200:
                book_soup = BeautifulSoup(book_page.text, "html.parser")
                review_section = book_soup.find("div", class_="book-page-review-section")
                if review_section:
                    rating_span = review_section.find("span", class_="font-medium")
                    if rating_span:
                        stars = float(rating_span.get_text(strip=True))
        except Exception as e:
            print(f"   ⚠️ Error fetching rating: {e}")

        return {
            "title": title,
            "subtitle": author,
            "stars": stars,
            "imgSrc": img_src,
            "link": link
        }

    except Exception as e:
        print(f"   ❌ Error fetching book: {e}")
        return None

# --- LETTERBOXD (MOVIES) ---
def fetch_movie(scraper):
    print("\n🎬 Fetching Letterboxd...")
    try:
        response = scraper.get(LETTERBOXD_RSS_URL)
        response.raise_for_status()
        
        # Parse XML with BeautifulSoup
        soup = BeautifulSoup(response.content, "xml")
        item = soup.find("item")
        
        if not item:
            print("   ❌ No items found in RSS.")
            return None

        title_tag = item.find("title")
        link_tag = item.find("link")
        desc_tag = item.find("description")
        
        full_title = title_tag.text if title_tag else "Unknown"
        link = link_tag.text if link_tag else ""
        description = desc_tag.text if desc_tag else ""
        
        # Parse description HTML for image
        desc_soup = BeautifulSoup(description, "html.parser")
        img = desc_soup.find("img")
        img_src = img["src"] if img else ""
        
        if "-crop" in img_src:
             img_src = re.sub(r'-\d+-0-\d+-crop', '-500-0-750-crop', img_src)

        title = full_title
        stars_str = ""
        
        if " - " in full_title:
            parts = full_title.rsplit(" - ", 1)
            title_part = parts[0]
            stars_part = parts[1]
            
            if '★' in stars_part or '½' in stars_part:
                title = title_part
                stars_str = stars_part
        
        return {
            "title": title,
            "subtitle": stars_str,
            "stars": stars_str,
            "imgSrc": img_src,
            "link": link
        }

    except Exception as e:
        print(f"   ❌ Error fetching movie: {e}")
        return None

# --- LAST.FM (MUSIC) ---
def fetch_music(scraper):
    print("\n🎵 Fetching Last.fm...")
    api_key = os.environ.get("LASTFM_API_KEY")
    if not api_key:
        print("   ⚠️ LASTFM_API_KEY not found in environment.")
        return None

    try:
        params = {
            "method": "user.getrecenttracks",
            "user": LASTFM_USER,
            "api_key": api_key,
            "format": "json",
            "limit": 1
        }
        
        response = scraper.get(LASTFM_API_URL, params=params)
        response.raise_for_status()
        data = response.json()
        
        track = data.get("recenttracks", {}).get("track", [])[0]
        if not track:
            print("   ❌ No tracks found.")
            return None
            
        title = track.get("name", "Unknown")
        artist = track.get("artist", {}).get("#text", "Unknown")
        url = track.get("url", "")
        
        # Get largest image
        images = track.get("image", [])
        img_src = ""
        for img in reversed(images):
            if img.get("#text"):
                img_src = img["#text"]
                break
                
        return {
            "title": title,
            "subtitle": artist,
            "imgSrc": img_src,
            "link": url
        }

    except Exception as e:
        print(f"   ❌ Error fetching music: {e}")
        return None

# --- TRAVEL ---
def fetch_travel():
    print("\n🌍 Fetching Travel...")
    try:
        json_path = os.path.join(os.path.dirname(__file__), "..", "js", "recent_travel.json")
        if not os.path.exists(json_path):
             print(f"   ❌ {json_path} not found.")
             return None
        
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            return data
    except Exception as e:
        print(f"   ❌ Error reading travel json: {e}")
        return None

def main():
    scraper = create_scraper()
    
    data_map = {
        "recent-book": fetch_book(scraper),
        "recent-movie": fetch_movie(scraper),
        "recent-music": fetch_music(scraper),
        "recent-travel": fetch_travel()
    }
    
    update_markdown(data_map)

if __name__ == "__main__":
    main()
