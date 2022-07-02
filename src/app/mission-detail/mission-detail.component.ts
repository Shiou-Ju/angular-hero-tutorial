// node modules
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
// local modules
import { Mission } from 'src/interfaces/Mission';
import { MissionService } from 'src/app/mission.service';

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

  // isFixedString: displayedMission['isFixedString'] =
  //   // TODO: 因為大小寫的關係，所以這邊的 value 不是單純 mission 的 value
  //   this.selectedMission?.isfixed ? '是' : '否';

  ngOnInit(): void {
    this.getMission();
  }

  getMission(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.missionService
      .getMission(id)
      .subscribe((mission) => (this.selectedMission = mission));
  }

  goBack(): void {
    this.location.back();
  }

  update(): void {
    if (!!this.selectedMission) {
      const newMission: Mission = {
        ...this.selectedMission,
        // isFixedString: this.isFixedString,
      };
      this.missionService
        .updateMission(newMission)
        .subscribe(() => this.goBack());
    }
  }
}
