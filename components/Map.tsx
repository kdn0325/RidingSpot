import Mapbox, { Camera, LocationPuck, MapView, StyleURL } from '@rnmapbox/maps';

import { useScooter } from '~/providers/ScooterProvider';

import LineRoutes from './LineRoutes';
import ScooterMarker from './ScooterMarker';
import { EXPO_PUBLIC_MAPBOX_TOKEN } from '~/constant';
import { useRide } from '~/providers/RideProvider';

Mapbox.setAccessToken(EXPO_PUBLIC_MAPBOX_TOKEN || '');
const customStyleURL = 'mapbox://styles/abelkim/cmdfs86wj03jd01r40yi091g2';

export default function Map() {
  const { directionCoordinate } = useScooter();
  const { ride } = useRide();

  const showMarkers = !ride;

  return (
    <MapView
      style={{ flex: 1 }}
      rotateEnabled={false}
      styleURL={StyleURL.Dark}
      scaleBarEnabled={false}
      logoEnabled={false}
      compassEnabled={false}>
      <Camera followZoomLevel={16} followUserLocation />
      <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />
      {showMarkers && (
        <>
          <ScooterMarker />
          {directionCoordinate && <LineRoutes coordinates={directionCoordinate} />}
        </>
      )}
    </MapView>
  );
}
