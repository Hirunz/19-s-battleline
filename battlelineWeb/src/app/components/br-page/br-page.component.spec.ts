import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrPageComponent } from './br-page.component';

describe('BrPageComponent', () => {
  let component: BrPageComponent;
  let fixture: ComponentFixture<BrPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
