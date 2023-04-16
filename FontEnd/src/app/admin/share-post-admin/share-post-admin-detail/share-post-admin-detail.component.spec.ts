import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharePostAdminDetailComponent } from './share-post-admin-detail.component';

describe('SharePostAdminDetailComponent', () => {
  let component: SharePostAdminDetailComponent;
  let fixture: ComponentFixture<SharePostAdminDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharePostAdminDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharePostAdminDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
