// node modules
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
// local modules
import { Mission } from 'src/interfaces/Mission';
import { MissionService } from 'src/app/mission.service';

/** 前端顯示定量為「是」、「否」，非 boolean */
type isFixedString = '是' | '否';

@Component({
  selector: 'app-mission-detail',
  templateUrl: './mission-detail.component.html',
  styleUrls: ['./mission-detail.component.css'],
})
export class MissionDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private missionService: MissionService,
    private location: Location
  ) {}

  @Input() selectedMission?: Mission;

  // 預設為否以顯示增量
  isFixedString: isFixedString = '否';

  ngOnInit(): void {
    this.getMission();
  }

  getMission(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.missionService.getMission(id).subscribe((mission) => {
      this.selectedMission = mission;
      this.isFixedString = mission.isFixed ? '是' : '否';
    });
  }

  goBack(): void {
    this.location.back();
  }

  update(): void {
    if (!!this.selectedMission) {
      const newMission: Mission = {
        ...this.selectedMission,
        isFixed:
          this.isFixedString === '是'
            ? true
            : this.isFixedString === '否'
            ? false
            : false,
      };
      this.missionService
        .updateMission(newMission)
        .subscribe(() => this.goBack());
    }
  }
}
