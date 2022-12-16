import { Map, map, tileLayer } from 'leaflet';
import * as React from 'react';
import { tileLayers } from './TileLayer/Constants';

import { activeFullScreen, addLayers } from './Control/Functions';
import { addMarkers } from './Marker/Functions';
import { MarkerColor } from './Icon/Constants';
import { MapProps } from './Interfaces/ConfigMap';

const LeafletMap: React.FunctionComponent<{ config: MapProps }> = ({
  config,
}) => {
  const [mapItem, setMapItem] = React.useState<Map>();
  const [mapConfig, setMapConfig] = React.useState<MapProps>();

  const start = () => {
    if (!mapItem) {
      setMapItem(
        map(config.id, {
          center: [config.center.lat, config.center.lng],
          zoom: config.zoom,
        }).setView(config.center)
      );
    }
    if (mapItem && config !== mapConfig) {
      initMapOptions();
    }
  };

  const initMapOptions = () => {
    // If not add layers, define default layer
    !config.layers &&
      tileLayer(tileLayers.baseLayers.default.map).addTo(mapItem);

    // layer control implement
    config.layers && addLayers(mapItem, config.layers);

    config.markers && addMarkers(mapItem, config.markers, config.defaultMarker);

    config.fullscreen && activeFullScreen(mapItem, config.id || 'map');

    setMapConfig(config);
  };

  React.useEffect(() => {
    start();
  }, [mapItem]);

  React.useEffect(() => {
    if (mapItem) {
      mapItem.remove();
      setMapItem(
        map(config.id, {
          center: [config.center.lat, config.center.lng],
          zoom: config.zoom,
        }).setView(config.center)
      );
    }
  }, [config.center, config.id, config.markers, config.layers]);

  return <div id={config.id} style={config.style} className="map"></div>;
};

// TODO Define to validate data input
/*if (process.env.NODE_ENV !== "production") {
    Map.propTypes= {
      id: PropTypes.string,
      style: {
        width: PropTypes.string,
        height: PropTypes.string
      }
    };
  }*/

export default LeafletMap;
