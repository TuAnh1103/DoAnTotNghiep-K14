import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPostShareComponent } from './edit-post-share.component';

describe('EditPostShareComponent', () => {
  let component: EditPostShareComponent;
  let fixture: ComponentFixture<EditPostShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPostShareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPostShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
