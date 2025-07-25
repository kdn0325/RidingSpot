import { LineLayer, ShapeSource } from '@rnmapbox/maps';
import { Position } from '@rnmapbox/maps/lib/typescript/src/types/Position';

export default function LineRoutes({
  coordinates,
  id = 'routeSource',
}: {
  id?: string;
  coordinates: Position[];
}) {
  return (
    <ShapeSource
      id={id}
      shape={{
        properties: {},
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates,
        },
      }}>
      <LineLayer
        id="exampleLineLayer"
        style={{
          lineColor: '#42E100',
          lineCap: 'round',
          lineJoin: 'round',
          lineWidth: 10,
          lineDasharray: [1, 0],
        }}
      />
    </ShapeSource>
  );
}
