import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenRecoveryComponent } from './authen-recovery.component';

describe('AuthenRecoveryComponent', () => {
  let component: AuthenRecoveryComponent;
  let fixture: ComponentFixture<AuthenRecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenRecoveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
