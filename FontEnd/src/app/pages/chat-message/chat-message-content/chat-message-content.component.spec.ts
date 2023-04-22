import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageContentComponent } from './chat-message-content.component';

describe('ChatMessageContentComponent', () => {
  let component: ChatMessageContentComponent;
  let fixture: ComponentFixture<ChatMessageContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatMessageContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatMessageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
