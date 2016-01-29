mapboxgl.accessToken = 'pk.eyJ1IjoibWFjbyIsImEiOiJjaWl1NXV3aXkwMDBudmhsenF0Y2VmYXl0In0.el4SmsLCzEXhjpbmOzgUsQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/maco/ciiuihgvs00s3c8lz5unatua4',//'mapbox://styles/mapbox/streets-v8',
    center: [-79.98968482017517,40.4395412512401],
    zoom: 16.5,
    bearing: 27,
    pitch: 45
});

/*map.on('style.load', function () {
    map.addSource('urban-areas', {
        'type': 'geojson',
        'data': 'http://mappingandco.github.io/geojsonDB/barcelona/subway.geojson'
    });

    map.addLayer({
        'id': 'urban-areas-fill',
        'type': 'fill',
        'source': 'urban-areas',
        'layout': {},
        'paint': {
            'fill-color': 'red',
            'fill-opacity': 0.4
        }
    }, 'water');
});*/

// On every scroll event, check which element is on screen
window.onscroll = function() {
    var concertNames = Object.keys(concerts);

    for (var i = 0; i < concertNames.length; i++) {
        var concertName = concertNames[i];
        if (isElementOnScreen(concertName)) {
            console.log(concertName);
            setActiveChapter(concertName);
            break;
        }
    }
};

window.onload = function() {
    var query = parseQueryString(window.location.search);
    console.log(query.concertName);
    if (query.concertName){
        var element = document.getElementById(query.concertName);
        var bounds = element.getBoundingClientRect();
        window.scroll(0,[bounds.top + 20]);
    }
}
var activeConcertName = 'Pittsburgh, PA. Consol Energy Center';

function setActiveChapter(concertName) {
    if (concertName === activeConcertName) return;

    map.flyTo(concerts[concertName]);

    document.getElementById(concertName).setAttribute('class', 'active');
    document.getElementById(activeConcertName).setAttribute('class', '');

    activeConcertName = concertName;
    window.history.pushState({ concertName: concertName }, '', '?concertName='+concertName);
}

function isElementOnScreen(id) {
    var element = document.getElementById(id);
    var bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
}

// get URL params
function parseQueryString(queryString) {
    if (!_.isString(queryString))
        return;
    queryString = queryString.substring(queryString.indexOf('?') + 1);
    var params = {};
    var queryParts = decodeURI(queryString).split(/&/g);
    _.each(queryParts, function (val) {
        var parts = val.split('=');
        if (parts.length >= 1) {
            var theValue = undefined;
            if (parts.length == 2)
                theValue = parts[1];
            params[parts[0]] = theValue;
        }
    });
    return params;
}
