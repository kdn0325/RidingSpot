import Mapbox, { Camera, LocationPuck, MapView, StyleURL } from '@rnmapbox/maps';

import { useScooter } from '~/providers/ScooterProvider';

import LineRoutes from './LineRoutes';
import ScooterMarker from './ScooterMarker';
import { MAPBOX_TOKEN } from '~/constant';

Mapbox.setAccessToken(MAPBOX_TOKEN || '');

export default function Map() {
  const { directionCoordinate } = useScooter();
  const customStyleURL = 'mapbox://styles/abelkim/cmdfs86wj03jd01r40yi091g2';

  return (
    <MapView
      style={{ flex: 1 }}
      rotateEnabled={false}
      styleURL={StyleURL.Dark}
      scaleBarEnabled={false}
      logoEnabled={false}
      compassEnabled={false}
      onDidFinishLoadingMap={() => console.log('Map loaded')}>
      <Camera followZoomLevel={16} followUserLocation />
      <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />
      <ScooterMarker />
      {directionCoordinate && <LineRoutes coordinates={directionCoordinate} />}
    </MapView>
  );
}
