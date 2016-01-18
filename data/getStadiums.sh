
# get stadiums within 5000 m from any node called Boston
# wget "http://overpass-api.de/api/interpreter?data=node[place]["name"="Boston"]->.a;(way(around.a:5000)["leisure"="stadium"];
#   );out geom;" -O bostonStadiums.xml
# osmtogeojson bostonStadiums.xml > stadiums.geojson

# # this goes out of time
# wget "http://overpass-api.de/api/interpreter?data=way["leisure"="stadium"];out geom;" -O wordStadiums.xml

# individual cities
# wget "http://overpass-api.de/api/interpreter?data=way["addr:city"="Pittsburgh"]["leisure"="stadium"];out geom;" -O wordStadiums.xml

stadiums=(
    'Consol Energy Center'
    'United Center'
    'Madison Square Garden'
    'Verizon Center'
    'Prudential Center'
    'Air Canada Centre'
    'TD Garden'
    'Times Union Center'
    'XL Center'
    'Wells Fargo Center'
    'BB&T Center'
    'Philips Arena'
    'KFC Yum! Center'
    'Quicken Loans Arena'
    'First Niagara Center'
    'The Blue Cross Arena at the War Memorial'
    'Xcel Energy Center'
    'BMO Harris Bradley Center'
    'Chaifetz Arena'
    'Talking Stick Resort Arena'
    'Oracle Arena'
    'Los Angeles Memorial Sports Arena'
    )

for (( i = 0; i < ${#stadiums[@]}; i++ ))
do
    echo  "http://overpass-api.de/api/interpreter?data=way[\"name\"=\"${stadiums[i]}\"][\"leisure\"~\"stadium|sports_centre\"];out geom;" -O ${i}.xml
    wget "http://overpass-api.de/api/interpreter?data=way[\"name\"=\"${stadiums[i]}\"][\"leisure\"~\"stadium|sports_centre\"];out geom;" -O ${i}.xml
    osmtogeojson ${i}.xml > ${i}.geojson
    rm ${i}.xml
    echo  ${stadiums[i]}  done
done

# L.layerJSON({
#     url: 'http://overpass-api.de/api/interpreter?data=[out:json];node({lat1},{lon1},{lat2},{lon2})[amenity=bar];out;',
#     propertyItems: 'elements',
#     propertyTitle: 'tags.name',
#     propertyLoc: ['lat','lon'],
#     buildPopup: function(data, marker) {
#         return data.tags.name || null;
#     }
# }).addTo(map);

# http://www.overpass-api.de/command_line.html
# http://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL
# http://wiki.openstreetmap.org/wiki/Overpass_API/Language_Guide
# https://www.npmjs.com/package/osmtogeojson
# test
# http://overpass-turbo.eu/