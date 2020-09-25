// "any" is used in places where I didn't know the data type
export interface FleetInterface {
  status: number;
  meta: any;
  response: [FleetData]
}

export interface FleetData {
  objectId: number;
  orgId: number;
  timestamp: string;
  latitude: number;
  longitude: number;
  speed: number;
  enginestate: number;
  gpsstate: number;
  direction: number;
  fuel: number;
  power: number;
  CANDistance: number;
  available: boolean;
  driverId: number;
  driverName: string;
  driverKey: any;
  driverPhone: string;
  driverStatuses: any;
  driverIsOnDuty: boolean;
  dutyTags: any;
  pairedObjectId: number;
  pairedObjectName: string;
  lastEngineOnTime: string;
  inPrivateZone: boolean;
  offWorkSchedule: any;
  tripPurposeDinSet: any;
  tcoData: any;
  tcoCardIsPresent: boolean;
  address: string;
  addressArea: string;
  displayColor: any;
  employeeId: number;
  enforcePrivacyFilter: any;
  EVStateOfCharge: number;
  EVDistanceRemaining: number;
  customValues: [any];
  objectName: string;
  externalId: number;
  plate: string;
}
