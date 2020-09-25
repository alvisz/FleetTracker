import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FleetData, FleetInterface} from '../interfaces/FleetInterface';

@Injectable({
  providedIn: 'root'
})
export class FleetService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = '/api/Vehicles/getLastData';
  private fleet: [FleetData];


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
