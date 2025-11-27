import os
import subprocess
import sys
import shutil

def run_command(command, description):
    print(f"\n--- {description} ---")
    try:
        subprocess.run(command, check=True, shell=True)
        print("✅ Done.")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error running {description}: {e}")
    except FileNotFoundError:
        print(f"❌ Command not found: {command}")

def update_images():
    if os.path.exists("scripts/compress_images.py"):
        run_command("python scripts/compress_images.py", "Compressing Images")
    else:
        print("⚠️ scripts/compress_images.py not found. Skipping image compression.")

def update_storygraph_cookie():
    print("\n--- Storygraph Cookie Update ---")
    choice = input("Do you want to update the Storygraph cookie? (y/n): ").strip().lower()
    
    if choice != 'y':
        print("Skipping cookie update.")
        return

    print("\nTo get your cookie:")
    print("1. Log in to https://app.thestorygraph.com")
    print("2. Open DevTools (F12) -> Network tab -> Refresh")
    print("3. Click the first request -> Headers -> Request Headers")
    print("4. Copy the entire value of 'cookie'.")
    print("\nExample format:")
    print("remember_user_token=eyJfcmFpbHMiOnsib...; _storygraph_session=...")
    
    cookie = input("\nPaste your new cookie here: ").strip()
    
    if not cookie:
        print("❌ Cookie cannot be empty.")
        return

    # 1. Update local file
    try:
        with open("storygraph_cookie.txt", "w") as f:
            f.write(cookie)
        print("✅ Updated local 'storygraph_cookie.txt'")
    except Exception as e:
        print(f"❌ Error writing local file: {e}")

    # 2. Update GitHub Secret
    print("\nAttempting to update GitHub Secret via 'gh' CLI...")
    if shutil.which("gh"):
        try:
            # gh secret set STORYGRAPH_COOKIE --body "cookie_value"
            # We use stdin to avoid leaking secret in process list if possible, 
            # but gh secret set accepts body via stdin? Yes: gh secret set NAME < file or pipe
            
            process = subprocess.Popen(
                ["gh", "secret", "set", "STORYGRAPH_COOKIE"], 
                stdin=subprocess.PIPE, 
                stdout=subprocess.PIPE, 
                stderr=subprocess.PIPE,
                text=True,
                shell=True # Shell=True required for finding gh in path on windows sometimes? Better safe.
            )
            stdout, stderr = process.communicate(input=cookie)
            
            if process.returncode == 0:
                print("✅ Successfully updated GitHub Secret 'STORYGRAPH_COOKIE'")
            else:
                print(f"⚠️ Failed to update GitHub Secret via CLI.\nError: {stderr.strip()}")
                print_manual_instructions()
        except Exception as e:
            print(f"❌ Error running gh CLI: {e}")
            print_manual_instructions()
    else:
        print("⚠️ GitHub CLI ('gh') not found.")
        print_manual_instructions()

    # 3. Verify
    verify = input("\nDo you want to verify the new cookie locally? (y/n): ").strip().lower()
    if verify == 'y':
        run_command("python scripts/update_interests.py", "Verifying Cookie")

def print_manual_instructions():
    print("\n👉 MANUAL ACTION REQUIRED:")
    print("Go to your repository settings on GitHub:")
    print("Settings -> Secrets and variables -> Actions -> New/Edit repository secret")
    print("Name: STORYGRAPH_COOKIE")
    print("Value: (Paste your cookie)")

def main():
    print("========================================")
    print("   Nils Duran Portfolio - Update Tool   ")
    print("========================================")
    
    update_images()
    update_storygraph_cookie()
    
    print("\n✨ Update process finished.")

if __name__ == "__main__":
    main()
