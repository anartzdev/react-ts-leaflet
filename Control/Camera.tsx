import { Map } from 'leaflet';

/**
 * Option to go with camera change with animation very easy
 */
export const FlyTo = (
  map: Map,
  goTo: { lat: number; lng: number },
  zoom = 7
) => {
  map.flyTo(goTo, zoom);
};
