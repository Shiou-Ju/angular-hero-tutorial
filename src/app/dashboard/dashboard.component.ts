// angular modules
import { Component, OnInit } from '@angular/core';
// local modules
import { Mission } from 'src/interfaces/Mission';
import { MissionService } from 'src/app/mission.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  missions: Mission[] = [];

  constructor(private missionService: MissionService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    // TODO: get 2-5th missions
    const startMissionIndex = 1;
    const endtMissionIndex = 5;

    this.missionService
      .getMissions()
      .subscribe(
        (missions) =>
          (this.missions = missions.slice(startMissionIndex, endtMissionIndex))
      );
  }
}
