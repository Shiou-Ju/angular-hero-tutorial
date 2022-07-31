// node modules
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// local modules
import { MessageService } from 'src/app/message.service';
import { MissionService, NewMissionFormData } from 'src/app/mission.service';

@Component({
  selector: 'app-new-mission',
  templateUrl: './new-mission.component.html',
  styleUrls: ['./new-mission.component.css'],
})
export class NewMissionComponent implements OnInit {
  constructor(
    private missionService: MissionService,
    private messageService: MessageService,
    private cdf: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    null;
  }

  addMission(
    name: string,
    amount: string,
    unit: string,
    increment: string,
    missionIsFixed: string
  ): void {
    console.log(`tri`);

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
      .subscribe(async (mission) => console.log(mission));

    // TODO:
    const message = JSON.stringify(newMission)
      .split(',')
      .join('\n\n')
      .replace('{', '')
      .replace('}', '');

    this.messageService.add(`missions components: 建立新任務 ${message}`);
  }
}
