import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterMetaComponent } from './center-meta.component';

describe('CenterMetaComponent', () => {
  let component: CenterMetaComponent;
  let fixture: ComponentFixture<CenterMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterMetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CenterMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
