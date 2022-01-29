import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickersDetailsComponent } from './tickers-details.component';

describe('TickersDetailsComponent', () => {
  let component: TickersDetailsComponent;
  let fixture: ComponentFixture<TickersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TickersDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TickersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
