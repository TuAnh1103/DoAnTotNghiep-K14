import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentPostNewsComponent } from './comment-post-news.component';

describe('CommentPostNewsComponent', () => {
  let component: CommentPostNewsComponent;
  let fixture: ComponentFixture<CommentPostNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentPostNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentPostNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
