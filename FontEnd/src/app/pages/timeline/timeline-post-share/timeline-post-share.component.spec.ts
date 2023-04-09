/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TimelinePostShareComponent } from './timeline-post-share.component';

describe('TimelinePostShareComponent', () => {
  let component: TimelinePostShareComponent;
  let fixture: ComponentFixture<TimelinePostShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelinePostShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinePostShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
