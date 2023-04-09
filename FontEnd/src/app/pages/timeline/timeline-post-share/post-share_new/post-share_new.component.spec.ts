/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostShare_newComponent } from './post-share_new.component';

describe('PostShare_newComponent', () => {
  let component: PostShare_newComponent;
  let fixture: ComponentFixture<PostShare_newComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostShare_newComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostShare_newComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
