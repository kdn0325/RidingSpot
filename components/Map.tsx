import Mapbox, { Camera, LocationPuck, MapView, StyleURL } from '@rnmapbox/maps';

import { useScooter } from '~/providers/ScooterProvider';

import LineRoutes from './LineRoutes';
import ScooterMarker from './ScooterMarker';

Mapbox.setAccessToken(process.env.MAPBOX_TOKEN || '');

export default function Map() {
  const { directionCoordinate } = useScooter();
  const customStyleURL = 'mapbox://styles/abelkim/cmdfs86wj03jd01r40yi091g2';

  return (
    <MapView
      style={{ flex: 1 }}
      styleURL={StyleURL.Dark}
      onDidFinishLoadingMap={() => console.log('Map loaded')}>
      <Camera followZoomLevel={10} followUserLocation />
      <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />
      <ScooterMarker />
      {directionCoordinate && <LineRoutes coordinates={directionCoordinate} />}
    </MapView>
  );
}
