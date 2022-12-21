import { tileLayer, control, Map, ControlPosition } from 'leaflet';
import { fullScreenMap } from '../Control/FullScreen';
import { IBaseLayer, ILayers, IOverLayer } from '../Interfaces/Control';

/**
 * Generate layers control to available users want differente layers
 * to use in maps.
 * @param map Map instantiate object when add control layers
 * @param layers Layers with base and overlayers to add in map
 * @param position control position in map
 */
export const addLayers = (
  map: Map,
  layers: ILayers,
  position: ControlPosition = 'topright'
) => {
  if (!layers.baseLayers) {
    throw new Error('Need to add Base Layers');
  }

  if (!layers.baseLayers.filter((layer) => layer.default).length) {
    const errorMessage = `Need set one default base layer
    For Example:
    baseLayers: [
      {
        label: 'OSMHot',
        map: tileLayers.baseLayers.osmHot.map,
        atribution: tileLayers.baseLayers.osmHot.atribution,
        default: true,  <=============
      },
    ],`;
    throw new Error(errorMessage);
  }

  if (layers.baseLayers.length < 2) {
    console.warn(
      'Take advantage of at least two base layers to take advantage of this feature'
    );
  }

  // Layers controls
  control
    .layers(
      groupBaseLayers(layers.baseLayers, map),
      layers.overLayers && groupOverLayers(layers.overLayers, map),
      {
        position,
      }
    )
    .addTo(map);
};

function groupBaseLayers(layers: Array<IBaseLayer>, map: Map) {
  const findDefaultLayerConfig = layers.find((layer) => layer.default);
  const defaultLayer = tileLayer(findDefaultLayerConfig!!.map, {
    attribution: findDefaultLayerConfig!!.atribution,
  }).addTo(map);

  return layers.reduce(
    (a, layer) => {
      return !layer.default
        ? {
            // Add NO default layers
            ...a,
            [layer.label || '']: tileLayer(layer.map, {
              attribution: layer.atribution,
            }),
          }
        : {
            ...a,
            ...{ [layer.label || '']: defaultLayer }, // Map Default select layer
          };
    },
    {} // Start value
  );
}

function groupOverLayers(layers: Array<IOverLayer>, map: Map) {
  return layers.reduce(
    (a, layer) => ({
      ...a,
      [layer.label]: layer.select
        ? tileLayer(layer.map).addTo(map)
        : tileLayer(layer.map),
    }),
    {}
  );
}

export function activeFullScreen(
  map: Map,
  mapId: string = 'map',
  exitText: string = 'Salir pantalla completa',
  entryText: string = 'Ver en pantalla completa',
  position: ControlPosition = 'topleft'
) {
  fullScreenMap({
    position: position || 'topleft',
    entryText,
    exitText,
    mapId,
  }).addTo(map);
}
