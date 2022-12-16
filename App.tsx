import * as React from 'react';
import { EXAMPLES_CONFIGS, UsePropertiesMap } from './Data/Examples';
import { MarkerColor } from './Icon/Constants';
import { ISizeMap, MapProps } from './Interfaces/ConfigMap';
import LeafletMap from './LeafletMap';
import './style.css';
import './button.css';

export default function App() {
  const [mapConfig, setMapConfig] = React.useState<MapProps>();
  const [title, setTitle] = React.useState<string>(
    'React Leaflet - '.concat(EXAMPLES_CONFIGS.Basic.buttonLabel)
  );
  const size: ISizeMap = {
    width: '100%',
    height: '750px',
  };

  const changeTitle = (buttonLabel: string) =>
    setTitle('React Leaflet - '.concat(buttonLabel));

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
    changeTitle(example.buttonLabel);
  };

  React.useEffect(() => {
    if (!mapConfig) {
      selectExample(EXAMPLES_CONFIGS.Basic);
    }
  }, [mapConfig]);

  return (
    <div>
      <h2>{title}</h2>
      {Object.keys(EXAMPLES_CONFIGS).map((example, index) => (
        <button
          className="btn btn-success btn-lg btn-p-3"
          key={index}
          onClick={() => selectExample(EXAMPLES_CONFIGS[example])}
        >
          {EXAMPLES_CONFIGS[example].buttonLabel}
        </button>
      ))}
      {mapConfig ? <LeafletMap config={mapConfig} /> : <p>Cargando...</p>}
    </div>
  );
}
