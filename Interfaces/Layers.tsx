import { Point } from 'leaflet';

type LayersType =
  | 'marker'
  | 'circle'
  | 'circle-marker'
  | 'polygon'
  | 'polyline';
interface ILayer {
  type?: LayersType;
  position: { lat: number; lng: number };
  popup?: {
    content: string;
    options?: {
      offset: Point;
      maxWidth: number;
      minWidth: number;
      closeButton: boolean;
    };
  };
}

export interface IMarker extends ILayer {
  draggable?: boolean;
  custom?: boolean;
}
