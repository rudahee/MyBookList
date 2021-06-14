/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SagaListComponent } from './saga-list.component';

describe('SagaListComponent', () => {
  let component: SagaListComponent;
  let fixture: ComponentFixture<SagaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SagaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SagaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
