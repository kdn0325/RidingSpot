import Mapbox, {
  Camera,
  CircleLayer,
  Images,
  MapView,
  ShapeSource,
  StyleURL,
  SymbolLayer,
} from '@rnmapbox/maps';
import { featureCollection, point } from '@turf/helpers';
import pin from '~/assets/pin.png';
import scooters from '~/data/scooters.json';

Mapbox.setAccessToken(process.env.MAX_BOX_KEY || '');

export default function Map() {
  const points = scooters.map((scooter) => point([scooter.long, scooter.lat], { id: scooter.id }));
  const scootersFeatures = featureCollection(points);

  return (
    <MapView style={{ flex: 1 }} styleURL={StyleURL.Dark}>
      <Camera followZoomLevel={10} followUserLocation />
      <ShapeSource
        id="scooters"
        cluster={true}
        clusterRadius={50}
        shape={scootersFeatures}
        onPress={(e) => {
          e.features.forEach((feature) => {
            console.log('Feature:', feature.properties);
          });
        }}>
        <CircleLayer
          id="clusters"
          filter={['has', 'point_count']}
          style={{
            circleColor: '#42E100',
            circleRadius: 20,
            circleOpacity: 1,
            circleStrokeWidth: 2,
            circleStrokeColor: 'white',
          }}
        />
        <SymbolLayer
          id="clusters-count"
          filter={['has', 'point_count']}
          style={{
            textField: ['get', 'point_count'],
            textSize: 18,
            textColor: '#ffffff',
            textFont: ['DIN Offc Pro Medium', 'Arial Unicode MS Regular'],
            textAllowOverlap: true,
            textIgnorePlacement: true,
          }}
        />

        <SymbolLayer
          id="scooter-icons"
          filter={['!', ['has', 'point_count']]}
          style={{
            iconImage: 'pin',
            iconSize: 0.5,
            iconAllowOverlap: true,
            iconAnchor: 'bottom',
          }}
        />
        <Images images={{ pin }} />
      </ShapeSource>
    </MapView>
  );
}
