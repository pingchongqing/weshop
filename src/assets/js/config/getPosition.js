export function getPosition() {
  let pos = {}
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position);
    pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
  });
  return pos
}
