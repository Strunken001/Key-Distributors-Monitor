import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditfacilityComponent } from './creditfacility.component';

describe('CreditfacilityComponent', () => {
  let component: CreditfacilityComponent;
  let fixture: ComponentFixture<CreditfacilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditfacilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditfacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
