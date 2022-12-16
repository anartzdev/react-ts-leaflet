import { Icon } from 'leaflet';
import { MarkerColor } from '../Icon/Constants';

/**
 * Implement all config to use in marker. In this moment ony exist icon custom
 * configurtion to change marker color.
 * @param iconColor Define select marker color from MarkerColor enum
 * @returns
 */
export function defaultOptionsIconConfig(iconColor: string = MarkerColor.Red) {
  return {
    icon: new Icon({
      iconUrl: `https://raw.githubusercontent.com/leaflet-maps-course/leaflet-color-markers/master/img/marker-icon-2x-${iconColor}.png`,
      shadowUrl:
        'https://raw.githubusercontent.com/leaflet-maps-course/leaflet-color-markers/master/img/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    }),
  };
}
