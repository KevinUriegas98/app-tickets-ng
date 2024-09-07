import { Component, inject } from '@angular/core';

import { EstatusTicketService } from '@Services';
import { EstatusTicketModel } from '@Models/StatusTickets';
import { TicketService } from '@Services';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightArrowLeft, faBug, faCircleCheck, faFileExcel, faFileImage, faFilePdf, faFileWord, faPlus, faScrewdriverWrench, faTrashCan, faUser, faUserTag, faXmark } from '@fortawesome/free-solid-svg-icons';
import { TicketEstatusModel } from '@Models/Ticket';

@Component({
  selector: 'app-ticket-board',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, CdkDropList, CdkDrag, FontAwesomeModule],
  templateUrl: './ticket-board.component.html',
  styleUrl: './ticket-board.component.css'
})
export class TicketBoardComponent {
  isModalOpen = false;
  ticket!: TicketEstatusModel;
  

  constructor(library: FaIconLibrary) {
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

  private estatusTicketService = inject(EstatusTicketService);
  private ticketService = inject(TicketService);
  estatusList: EstatusTicketModel[] = [];
  ticketsList: TicketEstatusModel[] = [];
  statuses: any[] = []
  
  ngOnInit() {
    this.getTickets();
    this.getEstatus();
  }

  // statuses = [
  //   { id: 1, name: 'Creado', tickets: [
  //     {Ticket_Id: 1, Ticket_Descripcion: 'Falla en Sistema ERP', Tipo_Ticket_Id: 1, Tipo_Ticket_Nombre: 'Error', Ticket_Fecha: '29-Agosto-2024', Estatus_Id: 1, Estatus_Nombre: 'Creado', Usuario_Registra: 'Gustavo Platas', Usuario_Asignado: '', Comentarios: '', Adjuntos:[{FileName:'captura_de_Pantalla.jpg', Format:'jpg'}]},
  //   ]},
  //   { id: 2, name: 'Asignado', tickets: [
  //     {Ticket_Id: 3, Ticket_Descripcion: 'Agregar nuevo método de pago', Tipo_Ticket_Id: 2, Tipo_Ticket_Nombre: 'Cambio', Ticket_Fecha: '23-Agosto-2024', Estatus_Id: 2, Estatus_Nombre: 'Asignado', Usuario_Registra: 'Sergio', Usuario_Asignado: 'Kevin Uriegas', Comentarios: '', Adjuntos:[{FileName:'DocumentoWord.docx', Format:'docx'}]},
  //   ]},
  //   { id: 3, name: 'En Tratamiento', tickets: [
  //     {Ticket_Id: 2, Ticket_Descripcion: 'No guarda los pagos con tarjeta', Tipo_Ticket_Id: 1, Tipo_Ticket_Nombre: 'Error', Ticket_Fecha: '22-Agosto-2024', Estatus_Id: 3, Estatus_Nombre: 'En Tratamiento', Usuario_Registra: 'Sergio', Usuario_Asignado: 'Sebastian Villarreal', Comentarios: '', Adjuntos:[{FileName:'DocumentoExcel.docx', Format:'xlsx'}]},
  //   ]},
  //   { id: 4, name: 'Finalizado', tickets: [
  //     {Ticket_Id: 5, Ticket_Descripcion: 'No se genera el reporte de pagos', Tipo_Ticket_Id: 1, Tipo_Ticket_Nombre: 'Error', Ticket_Fecha: '25-Agosto-2024', Estatus_Id: 4, Estatus_Nombre: 'Finalizado', Usuario_Registra: 'Isaias', Usuario_Asignado: 'Gustavo Platas', Comentarios: 'Se corrigió el error al momento de generar el reporte, por favor intente de nuevo', Adjuntos:[{FileName:'DocumentoPdf.pdf', Format:'pdf'}]},
  //   ]}
  // ];

  getEstatus() {
    this.estatusTicketService.getAllEstatusTickets().subscribe((data) => {
      this.estatusList = data.response;
      
      this.statuses = this.estatusList.map((estatus) => ({
        id: estatus.Estatus_Id,
        name: estatus.Estatus_Nombre,
        tickets: this.ticketsList.filter((ticket)  => ticket.Estatus_Nombre === estatus.Estatus_Nombre)
      }));
    })
  }

  getTickets() {
    this.ticketService.getTicketsEstatus().subscribe((data) => {
      this.ticketsList = data.response;
    })
  }
  getConnectedDropListIds(index: number): string[] {
    return this.statuses.map((_, idx) => `cdk-drop-list-${idx}`);
  }

  drop(event: CdkDragDrop<any[]>, statusIndex: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  openModal(data:any) {
    this.ticket = data;
    console.log(this.ticket);
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}