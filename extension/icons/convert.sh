#!/bin/bash

# Create icons directory if it doesn't exist
mkdir -p icons

# Convert SVG to different PNG sizes
convert -background none -size 16x16 icon128.svg icon16.png
convert -background none -size 48x48 icon128.svg icon48.png
convert -background none -size 128x128 icon128.svg icon128.png 