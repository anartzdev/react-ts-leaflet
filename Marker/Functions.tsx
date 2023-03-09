import { Map, Icon, marker, LatLng, Marker } from 'leaflet';
import { MarkerColor } from '../Icon/Constants';
import { drinkWaterIcon } from '../Icon/Custom';
import { defaultOptionsIconConfig } from '../Icon/Default';
import { IMarker } from '../Interfaces/Layers';

/**
 * Add Markers in map to view different locations
 * @param markers collection to location points (lat, lng)
 */
export function addMarkers(
  map: Map,
  markers: Array<IMarker> = [],
  custom: boolean = false,
  iconColor: string = MarkerColor.Blue
) {
  const options = !custom
    ? defaultOptionsIconConfig(iconColor)
    : { icon: drinkWaterIcon };
  if (markers.length === 1) {
    const markerElement = marker(
      [markers[0].position.lat, markers[0].position.lng],
      options
    ).addTo(map);
    markers[0].popup &&
      markerElement
        .bindPopup(markers[0].popup.content)
        .on('click', function () {
          map.flyTo(
            [markerElement.getLatLng().lat, markerElement.getLatLng().lng],
            map.getZoom()
          );
        });
    return;
  }

  markers.forEach((markerItem) => {
    const markerElement = marker(
      [markerItem.position.lat, markerItem.position.lng],
      {
        ...options,
        draggable: markerItem.draggable,
      }
    ).addTo(map);
    markerItem.popup &&
      markerElement
        .bindPopup(markerItem.popup.content)
        .on('click', function () {
          map.panTo(
            new LatLng(map.getCenter().lat + 0.0025, map.getCenter().lng)
          );
        });
  });
}
