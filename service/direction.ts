import ky, { HTTPError } from 'ky';
import { MAPBOX_TOKEN } from '~/constant';
import { MapboxDirections } from '~/types/Directions';

const BASE_URL = 'https://api.mapbox.com/directions/v5/mapbox/walking';

export async function getDirections(from: [number, number], to: [number, number]) {
  if (!MAPBOX_TOKEN) throw new Error('❌ MAPBOX_TOKEN is undefined');

  try {
    return await ky
      .get(`${BASE_URL}/${from[0]},${from[1]};${to[0]},${to[1]}`, {
        searchParams: {
          alternatives: 'false',
          annotations: 'distance,duration',
          continue_straight: 'true',
          geometries: 'geojson',
          overview: 'full',
          steps: 'false',
          access_token: MAPBOX_TOKEN,
        },
      })
      .json<MapboxDirections>();
  } catch (e) {
    if (e instanceof HTTPError) {
      const msg = await e.response.text();
      console.error(`❌ Mapbox API error ${e.response.status}: ${msg}`);
    }
    throw e;
  }
}
