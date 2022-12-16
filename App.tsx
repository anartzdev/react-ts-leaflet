import * as React from 'react';
import { EXAMPLES_CONFIGS, UsePropertiesMap } from './Data/Examples';
import { MarkerColor } from './Icon/Constants';
import { ISizeMap, MapProps } from './Interfaces/ConfigMap';
import LeafletMap from './LeafletMap';
import './style.css';

export default function App() {
  const [mapConfig, setMapConfig] = React.useState<MapProps>();
  const size: ISizeMap = {
    width: '100%',
    height: '750px',
  };

  const selectExample = (example: UsePropertiesMap) => {
    setMapConfig({
      id: 'map',
      style: { width: size.width, height: size.height },
      center: example.center,
      zoom: example.zoom,
      markers: example.markers || [],
      fullscreen: example.fullscreen,
      layers: example.layers || undefined,
      defaultMarker: example.defaultMarker || MarkerColor.Blue,
    });
  };

  React.useEffect(() => {
    if (!mapConfig) {
      selectExample(EXAMPLES_CONFIGS.MapWithCtrlLayers);
    }
  }, [mapConfig]);

  return (
    <div>
      <h4>React Leaflet</h4>
      {Object.keys(EXAMPLES_CONFIGS).map((example, index) => (
        <button
          key={index}
          onClick={() => selectExample(EXAMPLES_CONFIGS[example])}
        >
          {example.toUpperCase()}
        </button>
      ))}
      {mapConfig ? <LeafletMap config={mapConfig} /> : <p>Cargando...</p>}
    </div>
  );
}
