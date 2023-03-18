import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLikeComponent } from './page-like.component';

describe('PageLikeComponent', () => {
  let component: PageLikeComponent;
  let fixture: ComponentFixture<PageLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageLikeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
