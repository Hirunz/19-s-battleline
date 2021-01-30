import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpPageComponent } from './mp-page.component';

describe('MpPageComponent', () => {
  let component: MpPageComponent;
  let fixture: ComponentFixture<MpPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
