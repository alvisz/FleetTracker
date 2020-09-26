import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FleetData} from '../../interfaces/FleetInterface';
import {FleetService} from '../../services/fleet.service';
import {KeyService} from '../../services/key.service';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.sass']
})
export class FleetComponent implements OnInit {

  @Output() OnSelect: EventEmitter<number> = new EventEmitter<number>()

  constructor(public Fleet: FleetService,
              public Key: KeyService) {
    this.fleetData = Fleet.getFleet();
  }

  fleetData: [FleetData];

  ngOnInit(): void {}

  onClick(objectId: number): void {
    this.OnSelect.emit(objectId)
  }

}
