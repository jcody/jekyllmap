// LIST clicking
// close any open items when clicking to show another
// and add .active to denote open element
$('.list-group-item').click(function() {

  // get index of element, remove beggining '#5' => '5'
  var point = parseInt($(this).attr('data-target').substr(1,1));
  var marker = jekyllMap.retreiveMarkerMap(point);

  // fix for double clicking list, prevents toggle clusterfuck
  if ($(this).next().hasClass('collapsing')) var transition = true;
  
  if (transition == true) console.log('No double clicking dude.');
  else {
    // hide any open list items, open clicked
    $('.details.in').collapse('hide');
    $(this).next().collapse('toggle');

    // if clicked the same element, remove highlight
    if ($(this).hasClass('active')) {
      $('.active').removeClass('active');
      $('.hover').removeClass('hover');
      marker.setIcon(jekyllMap.markerIcon);
    }
    else {
      $('.active').removeClass('active');
      $('.hover').removeClass('hover');
      $(this).addClass('active');
      if (typeof coloredMarker != 'undefined') coloredMarker.setIcon(jekyllMap.markerIcon);
      marker.setIcon(jekyllMap.markerIconActive);
      coloredMarker = marker;
    }
  }
});

var jekyllMap = (function (jekyllMap) {

  // eventually builds object map of specific markers on each layer of the leaflet map 
  var markers = new Array();
  var markerCount = 0;
  var markerMap = {};

  // Extending Leaflet default markers with AwesomeMarkers library
  var markerIcon = L.AwesomeMarkers.icon({icon: 'coffee', color: 'green'});
  var markerIconActive = L.AwesomeMarkers.icon({icon: 'coffee', color: 'blue'});


  // PUBLIC METHODS
  function init() {

    var map = L.map('map', {scrollWheelZoom: false});
    map.attributionControl.setPrefix("");

    // mapping tiles
    L.tileLayer('http://{s}.tiles.mapbox.com/v3/examples.map-vyofok3q/{z}/{x}/{y}.png', {maxZoom: 18}).addTo(map);

    // Leaflet marker points creation, each marker on a new layer
    // Takes in generated .geojson file and adds to map
    var pointy = L.geoJson(data, {
      onEachFeature: function (feature, layer) {
        markers.push(markerCount);
        feature.properties.index = markerCount;
        layer.on({mouseover: _hoverFeature, mouseout: _unhoverFeature, mousedown: _clickFeature});
        markerCount++;
    },
      pointToLayer: function (feature, latlng) {
        var marker = new L.marker(latlng, {icon: markerIcon});
        markerMap[markers.length] = marker;
        return marker;
      }
    }).addTo(map);

    // account for sidebar and adjust map 450px to right 
    // and pad top+bottom 30px => this adjusts the zoom automagically, super convenient
    map.fitBounds(pointy.getBounds(), {paddingTopLeft: [450, 30], paddingBottomRight: [0, 30]});

  }

  function retreiveMarkerMap(point) {
    return markerMap[point];
  }


  // PRIVATE METHODS

  // highlight listing on map hover, unless listing is already 'active' item
  function _highlightListing(point) {
    if (! $("button[data-target='#" + point + "']").hasClass('active')) {
      $("button[data-target='#" + point + "']").toggleClass('hover');
    }
  }

  // Hovering Leaflet map
  function _hoverFeature() {
    var point = this.feature.properties.index;
    _highlightListing(point);
  }

  // Unhovering Leaflet map
  function _unhoverFeature() {
    var point = this.feature.properties.index;
    _highlightListing(point);
  }

  // Clicking Leaflet map
  function _clickFeature() {
    var point = this.feature.properties.index;

    // if exists an already colored marker, remove it and higlight current selected
    if (typeof coloredMarker != 'undefined') coloredMarker.setIcon(markerIcon);

    this.setIcon(markerIconActive);
    coloredMarker = this;  
    $('button[data-target="#' + point + '"]').removeClass('hover');
    $('button[data-target="#' + point + '"]').click();
    $('html, body').animate({scrollTop: $('button[data-target="#'+point+'"]').offset().top}, 500);
  }

  // add public methods to the returned module and return it
  jekyllMap.init = init;
  jekyllMap.retreiveMarkerMap = retreiveMarkerMap;
  jekyllMap.markerIcon = markerIcon;
  jekyllMap.markerIconActive = markerIconActive;
  return jekyllMap;
}(jekyllMap || {}));

// initialize the module
jekyllMap.init();