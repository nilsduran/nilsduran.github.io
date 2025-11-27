import os
from PIL import Image
import io


def compress_images(directory):
    for subdir, _, files in os.walk(directory):
        for file in files:
            if file.lower().endswith((".png", ".jpg", ".jpeg")):
                file_path = os.path.join(subdir, file)
                try:
                    with Image.open(file_path) as img:
                        original_size = os.path.getsize(file_path)
                        output_buffer = io.BytesIO()

                        if file.lower().endswith(".png"):
                            img.save(output_buffer, format="PNG", optimize=True)
                        else:  # JPG/JPEG
                            if img.mode not in ("RGB", "L"):
                                img = img.convert("RGB")
                            img.save(output_buffer, format="JPEG", quality=85, optimize=True)

                        compressed_size = output_buffer.tell()
                        
                        if original_size > 0: # Avoid division by zero
                            reduction = (original_size - compressed_size) / original_size * 100
                        else:
                            reduction = 0 # No reduction possible if original size is 0

                        if reduction >= 5.0: # Only update if reduction is at least 2%
                            output_buffer.seek(0)
                            with open(file_path, 'wb') as f:
                                f.write(output_buffer.read())

                            print(f"Compressed {file_path}")
                            print(f"  Original size: {original_size / 1024:.2f} KB")
                            print(f"  New size: {compressed_size / 1024:.2f} KB")
                            print(f"  Reduction: {reduction:.2f}%")
                        else:
                            print(f"Skipped {file_path} (reduction {reduction:.2f}% was less than 2%)")

                except Exception as e:
                    print(f"Error processing {file_path}: {e}")
