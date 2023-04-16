import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostShareListComponent } from './post-share-list.component';

describe('PostShareListComponent', () => {
  let component: PostShareListComponent;
  let fixture: ComponentFixture<PostShareListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostShareListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostShareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
