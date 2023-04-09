/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserPostShareComponent } from './user-post-share.component';

describe('UserPostShareComponent', () => {
  let component: UserPostShareComponent;
  let fixture: ComponentFixture<UserPostShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPostShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPostShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
