export interface LocationDataInterface {
  status: number;
  meta: any;
  response: [LocationData];
}

export interface LocationData {
  timestamp: string;
  ServerGenerated: any;
  Din1: any;
  SplitSegment: any;
  Distance: number;
  Power: number;
  EngineStatus: string;
  Direction: number;
  Longitude: number;
  Latitude: number;
  GPSState: string;
  DriverId: number;
  Speed: number;

}
