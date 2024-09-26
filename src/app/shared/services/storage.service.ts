import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { bgImages } from '@Global/constants';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  readonly images = bgImages;
  public backgroundSource = new BehaviorSubject<string>(localStorage.getItem("background") || bgImages[0].src);
  background$ = this.backgroundSource.asObservable();

  setBackground(value: string) {
    localStorage.setItem("background", value);
    this.backgroundSource.next(value);
  }
}
