import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueAddEditComponent } from './estoque-add-edit.component';

describe('EstoqueAddEditComponent', () => {
  let component: EstoqueAddEditComponent;
  let fixture: ComponentFixture<EstoqueAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstoqueAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoqueAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
