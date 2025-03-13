import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStockReactiveComponent } from './create-stock-reactive.component';

describe('CreateStockReactiveComponent', () => {
  let component: CreateStockReactiveComponent;
  let fixture: ComponentFixture<CreateStockReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateStockReactiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStockReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
