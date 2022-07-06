import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Mission } from 'src/interfaces/Mission';
import { MissionService } from '../mission.service';

@Component({
  selector: 'app-mission-search',
  templateUrl: './mission-search.component.html',
  styleUrls: ['./mission-search.component.css'],
})
export class MissionSearchComponent implements OnInit {
  // use 'asyncPipe' to subscribe in template
  missions$!: Observable<Mission[]>;
  private searchTerms = new Subject<string>();

  constructor(private missionService: MissionService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.missions$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.missionService.searchMissions(term))
    );
  }
}
