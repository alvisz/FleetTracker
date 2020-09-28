import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MapDataInterface, MapInterface} from '../../interfaces/MapInterface';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnChanges {

  @Input('data')
  public data: MapDataInterface;

  public route:       Array<MapInterface> = null;
  public line:        any;
  public markers:     Array<MapInterface>;

  public centerLat:   number = 59.436962; // Tallinn coordinates
  public centerLon:   number = 24.753574;


  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.markers = this.data?.markers;
    this.setMapCenter();
    if (this.data.route == null) {
      this.route = null;
    }
    if (this.data?.route){
      this.markers[0].name = "Start";
      this.markers[this.markers.length-1].name = "Last stop";
      this.route = this.data?.route;
    }
  }

  getSpeedColor(speed: number): string {
    switch (true){
      case (speed <= 50):
        return '#1FD3FF'; // Blue
      case (speed > 50 && speed <= 90):
        return '#1FFF00'; // Green
      case (speed > 90):
        return '#ff0000' // Red a.k.a speeding
    }
  }

  setMapCenter(): void {
    if (this.route == null){
      this.centerLat = this.markers[0].latitude;
      this.centerLon = this.markers[0].longitude;
    } else {
      this.centerLat = this.route[0].latitude;
      this.centerLon = this.route[0].longitude;
    }
  }


}
