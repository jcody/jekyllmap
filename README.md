jekyllmap
=========

A simple jekyll site that generates a map!

Installation
-------------
    git clone https://github.com/dthompson/jekyllmap.git
    jekyll serve

Adding Locations
-----------------
Locations are located in the `/locations` folder as .txt files, supporting images reside in `/images`. Preferably use the name of the parklet's sponsoring business as the filename to keep things clean, but jekyll will compile all text files by default regardless of filename.

The text file **must** be structured as follows:
    ---
    title: Address of Parklet
    host: Sponsoring Business
    image: "image_file_name.jpg"

    latitude: 37.776368
    longitude: -122.408594
    ---