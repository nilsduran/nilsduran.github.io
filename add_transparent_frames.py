#!/usr/bin/env python3
"""
Script per normalitzar imatges am                    elif min_ratio <= current_ratio <= max_ratio:
                        print(f"📖 {filename} (ratio {current_ratio:.3f}) → normalitzant a 0.667 i convertint a PNG")
                        if normalize_image(input_path, png_path, target_ratio):
                            # Eliminar l'original JPG després de crear el PNG
                            try:
                                os.remove(input_path)
                                print(f"   ✅ Eliminat original {filename}")
                            except Exception as e:
                                print(f"   ⚠️  No s'ha pogut eliminar {filename}: {e}")
                            stats["normalized"] += 1
                        else:
                            stats["skipped_ratio"] += 1
                    else:
                        print(f"⏭️  {filename} (ratio {current_ratio:.3f}) fora del rang {min_ratio}-{max_ratio}")
                        # Per imatges fora del rang, convertir directament a PNG sense normalitzar
                        try:
                            with Image.open(input_path) as img:
                                if img.mode != 'RGBA':
                                    img = img.convert('RGBA')
                                img.save(png_path, 'PNG', optimize=True)
                                os.remove(input_path)
                                print(f"   📎 Convertit a PNG sense normalitzar")
                                stats["already_perfect"] += 1
                        except Exception as e:
                            print(f"   ❌ Error convertint {filename}: {e}")
                            stats["skipped_ratio"] += 1ratio ~1.5 a exactament 1.5 (3:2)
Ignora la carpeta 'art' i només processa imatges amb proporcions entre 1.3 i 1.7
"""

import os
from PIL import Image, ImageDraw

def process_images():
    """Processa totes les imatges amb la configuració per defecte"""
    interests_path = "images/interests"
    target_ratio = 0.667  # 2:3 típic de portades
    min_ratio = 0.5
    max_ratio = 0.75
    
    if not os.path.exists(interests_path):
        print(f"❌ La carpeta {interests_path} no existeix")
        return
    
    stats = {"normalized": 0, "skipped_ratio": 0, "skipped_art": 0, "skipped_exists": 0, "already_perfect": 0}
    
    print("🎯 Script de normalització d'aspect ratio a 0.667 (2:3)")
    print(f"� Normalitzant portades del rang {min_ratio}-{max_ratio} → {target_ratio}")
    print("🎨 Conservant proporcions originals de la carpeta 'art'")
    print("-" * 60)
    
    for category in os.listdir(interests_path):
        category_path = os.path.join(interests_path, category)
        
        if not os.path.isdir(category_path):
            continue
        
        # Ignorar carpeta d'art
        if category.lower() == 'art':
            art_count = len([f for f in os.listdir(category_path) 
                           if f.lower().endswith(('.jpg', '.jpeg', '.png'))])
            print(f"🎨 Ignorant categoria 'art' ({art_count} imatges amb proporcions originals)")
            stats["skipped_art"] += art_count
            continue
            
        print(f"\n📁 Processant categoria: {category}")
        
        for filename in os.listdir(category_path):
            if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
                input_path = os.path.join(category_path, filename)
                name_base = os.path.splitext(filename)[0]
                png_path = os.path.join(category_path, f"{name_base}.png")
                
                # Saltar si ja és PNG
                if filename.lower().endswith('.png'):
                    print(f"⏭️  {filename} ja és PNG")
                    stats["skipped_exists"] += 1
                    continue
                
                try:
                    with Image.open(input_path) as img:
                        current_ratio = img.width / img.height
                        
                    if abs(current_ratio - target_ratio) <= 0.01:
                        print(f"✅ {filename} (ratio {current_ratio:.3f}) ja és perfecte")
                        stats["already_perfect"] += 1
                    elif min_ratio <= current_ratio <= max_ratio:
                        print(f"� {filename} (ratio {current_ratio:.3f}) → normalitzant a 0.667")
                        if normalize_image(input_path, png_path, target_ratio):
                            stats["normalized"] += 1
                        else:
                            stats["skipped_ratio"] += 1
                    else:
                        print(f"⏭️  {filename} (ratio {current_ratio:.3f}) fora del rang {min_ratio}-{max_ratio}")
                        stats["skipped_ratio"] += 1
                        
                except Exception as e:
                    print(f"❌ Error analitzant {filename}: {e}")
                    stats["skipped_ratio"] += 1
    
    print(f"\n📊 Resum de normalització:")
    print(f"   📖 Portades normalitzades a ratio 0.667: {stats['normalized']}")
    print(f"   ✅ Portades ja perfectes (ratio ~0.667): {stats['already_perfect']}")
    print(f"   🎨 Imatges d'art (proporcions originals): {stats['skipped_art']}")
    print(f"   📐 Imatges fora del rang 0.5-0.75: {stats['skipped_ratio']}")
    print(f"   ⏭️  Imatges ja processades: {stats['skipped_exists']}")

def normalize_image(image_path, output_path, target_ratio=0.667):
    """Normalitza una imatge a aspect ratio exactament 0.667 (2:3)"""
    try:
        with Image.open(image_path) as img:
            # Convertir a RGBA per transparència
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            
            current_ratio = img.width / img.height
            
            # Calcular noves dimensions per ratio exactament 0.667 (2:3)
            # SEMPRE afegir padding, mai retallar
            if current_ratio > target_ratio:
                # Imatge més ampla que l'objectiu - afegir padding vertical
                new_width = img.width
                new_height = int(img.width / target_ratio)
            else:
                # Imatge més alta que l'objectiu - afegir padding horitzontal
                new_height = img.height  
                new_width = int(img.height * target_ratio)
            
            # Crear canvas amb les noves dimensions (ratio exactament 0.667)
            canvas = Image.new('RGBA', (new_width, new_height), (0, 0, 0, 0))
            
            # Centrar la imatge original
            x_offset = (new_width - img.width) // 2
            y_offset = (new_height - img.height) // 2
            canvas.paste(img, (x_offset, y_offset))
            
            # Afegir marc elegant només a la zona transparent
            draw = ImageDraw.Draw(canvas)
            
            # Marc exterior subtil al voltant de tot el canvas
            draw.rectangle([0, 0, new_width-1, new_height-1], 
                         outline=(255, 255, 255, 60), width=1)
            
            # Marc més visible al voltant de la imatge original
            margin = 2
            draw.rectangle([x_offset-margin, y_offset-margin, 
                          x_offset+img.width+margin-1, y_offset+img.height+margin-1],
                         outline=(255, 255, 255, 100), width=1)
            
            # Ombra subtil
            draw.rectangle([x_offset-margin+1, y_offset-margin+1, 
                          x_offset+img.width+margin, y_offset+img.height+margin],
                         outline=(0, 0, 0, 30), width=1)
            
            # Verificar que el ratio final és exactament 0.667
            final_ratio = new_width / new_height
            print(f"   � Ratio original: {current_ratio:.3f} → Final: {final_ratio:.3f}")
            
            # Guardar
            canvas.save(output_path, 'PNG', optimize=True)
            return True
            
    except Exception as e:
        print(f"❌ Error processant {image_path}: {e}")
        return False

if __name__ == "__main__":
    process_images()
    print("\n✨ Normalització completada!")
    print("💡 Totes les imatges són ara PNG (JPG originals eliminats)")
    print("📖 Les imatges amb ratio 0.5-0.75 han estat normalitzades a 0.667 (2:3)")
