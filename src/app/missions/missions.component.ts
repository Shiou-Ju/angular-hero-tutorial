import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
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
    private messageService: MessageService,
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
    this.messageService.add(`選擇任務 ${mission.name}`);
  }
}
