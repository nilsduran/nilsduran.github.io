## Maintenance & Updates

To perform routine maintenance (update recent book, compress new images, update cookies), run the master script:

```bash
python update.py
```

This script will:
1.  **Compress Images**: Optimize any new images in `images/`.
2.  **Update Recent Book**: Fetch the latest "Recently Read" book from Storygraph.
3.  **Manage Cookies**: Prompt you to update the Storygraph cookie if needed.

## Local Development

To preview the site locally and see changes in real-time, use the following command:

```bash
bundle exec jekyll serve --livereload
```

## Storygraph Automation

The "Recent Books" section is automatically updated by a GitHub Action that runs every 6 hours.

### Troubleshooting
If the book on the website is not updating:
1.  The **Storygraph Cookie** might have expired.
2.  Run `python update.py` locally.
3.  It will verify the cookie and guide you to update it if necessary.
4.  The script will also attempt to update the GitHub Secret (`STORYGRAPH_COOKIE`) for you.

### Manual Override
If automation fails completely, you can manually edit `js/recent_book.json`:

```json
{
    "title": "Book Title",
    "subtitle": "Author Name",
    "stars": 4.5,
    "imgSrc": "https://cdn.thestorygraph.com/...",
    "link": "https://app.thestorygraph.com/books/..."
}
```