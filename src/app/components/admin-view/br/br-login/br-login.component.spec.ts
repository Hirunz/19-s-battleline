import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrLoginComponent } from './br-login.component';

describe('BrLoginComponent', () => {
  let component: BrLoginComponent;
  let fixture: ComponentFixture<BrLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
