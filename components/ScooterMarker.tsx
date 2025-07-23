import { StyleSheet } from 'react-native';
import { CircleLayer, Images, ShapeSource, SymbolLayer } from '@rnmapbox/maps';
import { OnPressEvent } from '@rnmapbox/maps/lib/typescript/src/types/OnPressEvent';
import scooters from '~/data/scooters.json';
import { featureCollection, point } from '@turf/helpers';
import { useScooter } from '~/providers/ScooterProvider';
//chatgpt.com/
https: import pin from '~/assets/pin.png';

export default function ScooterMarker() {
  const points = scooters.map((scooter) => point([scooter.long, scooter.lat], { scooter }));
  const { setSelectedScooter } = useScooter();

  const onPointPress = async (event: OnPressEvent) => {
    if (event.features[0].properties?.scooter) {
      setSelectedScooter(event.features[0].properties.scooter);
    }
  };
  return (
    <ShapeSource
      id="scooters"
      cluster={true}
      clusterRadius={50}
      shape={featureCollection(points)}
      onPress={onPointPress}>
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
  );
}

const styles = StyleSheet.create({});
