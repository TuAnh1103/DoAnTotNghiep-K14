import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentPostDetailComponent } from './comment-post-detail.component';

describe('CommentPostDetailComponent', () => {
  let component: CommentPostDetailComponent;
  let fixture: ComponentFixture<CommentPostDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentPostDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentPostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
