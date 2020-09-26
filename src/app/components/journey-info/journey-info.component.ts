import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LocationService} from '../../services/location.service';
import {KeyService} from '../../services/key.service';
import {LocationData} from '../../interfaces/LocationDataInterface';
import {getDistance, getPathLength} from 'geolib';

@Component({
  selector: 'app-journey-info',
  templateUrl: './journey-info.component.html',
  styleUrls: ['./journey-info.component.sass']
})
export class JourneyInfoComponent {
  @Input('objectId') private objectId: number;
  @Output() OnSelect:   EventEmitter<boolean> = new EventEmitter<boolean>()
  public dateSelected:  number = Date.now();
  public stopCount: number = 0;
  public distanceDriven: number = 0;
  public shortestPath: number = 0;

  dateForm = new FormGroup({
    date: new FormControl(Date.now())
  })

  constructor(private Location: LocationService,
              private Key: KeyService) { }


  getLocations(): void {
    let API_KEY: string = this.Key.getKey();
    this.Location.fetchLocation(API_KEY,this.objectId, new Date(this.dateSelected)).then(data => {
      if (data.response){
        this.Location.saveRoute(data.response);
      }
    }).then(() => {
      this.OnSelect.emit(true)
      this.generateJourneyInfo();
    });
  }

  generateJourneyInfo(): void{
    let route: [LocationData] = this.Location.getRoute();
    this.distanceDriven = Number((route[route.length-1].Distance - route[0].Distance).toFixed(2));
    if (route[0].Distance === undefined){
      /*
      If the distance is undefined, the API does not provide with data from card odometer.
      In this case I use geolib to calculate the distance driven by coordinates.
       */
      let stopsForDistance = route.map(function(stop){
        return {longitude: stop.Longitude, latitude: stop.Latitude}
      })
      this.distanceDriven = Number((getPathLength(stopsForDistance)/1000).toFixed(2));
    }
  }

  onSubmit(){
    this.dateSelected = this.dateForm.get('date').value
    this.getLocations();
  }


}
