// node modules
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// local modules
import { Mission } from 'src/interfaces/Mission';
import { MessageService } from 'src/app/message.service';
import { MissionService, NewMissionFormData } from 'src/app/mission.service';

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

  getMissions(): void {
    this.missionService.getMissions().subscribe((missions) => {
      this.missions = missions;
      this.show = true;
      this.cdf.detectChanges();
    });
    this.messageService.add(`missions components: 任務列表載入`);
  }

  addMission(
    name: string,
    amount: string,
    unit: string,
    increment: string,
    missionIsFixed: string
  ): void {
    name = name.trim();
    amount = amount.trim();
    unit = unit.trim();
    // TODO:  show increment if not checked?
    increment = increment.trim();

    if (!name || !amount || !unit || !increment) {
      return;
    }

    const newMission: NewMissionFormData = {
      name,
      amount,
      unit,
      isFixed: missionIsFixed,
      increment,
    };

    this.missionService
      .addMission(newMission)
      .subscribe(async (mission) => this.missions.push(mission));

    // TODO:
    const message = JSON.stringify(newMission)
      .split(',')
      .join('\n\n')
      .replace('{', '')
      .replace('}', '');

    this.messageService.add(`missions components: 建立新任務 ${message}`);
  }
}
