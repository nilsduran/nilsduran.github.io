import requests
from bs4 import BeautifulSoup
import json
import os
import sys

# Constants
PROFILE_URL = "https://app.thestorygraph.com/profile/nilsnoether73"
OUTPUT_FILE = "js/recent_book.json"

def create_scraper():
    try:
        import cloudscraper
        scraper = cloudscraper.create_scraper()
        
        cookie = os.environ.get("STORYGRAPH_COOKIE")
        
        # Fallback to local file for easier development
        if not cookie:
            cookie_file = os.path.join(os.path.dirname(__file__), "..", "storygraph_cookie.txt")
            if os.path.exists(cookie_file):
                with open(cookie_file, "r") as f:
                    cookie = f.read().strip()
                    print("Loaded cookie from storygraph_cookie.txt")

        if not cookie:
            print("WARNING: STORYGRAPH_COOKIE environment variable or storygraph_cookie.txt not found.")
        else:
            # Add cookie to headers
            scraper.headers.update({"Cookie": cookie})
        return scraper
    except ImportError:
        print("cloudscraper not installed")
        sys.exit(1)

def fetch_profile(scraper):
    try:
        print(f"Fetching profile from {PROFILE_URL}...")
        response = scraper.get(PROFILE_URL)
        print(f"Profile: {response.status_code} - {response.url}")
        
        if "sign_in" in response.url:
            print("Error: Redirected to sign_in. Cookie might be invalid or expired.")
            sys.exit(1)

        response.raise_for_status()
        return response.text
    except Exception as e:
        print(f"Error fetching profile: {e}")
        sys.exit(1)

def fetch_book_rating(scraper, book_url):
    try:
        print(f"Fetching book details from {book_url}...")
        response = scraper.get(book_url)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, "html.parser")
        
        # Look for the rating
        # Structure often: <span class="average-star-rating">4.5</span> (This is avg rating)
        # User rating is usually in "My Rating" section or similar.
        # Let's look for the user's specific rating.
        # It might be in a div with class "star-rating" inside a "your-review" block?
        # Or simply look for the filled stars count if text isn't available.
        
        # Strategy: Look for "My Rating" text and find nearby stars
        # Or look for the specific star rating component.
        
        # Let's try to find the "star-rating" div that represents the user's rating.
        # Often represented as: <div class="star-rating" data-rating="5.0">...</div>
        
        # A common pattern for user rating on Storygraph book page:
        # <span class="star-rating" ...> ... </span>
        
        # Let's try to find the rating in the "review-header" or similar.
        
        # Simpler approach: Look for the text "My Rating" and see what follows.
        # Actually, if we are logged in, the "mark as read" section usually shows the rating.
        
        # Let's try to find a star rating container that is NOT the average rating.
        # The average rating usually has class "average-star-rating".
        
        # Let's look for the user's review section.
        # <div class="review-header"> ... <span class="star-rating"> ... </span> ... </div>
        
        # Fallback: If we can't find it easily, we might return 0, but let's try.
        
        # Attempt 1: Look for a star rating that is likely the user's.
        # The user's rating is often editable or displayed prominently.
        
        # Let's inspect the HTML structure from a typical page (hypothetically)
        # <div class="user-rating">
        #   <span class="star-rating">
        #      <i class="fas fa-star"></i> ...
        #   </span>
        # </div>
        
        # Let's try to find the "star-rating" class and filter out the average one if possible.
        # Or look for "star-rating" inside a container that implies it's the user's.
        
        # Actually, let's try to find the element that contains the user's rating value directly if possible.
        # Often <input value="5"> for the rating form?
        
        # Let's try a generic search for "star-rating" class and see if we can deduce.
        star_ratings = soup.find_all(class_="star-rating")
        for rating in star_ratings:
            # Check if it has a value attribute or similar
            # Or count the stars
            pass
            
        # Better: Look for the "read-status-pane" or similar where the user's interaction is recorded.
        
        # Let's try to find the "My Rating" label.
        my_rating_label = soup.find(string=lambda t: t and "My Rating" in t)
        if my_rating_label:
            # The stars are usually nearby.
            parent = my_rating_label.find_parent("div")
            if parent:
                # Count full stars?
                # Or look for text?
                pass
        
        # If we can't find it, maybe we can just look for the last "star-rating" on the page?
        # No, that's risky.
        
        # Let's assume the user has rated it.
        # Look for <div class="star-rating"> inside <div class="review-header">
        review_header = soup.find("div", class_="review-header")
        if review_header:
            rating_span = review_header.find("span", class_="star-rating")
            if rating_span:
                # Count the filled stars?
                # Usually <i class="fas fa-star"></i>
                # or <i class="mr-1 ... text-dark-grey"> for filled?
                # Storygraph uses "text-teal-600" or similar for filled stars often.
                # Let's count children?
                pass
        
    except Exception as e:
        print(f"Error fetching book rating: {e}")
        return 0
        
    # Debug: Save book HTML
    # with open("debug_book_page.html", "w", encoding="utf-8") as f:
    #     f.write(response.text)

    print("DEBUG: Searching for rating...")
    
    # Strategy: Look for the user's review section
    # <div class="book-page-review-section"> ... <span class="... font-medium">5.0</span> ... </div>
    review_section = soup.find("div", class_="book-page-review-section")
    if review_section:
        print("DEBUG: Found review section")
        # Find the rating value. It's usually in a span with 'font-medium' class or similar.
        # Let's try to find the text that looks like a number.
        rating_span = review_section.find("span", class_="font-medium")
        if rating_span:
            try:
                rating_text = rating_span.get_text(strip=True)
                print(f"DEBUG: Found rating text: {rating_text}")
                return float(rating_text)
            except ValueError:
                print(f"DEBUG: Could not parse rating text '{rating_text}' as float")
        else:
            print("DEBUG: Could not find rating span in review section")
            
    # Fallback: Check for hidden input (previous method, just in case)
    rating_input = soup.find("input", {"name": "review[rating]"})
    if rating_input:
        print(f"DEBUG: Found hidden input with value: {rating_input.get('value')}")
        return float(rating_input["value"])

    print("Could not find explicit rating input. Returning 0.")
    return 0

def parse_book_data(html):
    soup = BeautifulSoup(html, "html.parser")
    
    # Debug: Save HTML to file for inspection if needed
    # with open("last_fetched_profile.html", "w", encoding="utf-8") as f:
    #     f.write(html)
    
    book_item = None
    section_name = ""

    # Helper to find book in a section
    def find_book_in_section(header_text):
        # Find the header link
        header_link = soup.find("a", string=lambda t: t and header_text in t)
        if not header_link:
            return None
        
        # The structure is:
        # <div class="col-span-2 ...">
        #   <div class="flex justify-between ..."> <a ...>Header</a> ... </div>
        #   <div class="..."> ... <ul class="homepage-horizontal-scroll ..."> ... </ul> </div>
        # </div>
        
        # Go up to the main container for this section
        section_container = header_link.find_parent("div", class_="col-span-2")
        if not section_container:
            return None
            
        # Find the carousel list
        carousel = section_container.find("ul", class_="homepage-horizontal-scroll")
        if not carousel:
            return None
            
        # Get the first item
        return carousel.find("li", class_="item-new")

    # 1. Try "Recently Read" (User prefers finished books)
    book_item = find_book_in_section("Recently Read")
    section_name = "Recently Read"

    # 2. Fallback to "Currently Reading" if no finished books found (unlikely but good safety)
    if not book_item:
        book_item = find_book_in_section("Currently Reading")
        section_name = "Currently Reading"
        
    if not book_item:
        # Fallback for "Read recently" or other variations
        book_item = find_book_in_section("Read recently")
        section_name = "Read recently"

    if not book_item:
        print("Could not find any book in 'Currently Reading' or 'Recently Read' sections.")
        # Save HTML for debugging
        with open("debug_storygraph_profile.html", "w", encoding="utf-8") as f:
            f.write(html)
        print("Saved HTML to debug_storygraph_profile.html for inspection.")
        return None

    try:
        link_tag = book_item.find("a")
        img_tag = book_item.find("img")
        
        if not link_tag or not img_tag:
            print("Found book item but missing link or image.")
            return None

        link = "https://app.thestorygraph.com" + link_tag["href"]
        img_src = img_tag["src"]
        alt_text = img_tag.get("alt", "")
        
        # Parse Title and Author from Alt text: "Title by Author"
        # Be careful if title contains " by "
        if " by " in alt_text:
            parts = alt_text.rsplit(" by ", 1)
            title = parts[0]
            author = parts[1]
        else:
            title = alt_text
            author = "Unknown Author"

        # Stars are not visible in the profile carousel. 
        # We can default to 0 or keep the previous value if we were merging.
        # For now, 0 or empty.
        stars = 0
        
        print(f"Found book in '{section_name}': {title} by {author}")
        
        return {
            "title": title,
            "subtitle": author,
            "stars": stars,
            "imgSrc": img_src,
            "link": link
        }

    except Exception as e:
        print(f"Error parsing book data: {e}")
        return None

def update_json(data):
    if not data:
        print("No data to update.")
        return

    # Ensure directory exists
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    print(f"Updated {OUTPUT_FILE} with: {data}")

def main():
    scraper = create_scraper()
    html = fetch_profile(scraper)
    
    print("Parsing HTML...")
    book_data = parse_book_data(html)
    
    if book_data:
        # Fetch rating
        rating = fetch_book_rating(scraper, book_data['link'])
        if rating > 0:
            book_data['stars'] = rating
            print(f"Updated rating to {rating}")
        
        update_json(book_data)
    else:
        print("Failed to extract book data.")
        sys.exit(1)

if __name__ == "__main__":
    main()
