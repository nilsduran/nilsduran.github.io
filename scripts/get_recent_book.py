import os
from storygraph_api.api import StorygraphApi
import json

# Agafa les credencials de les GitHub Secrets
username = os.environ.get("STORYGRAPH_USERNAME")
password = os.environ.get("STORYGRAPH_PASSWORD")

if not username or not password:
    raise ValueError("Les credencials de StoryGraph no estan configurades a les GitHub Secrets.")

api = StorygraphApi(username, password)

# Agafa els llibres llegits per l'usuari especificat
# NOTA: Has de posar el teu nom d'usuari exacte aquí
read_books = api.get_read_books("nilsnoether73")

if not read_books or not read_books.get("books"):
    print("No s'han trobat llibres llegits.")
    exit()

# El primer llibre de la llista és el més recent
recent_book = read_books["books"][0]

# Extreu la informació que necessitem
book_data = {
    "title": recent_book["title"],
    "subtitle": ", ".join(author["name"] for author in recent_book["authors"]),
    "imgSrc": recent_book["cover_url"],
    "link": f"https://app.thestorygraph.com/books/{recent_book['slug']}"
}

# Desa la informació en un fitxer JSON que el web pugui llegir
# Assegura't que la carpeta 'js' existeix
output_path = "js/recent_book.json"
os.makedirs(os.path.dirname(output_path), exist_ok=True)

with open(output_path, "w") as f:
    json.dump(book_data, f)

print(f"✅ Llibre més recent desat a {output_path}")
