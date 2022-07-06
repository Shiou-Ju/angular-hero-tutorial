import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionSearchComponent } from './mission-search.component';

describe('MissionSearchComponent', () => {
  let component: MissionSearchComponent;
  let fixture: ComponentFixture<MissionSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MissionSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MissionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
