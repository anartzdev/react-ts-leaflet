import React, { useEffect, useState } from 'react';
import { Map, map, tileLayer } from 'leaflet';
import { MapProps } from './Interfaces/ConfigMap';
import { tileLayers } from './TileLayer/Constants';
import { activeFullScreen, addLayers } from './Control/Functions';
import { addMarkers } from './Marker/Functions';
import { IMarker } from './Interfaces/Layers';

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

  const markersBounds = (markers: Array<IMarker>) =>
    markers.map(
      (point) => [point.position.lat, point.position.lng] as [number, number]
    );

  const fitBounds = (
    centerPoint: { lat: number; lng: number } = undefined,
    markers: Array<IMarker> = []
  ) => {
    let bounds: [number, number][] = [];
    if (centerPoint) {
      bounds = [[centerPoint.lat, centerPoint.lng] as [number, number]];
    }

    if (markers) {
      bounds = [...bounds, ...markersBounds(markers)];
    }

    console.log(bounds);
    mapItem && mapItem.fitBounds(bounds);
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

    config.fullscreen &&
      activeFullScreen(
        mapItem,
        config.id || 'map',
        'Salir de pantalla completa',
        'Pantalla completa'
      );

    config.fitBounds &&
      fitBounds(
        config.fitBounds.center ? config.center : undefined,
        config.fitBounds.markers ? config.markers : []
      );
  };

  return {
    start,
    reset,
    mapContainer: mapItem,
    initConfig: initMapOptions,
  };
};
