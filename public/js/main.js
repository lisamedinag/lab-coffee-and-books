
function initMap() {

    const ironhackMAD = {
        lat: 40.39279917456607,
        lng: -3.698590505452073
    };


    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: ironhackMAD
    });

    getPlaces()
        .then(response => {
            const places = response.data.places
            console.log(places);
            const markers = placePlaces(map, places)
        })
        .catch(error => console.log(error))
}

function getPlaces() {
    
    return axios.get("/places/api")
}



function placePlaces(map, places) {
    const markers = []

    places.forEach((place) => {
        const center = {
            lat: place.location.coordinates[1],
            lng: place.location.coordinates[0]
        };
        const newMarker = new google.maps.Marker({
            position: center,
            map: map,
            title: place.name
        });
        markers.push(newMarker);
    });

    return markers
}