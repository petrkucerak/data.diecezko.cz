#!/bin/bash

yarn

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Source and destination folders
source_folder="../../tmp"
destination_folder="../2023/foto"

# Check if source folder exists
if [ ! -d "$source_folder" ]; then
   echo "Source folder does not exist."
   exit 1
fi

# Check if destination folder exists, if not, create it
if [ ! -d "$destination_folder" ]; then
   mkdir -p "$destination_folder"
fi

# Loop through each file in the source folder
for file in "$source_folder"/*; do
   # Check if the item is a file
   if [ -f "$file" ]; then
      # Extract the file name from the full path
      file_name=$(basename "$file")

      # Copy the file to the destination folder
      cp "$file" "$destination_folder/$file_name"

      echo -e "${GREEN}Copied: $file_name${NC}"

      # Generate files
      # yarn gallery
      # yarn img2webp

      # Commit changes
      git add ../2023/foto/*
      git commit -m "Add image $file"
      git pull
      git push

      echo -e "${YELLOW}Image has been commited${NC}"
      echo ""
   fi
done

echo "Copy process completed."
