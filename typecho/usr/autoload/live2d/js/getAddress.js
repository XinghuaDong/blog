
var x = document.getElementById("demo");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
    else { x.innerHTML = "Geolocation is not supported by this browser."; }
}
function showPosition(position) {
    // lat=position.coords.latitude;
    // lon=position.coords.longitude;
    // latlon=new google.maps.LatLng(lat, lon)
    // mapholder=document.getElementById('mapholder')
    // mapholder.style.height='250px';
    // mapholder.style.width='500px';
    // var myOptions={
    // 	center:latlon,zoom:14,
    // 	mapTypeId:google.maps.MapTypeId.ROADMAP,
    // 	mapTypeControl:false,
    // 	navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    // };
    // var map=new google.maps.Map(document.getElementById("mapholder"),myOptions);
    // var marker=new google.maps.Marker({position:latlon,map:map,title:"You are here!"});

    // var latlon=position.coords.latitude+","+position.coords.longitude;
    // var img_url="http://maps.googleapis.com/maps/api/staticmap?center="
    // +latlon+"&zoom=14&size=400x300&sensor=false";
    // document.getElementById("mapholder").innerHTML="<img src='"+img_url+"' />";

    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br />Longitude: " + position.coords.longitude;
}
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}
