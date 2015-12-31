mapboxgl.accessToken = 'pk.eyJ1IjoibWFjbyIsImEiOiJjaWl1NXV3aXkwMDBudmhsenF0Y2VmYXl0In0.el4SmsLCzEXhjpbmOzgUsQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v8',
    center: [-79.98968482017517,40.4395412512401],
    zoom: 16.5,
    bearing: 27,
    pitch: 45
});



// On every scroll event, check which element is on screen
window.onscroll = function() {
    var chapterNames = Object.keys(chapters);
    for (var i = 0; i < chapterNames.length; i++) {
        var chapterName = chapterNames[i];
        if (isElementOnScreen(chapterName)) {
            console.log(chapterName);
            setActiveChapter(chapterName);
            break;
        }
    }
};


var activeChapterName = 'Pittsburgh, PA';
function setActiveChapter(chapterName) {
    if (chapterName === activeChapterName) return;

    map.flyTo(chapters[chapterName]);

    document.getElementById(chapterName).setAttribute('class', 'active');
    document.getElementById(activeChapterName).setAttribute('class', '');

    activeChapterName = chapterName;
    window.history.pushState({ chapterName: chapterName }, '', '?chapterName='+chapterName);
}

function isElementOnScreen(id) {
    var element = document.getElementById(id);
    var bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
}

// get URL params
var query = parseQueryString(window.location.search);
console.log(query);
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
