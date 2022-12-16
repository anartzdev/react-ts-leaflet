import { IBaseLayer, ILayers } from '../Interfaces/Control';
import { IMarker } from '../Interfaces/Layers';

export interface IConfigMap {
  center?: [number, number];
  layers?: ILayers;
  fullscreen?: boolean;
  defaultLayer?: IBaseLayer;
  fitBounds?: boolean;
  style?: {
    width: string;
    height: string;
  };
  zoom?: number;
}

export interface ISizeMap {
  width: string;
  height: string;
}

export interface MapProps {
  id: string;
  style: {
    width: string;
    height: string;
  };
  defaultLayer?: IBaseLayer;
  center: { lat: number; lng: number };
  zoom: number;
  layers?: ILayers;
  markers?: Array<IMarker>;
  defaultMarker?: string;
  fullscreen?: boolean;
}
