import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableOrdersComponent } from './available-orders.component';

describe('AvailableOrdersComponent', () => {
  let component: AvailableOrdersComponent;
  let fixture: ComponentFixture<AvailableOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
