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

import { UsuarioService } from '@Services';
import { UsuarioModel } from '@Models/Usuario';
import { tick } from '@angular/core/testing';

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

  private usuarioService = inject(UsuarioService);
  usuariosList: UsuarioModel[] = [];

  formComentarios = this.fb.nonNullable.group({
    comentarios: ['',[Validators.required]],
  });

  formUsuarioAsignado = this.fb.nonNullable.group({
    usuarioAsignado: [0, [Validators.required]]
  })

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(){
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuariosList = data.response;
    })
  }

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

  ValidarModal(data:any){
    if(data.Estatus_Id == 3){
      if(this.userProfile == '1' && data.Usuario_Asignado_Id == Number(this.userId)){
        return true;
      }else{
        return false;
      }
    }
    else if(data.Estatus_Id == 1 || data.Estatus_Id == 2)
    {
      if(this.userProfile == '1' && (data.Usuario_Asignado_Id == Number(this.userId) || data.Usuario_Asignado_Id == 0))
      {
        return true;
      }
      {
        return false;
      }
    }
    else{
      return false;
    }
  }

  finalizarTicket(ticket:any, statusIndex: number = 4){

    if (this.formComentarios.valid) {
      const { comentarios } = this.formComentarios.getRawValue();
      ticket.Comentarios = comentarios;
      this.changeTicket.emit({data:ticket, statusIndex});
      this.closeModal();
    }
    else if (this.formUsuarioAsignado.valid)
    {
      this.getUsuarios();
      const {usuarioAsignado} = this.formUsuarioAsignado.getRawValue();
      ticket.Usuario_Asignado_Id = usuarioAsignado;
      console.log(usuarioAsignado)

      const usuario = this.usuariosList.find(u => u.Id === usuarioAsignado);
      console.log(usuario?.NombreUsuario)
      ticket.Usuario_Asignado = usuario?.NombreUsuario;
      statusIndex = 2;
      this.changeTicket.emit({data:ticket, statusIndex});
      this.closeModal();
    }
    else {
      this.formComentarios.markAllAsTouched();
    }
  }

  openModal(data:any) {
    this.ticket = data;
    this.formComentarios.patchValue({
      comentarios: data.Ticket_Comentarios
    });
    this.formUsuarioAsignado.patchValue({
      usuarioAsignado: data.Usuario_Asignado_Id
    });
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}