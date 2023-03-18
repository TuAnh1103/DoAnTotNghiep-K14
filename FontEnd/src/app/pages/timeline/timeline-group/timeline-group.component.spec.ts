import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineGroupComponent } from './timeline-group.component';

describe('TimelineGroupComponent', () => {
  let component: TimelineGroupComponent;
  let fixture: ComponentFixture<TimelineGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
