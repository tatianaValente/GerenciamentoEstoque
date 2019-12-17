import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertConfirmationComponent } from './alert-confirmation.component';

describe('AlertConfirmationComponent', () => {
  let component: AlertConfirmationComponent;
  let fixture: ComponentFixture<AlertConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
