import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LocationService} from '../../services/location.service';
import {KeyService} from '../../services/key.service';
import {LocationData} from '../../interfaces/LocationDataInterface';
import {getPathLength} from 'geolib';
import {MapInterface, MapDataInterface} from '../../interfaces/MapInterface';
import {FleetService} from '../../services/fleet.service';
import {HttpErrorResponse} from '@angular/common/http';
import {DistanceService} from '../../services/distance.service';



@Component({
  selector: 'app-journey-info',
  templateUrl: './journey-info.component.html',
  styleUrls: ['./journey-info.component.sass']
})
export class JourneyInfoComponent implements OnInit {

  @Input('objectId')
  private objectId: number; // Object selected

  @Output()
  OnSelect:   EventEmitter<MapDataInterface> = new EventEmitter<MapDataInterface>(); // Sends data to map

  public showJourney: boolean = false;

  public dateSelected:  number = Date.now();
  public stopCount:     number = 0;
  public distanceDriven:number = 0;
  public shortestPath:  number = 0;

  public route:         Array<MapInterface>;
  public line:          any;
  public markers:       Array<MapInterface>;

  dateForm = new FormGroup({
    date: new FormControl(Date.now())
  })

  constructor(private Location: LocationService,
              private Fleet: FleetService,
              private Key: KeyService,
              private Distance: DistanceService) { }

  ngOnInit(): void {
    this.showCurrentLocations();
  }


  getRouteData(): void {
    let API_KEY: string = this.Key.getKey();
    this.Location.fetchLocation(API_KEY,this.objectId, new Date(this.dateSelected)).then(data => {
      if (data.response){
        this.Location.saveRoute(data.response);
      }
    }).catch((err: HttpErrorResponse) => {
      if(err.status === 403){
        console.error("Wrong API key");
      }
      return null;
    }).then(() => this.showRoute());
  }

  showRoute(){
    let RouteFetched: [LocationData] = this.Location.getRoute();
    if (RouteFetched != undefined) {
      if (RouteFetched.length > 0) {
        this.route = this.transformLocationArray(RouteFetched);
        this.makeStops();
      } else {
        this.shortestPath = 0;
        this.stopCount = 0;
        return;
      }
    }
    this.generateJourneyInfo();
    this.sendDataToMap(this.route, this.markers);
    this.showJourney = true;
  }

  makeStops(): void{
    /*
    Function that finds intervals, where speed is 0 and takes the first points coordinate as a stop.
    First, because if the speed is still 0, but coordinates continue to change a bit, that could be GPS floating.
     */
    let stops: Array<MapInterface> = [];
    let reset = true;
    this.route.forEach(function(point){
      if (reset){
        if (point.speed === 0){
          stops.push(point);
          reset = false;
        }
      } else if (point.speed > 0) {
        reset = true;
      }
    });
    this.markers = stops;
    this.getShortestRoute(this.markers);
    this.Location.saveStops(stops);
  }

  getShortestRoute(coordinates: Array<MapInterface>): void{
    this.Distance.fetchDistance(coordinates).then((data) => {
      if (data.success) {
        this.shortestPath = Number((data.distance/1000).toFixed(2));
        return;
      } else {
        this.shortestPath = 0;
        return;
      }
    })
  }

  generateJourneyInfo(): void{
    let route: [LocationData] = this.Location.getRoute();
    if(this.route?.length === 0) {
      this.clearMap();
      return;
    }
    if (route.length > 0){
      this.distanceDriven = Number((route[route.length-1].Distance - route[0].Distance).toFixed(2));
    }
    if (route[0]?.Distance === undefined) {
      /*
      If the distance is undefined, the API does not provide with data from cars odometer.
      In this case I use geolib to calculate the distance driven by coordinates.
       */
      let stopsForDistance = route.map(function(stop){
        return {longitude: stop.Longitude, latitude: stop.Latitude};
      })
      this.distanceDriven = Number((getPathLength(stopsForDistance)/1000).toFixed(2));
    }
    this.stopCount = this.markers?.length;
  }

  showCurrentLocations(): void{
    this.showJourney = false;
    this.clearMap();
    this.markers = this.Fleet.getFleet().map(function(car) {
      return {latitude: car.latitude, longitude: car.longitude, name: car.objectName};
    })
    this.sendDataToMap(null, this.markers);
  }

  sendDataToMap(route: Array<MapInterface>, markers: Array<MapInterface>): void{
    let mapData: MapDataInterface = {
      route: route,
      markers: markers
    }
    this.OnSelect.emit(mapData); // Emits data to map component
  }

  onSubmit(){
    this.dateSelected = this.dateForm.get('date').value;
    this.getRouteData();
  }

  transformLocationArray(data: [LocationData]): Array<MapInterface>{
    return data.map(function(line){
      let speed;
      if (line.Speed == null) {
        speed = 0;
      } else {
        speed = Number(line.Speed)
      }
      return {longitude: line.Longitude, latitude: line.Latitude, speed: speed};
    })
  }

  clearMap(): void{
    this.route = null;
    this.markers = null;
    this.stopCount = 0;
    this.distanceDriven = 0;
    this.sendDataToMap(this.route, this.markers);
  }

}
