/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TableBookListComponent } from './table-book-list.component';

describe('TableBookListComponent', () => {
  let component: TableBookListComponent;
  let fixture: ComponentFixture<TableBookListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableBookListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
