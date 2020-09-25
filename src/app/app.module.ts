import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { KeyComponent } from './key/key.component';
import { FleetComponent } from './fleet/fleet.component';
import { JourneyInfoComponent } from './journey-info/journey-info.component';
import { MapComponent } from './map/map.component';
import {KeyService} from './services/key.service';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FleetService} from './services/fleet.service';
import {LocationService} from './services/location.service';
import {TimeagoModule} from 'ngx-timeago';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    KeyComponent,
    FleetComponent,
    JourneyInfoComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    TimeagoModule.forRoot()
  ],
  providers: [KeyService, FleetService, LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
