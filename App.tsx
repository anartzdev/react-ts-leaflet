import * as React from 'react';
import { EXAMPLES_CONFIGS, UsePropertiesMap } from './Data/Examples';
import { MarkerColor } from './Icon/Constants';
import { ISizeMap, MapProps } from './Interfaces/ConfigMap';
import LeafletMap from './LeafletMap';
import './style.css';
import Button from './Button';
import { drinkWaterSoraluze } from './Data/Markers';

export default function App() {
  const [mapConfig, setMapConfig] = React.useState<MapProps>();
  const [title, setTitle] = React.useState<string>(
    'React Leaflet - '.concat(EXAMPLES_CONFIGS.Basic.buttonLabel)
  );
  const size: ISizeMap = {
    width: '100%',
    height: '87vh',
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
        <Button
          key={index}
          style={'btn btn-success btn-lg btn-p-3'}
          click={selectExample}
          select={EXAMPLES_CONFIGS[example]}
        />
      ))}
      {mapConfig ? <LeafletMap config={mapConfig} /> : <p>Cargando...</p>}
    </div>
  );
}
