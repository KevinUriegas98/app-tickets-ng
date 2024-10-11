import { Component, inject, OnInit, PLATFORM_ID, Inject, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ModalSelectionComponent } from "@Component/ModalSelection";
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faFilePen, faRectangleList, faCircleUser, faRightFromBracket, faSun, faCircleInfo, faMoon, faChevronDown, faChevronUp, faPanorama, faChalkboard} from '@fortawesome/free-solid-svg-icons';
import { FooterComponent } from "../footer/footer.component";

import { images } from '@Constants';
import { TicketService } from '@Services';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule, FooterComponent, CommonModule, ModalSelectionComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  readonly images = images;
  private router = inject(Router);

  isModalOpen = false;

  isSidebarOpen = false;
  isTicketsDropdownOpen = true;
  isConfigurationDropdownOpen = false;
  userName: string = localStorage.getItem('nombrePersona')||'';
  userRole: string = localStorage.getItem('perfil') || '';
  savedTheme: any = "";
  private isBrowser: boolean;

  private ticketsService = inject(TicketService);
  ticketsCount = 0;

  constructor(library: FaIconLibrary, @Inject(PLATFORM_ID) platformId: any) {
    library.addIcons(
      faHome,
      faFilePen,
      faRectangleList,
      faCircleUser,
      faChevronDown,
      faChevronUp,
      faRightFromBracket,
      faSun,
      faCircleInfo,
      faMoon,
      faPanorama,
      faChalkboard
    );
    this.isBrowser = isPlatformBrowser(platformId);
    this.initializeTheme();
  }

  hasRole(roles: string[]): boolean {
    return roles.includes(this.userRole);
  }

  ngOnInit(): void {
    this.getTicketsCount();
  }

  getTicketsCount(): void{
    this.ticketsService.getTicketsEstatus().subscribe((data) => {
      this.ticketsCount = data.response.length;
    });
  }

  toggleDarkMode(): void {
    if (this.isBrowser) {
      const body = document.body;
      const isDarkMode = body.classList.contains('dark');
      body.classList.toggle('dark', !isDarkMode);
      localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
    }
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  private initializeTheme(): void {
    if (this.isBrowser) {
      this.savedTheme = localStorage.getItem('theme');
      document.body.classList.toggle('dark', this.savedTheme === 'dark');
    }
  }

  get icon(): string {
    return localStorage.getItem('theme') === 'dark' ? 'moon' : 'sun';
  }

  toggleSidebar():void{
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleTicketsDropdown(){
    this.isTicketsDropdownOpen = !this.isTicketsDropdownOpen;
  }

  toggleConfigurationDropdown(){
    this.isConfigurationDropdownOpen = !this.isConfigurationDropdownOpen;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  countTickets() {
    this
  }
}
