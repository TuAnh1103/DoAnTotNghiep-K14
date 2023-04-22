/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WebSocketAPI } from './web-soket-api.service';

describe('Service: WebSocketAPI', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebSocketAPI]
    });
  });

  it('should ...', inject([WebSocketAPI], (service: WebSocketAPI) => {
    expect(service).toBeTruthy();
  }));
});
