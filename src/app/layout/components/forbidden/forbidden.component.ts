import { Component, inject, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { images } from '@Constants';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [],
  templateUrl: './forbidden.component.html'
})
export class ForbiddenComponent {
  readonly images = images;

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: any) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.initializeTheme();
  }

  private initializeTheme(): void {
    if (this.isBrowser) {
      let savedTheme = localStorage.getItem('theme');
      document.body.classList.toggle('dark', savedTheme === 'dark');
    }
  }
}
