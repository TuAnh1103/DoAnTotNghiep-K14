import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdetailViewComponent } from './userdetail-view.component';

describe('UserdetailViewComponent', () => {
  let component: UserdetailViewComponent;
  let fixture: ComponentFixture<UserdetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserdetailViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserdetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
