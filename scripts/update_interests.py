import requests
from bs4 import BeautifulSoup
import json
import os
import sys
import cloudscraper

# Constants
STORYGRAPH_PROFILE_URL = "https://app.thestorygraph.com/profile/nilsnoether73"
LETTERBOXD_RSS_URL = "https://letterboxd.com/tique_011/rss/"
LASTFM_USER = "nilsdula"
LASTFM_API_URL = "https://ws.audioscrobbler.com/2.0/"

# Output Files
BOOK_FILE = "js/recent_book.json"
MOVIE_FILE = "js/recent_movie.json"
MUSIC_FILE = "js/recent_music.json"

def create_scraper():
    return cloudscraper.create_scraper()

def save_json(filepath, data):
    if not data:
        print(f"⚠️ No data to save for {filepath}")
        return
    
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    print(f"✅ Saved {filepath}")

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
        
        # Resize image to be higher quality (Letterboxd RSS images are small)
        # Convert ...-0-150-0-225-crop... to ...-0-500-0-750-crop...
        # Or just generic replacement if pattern matches
        if "-crop" in img_src:
             # Heuristic replacement based on observed URL patterns
             # Often: https://a.ltrbxd.com/resized/.../poster-123-0-150-0-225-crop.jpg
             # We want larger. Let's try to replace the dimensions.
             # Actually, the JS used: replace(/-\d+-0-\d+-crop/, '-500-0-750-crop')
             import re
             img_src = re.sub(r'-\d+-0-\d+-crop', '-500-0-750-crop', img_src)

        # Parse Title and Rating from "Title (Year) - Rating"
        # Example: "Dune: Part Two (2024) - ★★★★★"
        # or "Movie (Year)" if no rating
        
        title = full_title
        stars_str = ""
        
        if " - " in full_title:
            parts = full_title.rsplit(" - ", 1)
            title_part = parts[0]
            stars_part = parts[1]
            
            # Check if second part is actually stars (contains ★ or ½)
            if '★' in stars_part or '½' in stars_part:
                title = title_part
                stars_str = stars_part
        
        # Clean title HTML entities just in case (BS4 handles most, but good to be safe)
        
        return {
            "title": title,
            "subtitle": stars_str, # Using stars as subtitle for movies as per design
            "stars": stars_str,    # Also keeping raw stars if needed
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
        for img in reversed(images): # Start from largest (usually at end)
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

def main():
    scraper = create_scraper()
    
    # 1. Books
    book_data = fetch_book(scraper)
    save_json(BOOK_FILE, book_data)
    
    # 2. Movies
    movie_data = fetch_movie(scraper)
    save_json(MOVIE_FILE, movie_data)
    
    # 3. Music
    music_data = fetch_music(scraper)
    save_json(MUSIC_FILE, music_data)

if __name__ == "__main__":
    main()
