import { Icon } from 'leaflet';
const drinkWaterIcon = new Icon({
  iconUrl:
    'https://raw.githubusercontent.com/leaflet-maps-course/resources/main/markers/icons/custom/drink_water.png',
  iconSize: [46, 48], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [23, 48], // point of the icon which will correspond to marker's location
  // half of width + height respect "iconSize"
  shadowAnchor: [4, 20], // the same for the shadow
  popupAnchor: [-3, -40], // point from which the popup should open relative to the iconAnchor
});

export { drinkWaterIcon };
