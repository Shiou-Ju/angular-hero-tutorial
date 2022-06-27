import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Mission } from '../mission';
import { MissionService } from '../mission.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css'],
})
export class MissionsComponent implements OnInit {
  show = false;
  constructor(
    private missionService: MissionService,
    private cdf: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getMissions();
  }

  missions: Mission[] = [];
  selectedMission?: Mission;

  getMissions(): void {
    this.missionService.getMissions().subscribe((missions) => {
      this.missions = missions;
      this.show = true;
      this.cdf.detectChanges();
    });
  }

  onSelect(mission: Mission): void {
    this.selectedMission = mission;
  }
}
