import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressAdminComponent } from './address-admin.component';

describe('AddressAdminComponent', () => {
  let component: AddressAdminComponent;
  let fixture: ComponentFixture<AddressAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
