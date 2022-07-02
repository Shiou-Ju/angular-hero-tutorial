// node modules
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// local modules
import { Mission } from 'src/interfaces/Mission';
import { MessageService } from 'src/app/message.service';
import { MissionService } from 'src/app/mission.service';

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
}
