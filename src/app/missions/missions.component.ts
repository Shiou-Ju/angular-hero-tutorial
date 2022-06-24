import { Component, OnInit } from '@angular/core';
import { Mission } from '../mission';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css'],
})
export class MissionsComponent implements OnInit {
  constructor() {}

  mission: Mission = {
    id: 1,
    name: '伏地挺身',
  };

  ngOnInit(): void {}
}
