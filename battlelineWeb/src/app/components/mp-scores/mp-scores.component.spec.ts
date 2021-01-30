import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpScoresComponent } from './mp-scores.component';

describe('MpScoresComponent', () => {
  let component: MpScoresComponent;
  let fixture: ComponentFixture<MpScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpScoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
