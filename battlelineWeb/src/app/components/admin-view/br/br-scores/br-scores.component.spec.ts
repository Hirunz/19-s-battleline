import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrScoresComponent } from './br-scores.component';

describe('BrScoresComponent', () => {
  let component: BrScoresComponent;
  let fixture: ComponentFixture<BrScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrScoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
