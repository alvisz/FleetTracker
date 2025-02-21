import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LocationData, LocationDataInterface} from '../interfaces/LocationDataInterface';
import * as moment from 'moment';
import {MapInterface} from '../interfaces/MapInterface';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public Route: [LocationData];
  public Stops: Array<MapInterface>;

  constructor(private http: HttpClient) { }

  private apiUrl: string = '/fleetapi/Vehicles/getRawData';

  fetchLocation(apiKey: string, objectId: number, date: Date): Promise<LocationDataInterface> {
    let objectID = objectId.toString();
    let startDate = moment(date).format('YYYY-MM-DD');
    let endDate = moment(date).add(1,'day').format('YYYY-MM-DD');
    let params = new HttpParams()
      .set('key', apiKey)
      .set('objectId', objectID)
      .set('begTimestamp', startDate)
      .set('endTimestamp', endDate)
      .set('json', '');

    return this.http.get<LocationDataInterface>(this.apiUrl, {params}).toPromise();
  }

  saveRoute(route: [LocationData]): void{
    this.Route = route;
  }

  getRoute(): [LocationData]{
    return this.Route;
  }

  saveStops(stops: Array<MapInterface>): void{
    this.Stops = stops;
  }


  getStops(): Array<MapInterface> {
    return this.Stops;
  }

}
