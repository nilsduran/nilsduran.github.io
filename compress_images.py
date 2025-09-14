import os
from PIL import Image


def compress_images(directory):
    for subdir, _, files in os.walk(directory):
        for file in files:
            if file.lower().endswith((".png", ".jpg", ".jpeg")):
                file_path = os.path.join(subdir, file)
                try:
                    with Image.open(file_path) as img:
                        original_size = os.path.getsize(file_path)

                        if file.lower().endswith(".png"):
                            # For PNGs, save with optimization
                            img.save(file_path, optimize=True)
                        else:  # JPG/JPEG
                            # For JPEGs, save with a quality setting
                            if img.mode == "RGBA":
                                img = img.convert("RGB")
                            img.save(file_path, quality=85, optimize=True)

                        compressed_size = os.path.getsize(file_path)
                        reduction = (original_size - compressed_size) / original_size * 100

                        if original_size > compressed_size:
                            print(f"Compressed {file_path}")
                            print(f"  Original size: {original_size / 1024:.2f} KB")
                            print(f"  New size: {compressed_size / 1024:.2f} KB")
                            print(f"  Reduction: {reduction:.2f}%")
                        else:
                            print(f"Skipped {file_path} (already optimized)")

                except Exception as e:
                    print(f"Error processing {file_path}: {e}")


if __name__ == "__main__":
    images_dir = "images"
    print(f"Starting compression in '{images_dir}' directory...")
    compress_images(images_dir)
    print("Image compression complete.")
