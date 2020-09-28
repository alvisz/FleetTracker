import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MapInterface} from '../interfaces/MapInterface';

export interface Response {
  success: boolean;
  message: string;
  distance?: number;
}

@Injectable({
  providedIn: 'root'
})

export class DistanceService {

  private apiUrl: string = '/api/distanceapi';

  constructor(private http: HttpClient) { }

  fetchDistance(coordinates: Array<MapInterface>): Promise<Response> {
    return this.http.post<Response>(this.apiUrl, {locations: coordinates}).toPromise();
  }

}
