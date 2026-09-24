import shutil
import os

os.makedirs("public", exist_ok=True)
shutil.copyfile("images.png", "public/sust-logo.png")
print("Copied images.png to public/sust-logo.png successfully.")
