/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UploadFilesService } from './upload-files.service';

describe('Service: UploadFiles', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadFilesService]
    });
  });

  it('should ...', inject([UploadFilesService], (service: UploadFilesService) => {
    expect(service).toBeTruthy();
  }));
});
