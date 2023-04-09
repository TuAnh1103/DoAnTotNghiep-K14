import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentPostShareComponent } from './comment-post-share.component';

describe('CommentPostShareComponent', () => {
  let component: CommentPostShareComponent;
  let fixture: ComponentFixture<CommentPostShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentPostShareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentPostShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
