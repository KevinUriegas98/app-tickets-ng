import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule, SizeProp } from '@fortawesome/angular-fontawesome';
import { faArrowRightArrowLeft, faBug, faCircleCheck, faClock, faFileExcel, faFileImage, faFilePdf, faFileWord, faPlus, faScrewdriverWrench, faTrashCan, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-icon-custom',  // Asegúrate de que este selector sea el mismo que el usado en el HTML
  standalone: true,
  imports: [FontAwesomeModule, NgClass],
  templateUrl: './icon-custom.component.html'
})
export class IconCustomComponent implements OnInit {
  @Input() typeIcon: string = "";
  @Input() value: any;
  @Input() sizeIcon: SizeProp  = "lg";

  icon: any = "";
  color: string = "";

  constructor(library: FaIconLibrary) {
    // Añadir los iconos al library
    library.addIcons(
      faXmark,
      faTrashCan,
      faBug,
      faArrowRightArrowLeft,
      faPlus,
      faUser,
      faScrewdriverWrench,
      faCircleCheck,
      faFileExcel,
      faFileWord,
      faFilePdf,
      faFileImage
    );
  }

  ngOnInit(): void {
    if (this.typeIcon === "file") {
      switch (this.value) {
        case "docx":
          this.icon = faFileWord;
          this.color = 'fileWord';
          break;
        case "xlsx":
          this.icon = faFileExcel;
          this.color = 'fileExcel';
          break;
        case "pdf":
          this.icon = faFilePdf;
          this.color = 'filePdf';
          break;
        case "jpg":
          this.icon = faFileImage;
          this.color = 'fileImage';
          break;
        default:
          this.icon = faFileImage;
          this.color = 'fileImage';
          break;
      }
    } else if(this.typeIcon === "close"){
      this.icon = faXmark;
    } else if(this.typeIcon === "user"){
      this.icon = faUser;
    } else if(this.typeIcon === "estatus"){
      switch (this.value) {
        case 1:
          this.icon = faPlus;
          this.color = 'estatusCreado';
          break;
        case 2:
          this.icon = faUser;
          this.color = 'estatusAsignado';
          break;
        case 3:
          this.icon = faScrewdriverWrench;
          this.color = 'estatusEnTratamiento';
          break;
        case 4:
          this.icon = faCircleCheck;
          this.color = 'estatusFinalizado';
          break;
      }
    } else if (this.typeIcon === "typeTicket"){
      switch (this.value) {
        case 1:
          this.icon = faBug;
          this.color = 'text-red-600 dark:text-red-400';
          break;
        case 2:
          this.icon = faArrowRightArrowLeft;
          this.color = 'text-blue-600 dark:text-blue-400';
          break;
      }
    } else if(this.typeIcon === "estatusTitle"){
      switch (this.value) {
        case 1:
          this.icon = faPlus;
          this.color = 'estatusCreadoIcon';
          break;
        case 2:
          this.icon = faUser;
          this.color = 'estatusAsignadoIcon';
          break;
        case 3:
          this.icon = faScrewdriverWrench;
          this.color = 'estatusEnTratamientoIcon';
          break;
        case 4:
          this.icon = faCircleCheck;
          this.color = 'estatusFinalizadoIcon';
          break;
      }
    } else {
      this.icon = faClock
    }
  }
}
