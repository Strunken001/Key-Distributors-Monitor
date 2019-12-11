import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitystatsComponent } from './facilitystats.component';

describe('FacilitystatsComponent', () => {
  let component: FacilitystatsComponent;
  let fixture: ComponentFixture<FacilitystatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilitystatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitystatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
