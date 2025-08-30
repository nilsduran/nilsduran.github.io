#!/usr/bin/env python3
"""
Script per renombrar imatges d'interessos amb noms descriptius
"""

import os
import shutil
from pathlib import Path

# Ruta base de les imatges
base_path = Path("images/interests")

# Mapejat de noms actuals a noms descriptius
image_mappings = {
    # Movies
    "movies/movie1.jpg": "movies/the-sound-of-music.jpg",
    "movies/movie2.jpg": "movies/dune-part-two.jpg", 
    "movies/movie3.jpg": "movies/little-women.jpg",
    "movies/movie4.jpg": "movies/als-hitler-das-rosa-kaninchen-stahl.jpg",
    
    # Shows
    "shows/show1.jpg": "shows/arrested-development.jpg",
    "shows/show2.jpg": "shows/brooklyn-nine-nine.jpg",
    "shows/show3.jpg": "shows/plats-bruts.jpg",
    "shows/show4.jpg": "shows/community.jpg",
    
    # Fiction Books
    "fiction/fiction1.jpg": "fiction/el-mati-de-la-sega.jpg",
    "fiction/fiction2.jpg": "fiction/percy-jackson-la-malediccio-del-tita.jpg",
    "fiction/fiction3.jpg": "fiction/la-placa-del-diamant.jpg", 
    "fiction/fiction4.jpg": "fiction/the-hate-u-give.jpg",
    
    # Non-fiction Books
    "nonfiction/nonfiction1.jpg": "nonfiction/the-power-broker.jpg",
    "nonfiction/nonfiction2.jpg": "nonfiction/artificial-intelligence-modern-approach.jpg",
    "nonfiction/nonfiction3.jpg": "nonfiction/africa-is-not-a-country.jpg",
    "nonfiction/nonfiction4.jpg": "nonfiction/everything-is-tuberculosis.jpg",
    
    # Music (ja actualitzats)
    "music/band1.jpg": "music/la-ludwig-band.jpg",
    "music/band2.jpg": "music/snarky-puppy.jpg",
    "music/kendrick.jpg": "music/kendrick-lamar.jpg",
    "music/james-newton-howard.jpg": "music/james-newton-howard.jpg",  # ja està bé
    
    # Musicals
    "musicals/musical1.jpg": "musicals/hamilton.jpg",
    "musicals/musical2.jpg": "musicals/the-phantom-of-the-opera.jpg",
    "musicals/musical3.jpg": "musicals/west-side-story.jpg",
    "musicals/musical4.jpg": "musicals/matilda.jpg",
    
    # Animals
    "animals/animal1.jpg": "animals/orca.jpg",
    "animals/animal2.jpg": "animals/cat.jpg",
    "animals/animal3.jpg": "animals/dolphins.jpg",
    "animals/animal4.jpg": "animals/penguins.jpg",
    
    # Sports
    "sports/sport1.jpg": "sports/tennis.jpg", 
    "sports/sport2.jpg": "sports/fc-barcelona.jpg",
    "sports/sport3.jpg": "sports/climbing.jpg",
    "sports/sport4.jpg": "sports/chess.jpg",
    
    # Art
    "art/art1.jpg": "art/shipwreck-off-rocky-coast-nuijen.jpg",
    "art/art2.jpg": "art/california-spring-bierstadt.jpg",
    "art/art3.jpg": "art/sagrada-familia-gaudi.jpg",
    "art/art4.jpg": "art/avenue-plane-trees-rusinol.jpg",
}

# Referències al fitxer markdown que cal actualitzar
md_file_updates = {
    # Movies
    'src="/images/interests/movies/movie1.jpg"': 'src="/images/interests/movies/the-sound-of-music.jpg"',
    'src="/images/interests/movies/movie2.jpg"': 'src="/images/interests/movies/dune-part-two.jpg"',
    'src="/images/interests/movies/movie3.jpg"': 'src="/images/interests/movies/little-women.jpg"',
    'src="/images/interests/movies/movie4.jpg"': 'src="/images/interests/movies/als-hitler-das-rosa-kaninchen-stahl.jpg"',
    
    # Shows
    'src="/images/interests/shows/show1.jpg"': 'src="/images/interests/shows/arrested-development.jpg"',
    'src="/images/interests/shows/show2.jpg"': 'src="/images/interests/shows/brooklyn-nine-nine.jpg"',
    'src="/images/interests/shows/show3.jpg"': 'src="/images/interests/shows/plats-bruts.jpg"',
    'src="/images/interests/shows/show4.jpg"': 'src="/images/interests/shows/community.jpg"',
    
    # Fiction
    'src="/images/interests/fiction/fiction1.jpg"': 'src="/images/interests/fiction/el-mati-de-la-sega.jpg"',
    'src="/images/interests/fiction/fiction2.jpg"': 'src="/images/interests/fiction/percy-jackson-la-malediccio-del-tita.jpg"',
    'src="/images/interests/fiction/fiction3.jpg"': 'src="/images/interests/fiction/la-placa-del-diamant.jpg"',
    'src="/images/interests/fiction/fiction4.jpg"': 'src="/images/interests/fiction/the-hate-u-give.jpg"',
    
    # Non-fiction
    'src="/images/interests/nonfiction/nonfiction1.jpg"': 'src="/images/interests/nonfiction/the-power-broker.jpg"',
    'src="/images/interests/nonfiction/nonfiction2.jpg"': 'src="/images/interests/nonfiction/artificial-intelligence-modern-approach.jpg"',
    'src="/images/interests/nonfiction/nonfiction3.jpg"': 'src="/images/interests/nonfiction/africa-is-not-a-country.jpg"',
    'src="/images/interests/nonfiction/nonfiction4.jpg"': 'src="/images/interests/nonfiction/everything-is-tuberculosis.jpg"',
    
    # Music
    'src="/images/interests/music/band1.jpg"': 'src="/images/interests/music/la-ludwig-band.jpg"',
    'src="/images/interests/music/band2.jpg"': 'src="/images/interests/music/snarky-puppy.jpg"',
    'src="/images/interests/music/kendrick.jpg"': 'src="/images/interests/music/kendrick-lamar.jpg"',
    
    # Musicals
    'src="/images/interests/musicals/musical1.jpg"': 'src="/images/interests/musicals/hamilton.jpg"',
    'src="/images/interests/musicals/musical2.jpg"': 'src="/images/interests/musicals/the-phantom-of-the-opera.jpg"',
    'src="/images/interests/musicals/musical3.jpg"': 'src="/images/interests/musicals/west-side-story.jpg"',
    'src="/images/interests/musicals/musical4.jpg"': 'src="/images/interests/musicals/matilda.jpg"',
    
    # Animals
    'src="/images/interests/animals/animal1.jpg"': 'src="/images/interests/animals/orca.jpg"',
    'src="/images/interests/animals/animal2.jpg"': 'src="/images/interests/animals/cat.jpg"',
    'src="/images/interests/animals/animal3.jpg"': 'src="/images/interests/animals/dolphins.jpg"',
    'src="/images/interests/animals/animal4.jpg"': 'src="/images/interests/animals/penguins.jpg"',
    
    # Sports
    'src="/images/interests/sports/sport1.jpg"': 'src="/images/interests/sports/tennis.jpg"',
    'src="/images/interests/sports/sport2.jpg"': 'src="/images/interests/sports/fc-barcelona.jpg"',
    'src="/images/interests/sports/sport3.jpg"': 'src="/images/interests/sports/climbing.jpg"',
    'src="/images/interests/sports/sport4.jpg"': 'src="/images/interests/sports/chess.jpg"',
    
    # Art
    'src="/images/interests/art/art1.jpg"': 'src="/images/interests/art/shipwreck-off-rocky-coast-nuijen.jpg"',
    'src="/images/interests/art/art2.jpg"': 'src="/images/interests/art/california-spring-bierstadt.jpg"',
    'src="/images/interests/art/art3.jpg"': 'src="/images/interests/art/sagrada-familia-gaudi.jpg"',
    'src="/images/interests/art/art4.jpg"': 'src="/images/interests/art/avenue-plane-trees-rusinol.jpg"',
}

def rename_image_files():
    """Renombra els fitxers d'imatges"""
    print("🖼️  Renombrant fitxers d'imatges...")
    
    for old_path, new_path in image_mappings.items():
        old_file = base_path / old_path
        new_file = base_path / new_path
        
        if old_file.exists():
            print(f"  ✅ {old_path} → {new_path}")
            shutil.move(str(old_file), str(new_file))
        else:
            print(f"  ⚠️  No trobat: {old_path}")

def update_markdown_references():
    """Actualitza les referències al fitxer markdown"""
    print("\n📝 Actualitzant referències al fitxer interests.md...")
    
    md_file = Path("pages/interests.md")
    
    with open(md_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Aplicar totes les substitucions
    for old_ref, new_ref in md_file_updates.items():
        if old_ref in content:
            content = content.replace(old_ref, new_ref)
            print(f"  ✅ Actualitzat: {old_ref} → {new_ref}")
        else:
            print(f"  ⚠️  No trobat: {old_ref}")
    
    # Guardar el fitxer actualitzat
    with open(md_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"\n✅ Fitxer {md_file} actualitzat!")

if __name__ == "__main__":
    print("🚀 Iniciant migració a noms descriptius...")
    rename_image_files()
    update_markdown_references()
    print("\n🎉 Migració completada!")
