import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharePostAdminComponent } from './share-post-admin.component';

describe('SharePostAdminComponent', () => {
  let component: SharePostAdminComponent;
  let fixture: ComponentFixture<SharePostAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharePostAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharePostAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
