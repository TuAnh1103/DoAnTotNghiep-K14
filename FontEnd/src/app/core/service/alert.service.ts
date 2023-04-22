import { Injectable } from '@angular/core';
import { Alert } from '../models/alert';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public alerts:Subject<Alert>=new Subject();
  constructor() { }
}
