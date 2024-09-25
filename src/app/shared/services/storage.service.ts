import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { images } from '@Global/constants';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  readonly images = images;
  public backgroundSource = new BehaviorSubject<string>(localStorage.getItem("background") || images.background1);
  background$ = this.backgroundSource.asObservable();

  setBackground(value: string) {
    localStorage.setItem("background", value);
    this.backgroundSource.next(value);
  }
}
