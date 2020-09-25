import { Component, OnInit } from '@angular/core';
import {FleetData} from '../interfaces/FleetInterface';
import {FleetService} from '../services/fleet.service';
import {KeyService} from '../services/key.service';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.sass']
})
export class FleetComponent implements OnInit {

  constructor(public Fleet: FleetService,
              public Key: KeyService) {
    this.fleetData = Fleet.getFleet();
  }

  fleetData: [FleetData];

  ngOnInit(): void {}

}
