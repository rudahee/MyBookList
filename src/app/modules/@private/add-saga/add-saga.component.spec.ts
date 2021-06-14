/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddSagaComponent } from './add-saga.component';

describe('AddSagaComponent', () => {
  let component: AddSagaComponent;
  let fixture: ComponentFixture<AddSagaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSagaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
