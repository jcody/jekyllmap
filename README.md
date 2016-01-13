jekyllmap
=========

A simple jekyll site that generates a map!

Installation
-------------
    $ git clone https://github.com/jcody/jekyllmap.git
    $ bundle
    $ jekyll serve

Jekyll should then serve the app locally at http://127.0.0.1:4000.

Adding Locations
-----------------
Locations live in the `/locations` folder as .txt files, supporting images reside in `/images`. Jekyll will compile all text files by default regardless of filename.

The text file must be structured as follows:

    ---
    title: Address of Parklet
    host: Sponsoring Business
    image: "image_file_name.jpg"

    latitude: 37.776368
    longitude: -122.408594
    ---

Latitude and longitudal coordinates can be found via Google Maps.

Contributions
-------------
Special thanks to [Mick Thompson](https://github.com/mick) & [Code for America](https://www.codeforamerica.org/).

Leaflet mapping tiles courtesy of [Heidelberg University](http://korona.geog.uni-heidelberg.de/).
