import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '@Environment';

import { TicketEstatusModel } from '@Models/Ticket';
import { IconCustomComponent } from "@Component/IconCustom";

@Component({
  selector: 'app-ticket-board',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, CdkDropList, CdkDrag, IconCustomComponent, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './ticket-board.component.html',
  styleUrl: './ticket-board.component.css'
})
export class TicketBoardComponent {
  @Input() data: any[] = [];
  @Output() changeTicket: EventEmitter<any> = new EventEmitter();

  private fb = inject(FormBuilder);
  userId = localStorage.getItem('idUsuario');
  
  isModalOpen = false;
  ticket!: TicketEstatusModel;
  userProfile = localStorage.getItem('idPerfil');
  environment: any = environment.url;

  constructor() {}
  
  form = this.fb.nonNullable.group({
    comentarios: ['',[Validators.required]]
  });

  getConnectedDropListIds(index: number): string[] {
    return this.data.map((_, index) => `cdk-drop-list-${index}`);
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
      this.changeTicket.emit({data:event.item.data, statusIndex})
    }
  }

  ValidarTicket(data:any) {
    if(this.userProfile == '1'){ //Los tickets solo pueden moverlos los admin, los usuarios no.
      if(data.Estatus_Id == 1){
        return false;
      }else if(data.Estatus_Id == 4){
        return true;
      }
      else{
        if(data.Usuario_Asignado_Id == Number(this.userId)){ //Los tickets solo se puede mover por el usuario asignado/responsable del ticket.
          return false;
        }else{
          return true;
        }
      }
    }else{
      return true;
    }
  }

  finalizarTicket(ticket:any, statusIndex: number = 4){
    if (this.form.valid) {
      const { comentarios } = this.form.getRawValue();
      ticket.Comentarios = comentarios;
      this.changeTicket.emit({data:ticket, statusIndex});
      this.closeModal();
    } else {
      this.form.markAllAsTouched();
    }
  }

  openModal(data:any) {
    this.ticket = data;
    this.form.patchValue({
      comentarios: data.Ticket_Comentarios
    });
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}