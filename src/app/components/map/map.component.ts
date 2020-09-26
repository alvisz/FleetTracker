import {Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LocationService} from '../../services/location.service';
import {MapFleetInterface, MapLineInterface} from '../../interfaces/MapInterface';
import {LocationData} from '../../interfaces/LocationDataInterface';
import {KeyService} from '../../services/key.service';
import {FleetService} from '../../services/fleet.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnChanges {

  @Input('refresh') private refresh: boolean;

  public route:       Array<MapLineInterface>;
  public line:        any;
  public fleet:       Array<MapFleetInterface>;
  public stops:       Array<MapFleetInterface>;

  public centerLat:   number = 59.436962; // Tallinn coordinates
  public centerLon:   number = 24.753574;

  public showCurrent: boolean = false;


  constructor(private Location: LocationService,
              private Fleet: FleetService,
              private Key: KeyService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getRoute();
    this.getCurrentLocations();
  }

  getCurrentLocations(): void{
    this.fleet = this.Fleet.getFleet().map(function(car){
      return {latitude: car.latitude, longitude: car.longitude, name: car.objectName}
    })
  }

  makeStops(): void{
    /*
    Function that finds intervals, where speed is 0 and takes the first points coordinate as a stop.
    First, because if the speed is still 0, but coordinates continue to change a bit, that could be GPS floating.
     */
    let stops: Array<MapFleetInterface> = [];
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
    })
    this.stops = stops;
    this.Location.saveStops(stops);
  }




  getSpeedColor(speed: number): string {
    switch (true){
      case (speed <= 50):
        return '#1FD3FF'; // Blue
      case (speed > 50 && speed <= 90):
        return '#1FFF00'; // Green
      case (speed > 90):
        return '#FF0000' // Red a.k.a speeding
    }
  }

  getRoute(): void {
    let RouteFetched: [LocationData] = this.Location.getRoute();
    if (RouteFetched != undefined){
      if (RouteFetched.length > 0){
        this.route = this.transformLocationArray(RouteFetched);
        this.setMapCenter()
        this.makeStops();
      }
    }
  }

  setMapCenter(): void {
    this.centerLat = this.route[0].latitude;
    this.centerLon = this.route[0].longitude;
  }

  transformLocationArray(data: [LocationData]): Array<MapLineInterface>{
    return data.map(function(line){
      let speed;
      if (line.Speed == null) {
        speed = 0;
      } else {
        speed = Number(line.Speed)
      }
      return {longitude: line.Longitude, latitude: line.Latitude, speed: speed}
    })
  }

}
