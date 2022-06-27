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

  missions: Mission[] = [{ id: 1, name: 'asd', isFixed: false, unit: '12' }];
  selectedMission?: Mission;

  getMissions(): void {
    // this.missionService.getMissions().subscribe((missions) => {
    //   missions.forEach((mission) => {
    //     this.missions.push(mission);
    //   });
    // });
    this.missionService.getMissions().subscribe((missions) => {
      this.missions = missions;
      this.show = true;
      this.cdf.detectChanges();
    });

    // I also tried async way by simply fetch but it did not work
    // const serviceResult = await this.missionService.getMissions();
    // this.missions = serviceResult;
    // this.show = true;
    // this.cdf.detectChanges();
  }

  onSelect(mission: Mission): void {
    this.selectedMission = mission;
  }
}
