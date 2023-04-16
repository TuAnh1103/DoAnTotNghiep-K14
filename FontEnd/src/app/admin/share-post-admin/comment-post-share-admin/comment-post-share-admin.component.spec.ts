import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentPostShareAdminComponent } from './comment-post-share-admin.component';

describe('CommentPostShareAdminComponent', () => {
  let component: CommentPostShareAdminComponent;
  let fixture: ComponentFixture<CommentPostShareAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentPostShareAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentPostShareAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
