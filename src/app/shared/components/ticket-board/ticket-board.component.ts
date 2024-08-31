import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ticket-board',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, CdkDropList, CdkDrag, FontAwesomeModule],
  templateUrl: './ticket-board.component.html',
  styleUrl: './ticket-board.component.css'
})
export class TicketBoardComponent {
  isModalOpen = false;

  constructor(library: FaIconLibrary) {
    library.addIcons(
      faXmark,
      faTrashCan
    );
  }

  statuses = [
    { name: 'Creado', tickets: [
      {name:'Falla en Sistema ERP', tipoTicket:'Error', fecha:'29-Agosto-2024', estatus:'Creado', usuarioCreate: 'Gustavo Platas', sistema:'Supertiendas Rico', modulo:'Pagos', usuarioAsignado:null, fechaResolucion:null, comentarios:null}, 
      {name:'No guarda los pagos con tarjeta', tipoTicket:'Error', fecha:'22-Agosto-2024', estatus:'Creado', usuarioCreate: 'Sergio', sistema:'TopWings', modulo:'Punto de Venta', usuarioAsignado:null, fechaResolucion:null, comentarios:null}, 
      {name:'Agregar nuevo método de pago', tipoTicket:'Cambio', fecha:'23-Agosto-2024', estatus:'Creado', usuarioCreate: 'Sergio', sistema:'TopWings', modulo:'Punto de Venta', usuarioAsignado:null, fechaResolucion:null, comentarios:null}, 
    ]},
    { name: 'Asignado', tickets: [] },
    { name: 'En Tratamiento', tickets: [] },
    { name: 'Finalizado', tickets: [] }
  ];

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
    console.log(data)
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
