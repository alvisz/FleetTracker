import { Component, OnInit } from '@angular/core';
import {FleetService} from '../../services/fleet.service';
import {KeyService} from '../../services/key.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MapInterface} from '../../interfaces/MapInterface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public alert:            boolean = true;
  public alertMsg:         string  = 'No API key provided';

  public vehicleSelected:  number;
  public journeySelected:  MapInterface;

  constructor(private Key: KeyService,
              public Fleet: FleetService) { }

  ngOnInit(): void {}

  async onKeySubmit(event: boolean){
    const API_KEY = this.Key.getKey();
    let fleetData = await this.Fleet.fetchFleet(API_KEY).then(data => {
      if (data.status === 0){
        return data;
      }
    }).catch((err: HttpErrorResponse) => {
      if(err.status === 403){
        this.alertMsg = "Wrong API key";
      }
      return null;
    })

    if (fleetData?.response){
      this.Fleet.setFleet(fleetData.response);
      if (event) this.alert = false;
    }
  }

  OnSelect(objectId: number){
    this.vehicleSelected = objectId;
  }

  carSelected(event: MapInterface){
    this.journeySelected = event;
  }


}
