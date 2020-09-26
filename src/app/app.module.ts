import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { KeyComponent } from './components/key/key.component';
import { FleetComponent } from './components/fleet/fleet.component';
import { JourneyInfoComponent } from './components/journey-info/journey-info.component';
import { MapComponent } from './components/map/map.component';
import {KeyService} from './services/key.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FleetService} from './services/fleet.service';
import {LocationService} from './services/location.service';
import {TimeagoModule} from 'ngx-timeago';
import {AgmCoreModule} from '@agm/core';
import { SpeedPipe } from './pipes/speed.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    KeyComponent,
    FleetComponent,
    JourneyInfoComponent,
    MapComponent,
    SpeedPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    TimeagoModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  providers: [KeyService, FleetService, LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
