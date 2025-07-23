const BASE_URL = 'https://api.mapbox.com';

export async function getDirections(from: [number, number], to: [number, number]) {
  const response = await fetch(
    `${BASE_URL}/directions/v5/mapbox/walking/${from[0]},${from[1]};${to[0]},${to[1]}?alternatives=false&annotations=distance%2Cduration&continue_straight=true&geometries=geojson&overview=full&steps=false&access_token=pk.eyJ1IjoiYWJlbGtpbSIsImEiOiJjbGg3Z3hiMm8wOWMzM2Zxc2ZkdnNxbnF3In0.n1urGQgR5zmvSrVLyVM7sQ`
  );
  const json = await response.json();
  return json;
}
