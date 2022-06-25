import { Component, OnInit } from '@angular/core';
import { Mission } from '../mission';
import { Missions } from '../mockMissions';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css'],
})
export class MissionsComponent implements OnInit {
  constructor() {}

  missions = Missions;
  selectedMission?: Mission;
  onSelect(mission: Mission): void {
    this.selectedMission = mission;
  }

  ngOnInit(): void {
    null;
  }
}
