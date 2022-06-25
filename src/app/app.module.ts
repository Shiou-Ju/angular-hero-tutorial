import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MissionsComponent } from './missions/missions.component';
import { MissionDetailComponent } from './mission-detail/mission-detail.component';

@NgModule({
  declarations: [AppComponent, MissionsComponent, MissionDetailComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
