export interface MapInterface {
  longitude: number;
  latitude: number;
  speed?: number;
  name?: string;
}

export interface MapDataInterface {
  route: Array<MapInterface>;
  markers: Array<MapInterface>;
}

