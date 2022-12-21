import React, { useEffect, useState } from 'react';
import { Map, map, tileLayer } from 'leaflet';
import { MapProps } from './Interfaces/ConfigMap';
import { tileLayers } from './TileLayer/Constants';
import { activeFullScreen, addLayers } from './Control/Functions';
import { addMarkers } from './Marker/Functions';

export const useLeafletMap = (config: MapProps) => {
  const [mapItem, setMapItem] = useState<Map>();

  const createMapContainer = () =>
    setMapItem(
      map(config.id, {
        center: [config.center.lat, config.center.lng],
        zoom: config.zoom,
      }).setView(config.center)
    );

  const reset = () => {
    if (mapItem) {
      mapItem.remove();
      createMapContainer();
    }
  };

  const start = () => {
    if (!mapItem) {
      createMapContainer();
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
  };

  return {
    start,
    reset,
    mapContainer: mapItem,
    initConfig: initMapOptions,
  };
};
