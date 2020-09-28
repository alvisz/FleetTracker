import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FleetData, FleetInterface} from '../interfaces/FleetInterface';

@Injectable({
  providedIn: 'root'
})
export class FleetService {

  private apiUrl: string = '/fleetapi/Vehicles/getLastData';
  private fleet: [FleetData];

  constructor(private http: HttpClient) { }


  fetchFleet(apiKey: string): Promise<FleetInterface> {

    let params = new HttpParams()
      .set('key', apiKey)
      .set('json', '');

    return this.http.get<FleetInterface>(this.apiUrl, {params}).toPromise();
  }

  setFleet(fleet: [FleetData]): void {
    this.fleet = fleet;
  }

  getFleet(): [FleetData]{
    return this.fleet;
  }

}
