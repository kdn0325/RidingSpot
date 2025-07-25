import ky, { HTTPError } from 'ky';
import { EXPO_PUBLIC_MAPBOX_TOKEN } from '~/constant';
import { MapboxDirections, MapboxMatchingResponse } from '~/types/Directions';

const BASE_URL = 'https://api.mapbox.com';

export async function getDirections(from: [number, number], to: [number, number]) {
  if (!EXPO_PUBLIC_MAPBOX_TOKEN) throw new Error('❌ EXPO_PUBLIC_MAPBOX_TOKEN is undefined');

  try {
    return await ky
      .get(`${BASE_URL}/directions/v5/mapbox/walking/${from[0]},${from[1]};${to[0]},${to[1]}`, {
        searchParams: {
          alternatives: 'false',
          annotations: 'distance,duration',
          continue_straight: 'true',
          geometries: 'geojson',
          overview: 'full',
          steps: 'false',
          access_token: EXPO_PUBLIC_MAPBOX_TOKEN,
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

export async function fetchDirectionBasedOnCoords(
  coordinates: [number, number][]
): Promise<MapboxMatchingResponse> {
  if (coordinates.length < 2) {
    throw new Error('❌ 최소 2개 이상의 좌표가 필요합니다.');
  }

  const coordinatesString = coordinates.map(([lng, lat]) => `${lng},${lat}`).join(';');

  const url = `${BASE_URL}/matching/v5/mapbox/cycling/${coordinatesString}`;

  const searchParams = {
    annotations: 'distance,duration',
    geometries: 'geojson',
    overview: 'full',
    steps: 'false',
    access_token: EXPO_PUBLIC_MAPBOX_TOKEN,
  };

  try {
    const response = await ky.get(url, { searchParams });
    return await response.json();
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorMsg = await error.response.text();
      console.error(`❌ Mapbox API error ${error.response.status}: ${errorMsg}`);
    } else {
      console.error('❌ Unexpected error:', error);
    }
    throw error;
  }
}
