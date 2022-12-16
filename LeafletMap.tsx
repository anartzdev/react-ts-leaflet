import { Map, map, tileLayer } from 'leaflet';
import * as React from 'react';
import { tileLayers } from './TileLayer/Constants';

import { activeFullScreen, addLayers } from './Control/Functions';
import { addMarkers } from './Marker/Functions';
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
    config.defaultLayer &&
      tileLayer(config.defaultLayer.map, {
        attribution: config.defaultLayer.atribution,
      }).addTo(mapItem);

    // If not add layers, define default layer
    !config.defaultLayer &&
      !config.layers &&
      tileLayer(tileLayers.baseLayers.cartoDb.map.voyager, {
        attribution: tileLayers.baseLayers.cartoDb.atribution,
      }).addTo(mapItem);

    // layer control implement
    config.layers && addLayers(mapItem, config.layers);

    config.markers &&
      addMarkers(
        mapItem,
        config.markers,
        config.markers.length ? config.markers[0].custom : false,
        config.defaultMarker
      );

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
