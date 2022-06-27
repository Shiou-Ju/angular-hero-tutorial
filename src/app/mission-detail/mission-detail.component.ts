import { Component, OnInit, Input } from '@angular/core';
import { Mission } from '../mission';

@Component({
  selector: 'app-mission-detail',
  templateUrl: './mission-detail.component.html',
  styleUrls: ['./mission-detail.component.css'],
})
export class MissionDetailComponent implements OnInit {
  constructor() {}

  @Input() selectedMission?: Mission;

  isFixedString = this.selectedMission?.isFixed ? '是' : '否';

  ngOnInit(): void {
    null;
  }
}
