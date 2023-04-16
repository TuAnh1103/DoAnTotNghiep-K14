import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteAdminComponent } from './favorite-admin.component';

describe('FavoriteAdminComponent', () => {
  let component: FavoriteAdminComponent;
  let fixture: ComponentFixture<FavoriteAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
