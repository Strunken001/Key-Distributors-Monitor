import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchStockComponent } from './fetch-stock.component';

describe('FetchStockComponent', () => {
  let component: FetchStockComponent;
  let fixture: ComponentFixture<FetchStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
