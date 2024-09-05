import { NgIf, NgFor } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';

import { CustomTableComponent } from '@Component/Table';
import { SweetAlertService } from '@Service/SweetAlert';

import { TicketEstatusModel, TicketInsertRequest, TicketUpdateRequest } from '@Models/Ticket';
import { TicketService } from '@Services';

import { SistemaService } from '@Services';
import { SistemaModel } from '@Models/Sistema';

import { ModuloService } from '@Services';
import { ModuloModel } from '@Models/Modulo';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf,NgFor, CustomTableComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {
  constructor() { }
  private fb = inject(FormBuilder);
  private ticketService = inject(TicketService);
  private sistemaService = inject(SistemaService);
  private moduloService = inject(ModuloService);
  private sweetAlertService = inject(SweetAlertService);

  sistemasList: SistemaModel[] = [];
  modulosBySistema: ModuloModel[] = [];
  modulosList: ModuloModel[] = [];

  ticketsList:TicketEstatusModel[] = [];


  form = this.fb.nonNullable.group({
    id: [0],
    tipo: [0,[Validators.required, Validators.min(1)]],
    sistema: [0, [Validators.required, Validators.min(1)]],
    modulo: [0, [Validators.required, Validators.min(1)]],
    descripcion: ['', [Validators.required, Validators.maxLength(255)]]
  });

  ngOnInit(): void {
    this.getSistemas();
    this.getModulos();
    this.getTickets();
  }

  getTickets()
  {
    this.ticketService.getTicketsEstatus().subscribe((data) => {
      this.ticketsList = data.response;
    });
  }

  getSistemas() {
    this.sistemaService.getAllSistemas().subscribe((data) => {
      this.sistemasList = data.response;
    });
  }

  getModulos() {
    this.moduloService.getAllModulos().subscribe((data) => {
      this.modulosList = data.response;
    });
  }

  filterModulos(event: Event) {
    const Sistema_Id = +(event.target as HTMLSelectElement).value;

    this.modulosBySistema = this.modulosList.filter(modulo => modulo.Sistema_Id == Sistema_Id);
    if (this.modulosList.length > 0) {
      this.form.controls['modulo'].setValue(this.modulosList[0].Modulo_Id);
    } else {
      this.form.controls['modulo'].setValue(0);
    }
  }
  
  onSubmit(): void{
    if (this.form.valid) {
      const { id, tipo, sistema, modulo, descripcion } = this.form.getRawValue();
      const usuarioRegistra = parseInt(localStorage.getItem('idUsuario')??'0')
      const request: TicketInsertRequest = {
        Usuario_Registra: 1,
        Ticket_Tipo: tipo,
        Modulo_Id: modulo,
        Ticket_Descripcion: descripcion.trim(),
        Ticket_Estatus: 1
      }

      const requestUpdate: TicketUpdateRequest = {
        Ticket_Id: id,
        Ticket_Tipo: tipo,
        Modulo_Id: modulo,
        Ticket_Descripcion: descripcion.trim(),
        Ticket_Estatus: 1,
        Usuario_Registra: usuarioRegistra
      }

      this.resetForm();
      const serviceCall = id === 0 ?this.ticketService.insertTicket(request):this.ticketService.updateTicket(requestUpdate);
      serviceCall.subscribe({
          next: (res: any) => {
            this.resetForm();
            this.getTickets();
          },
          error: (err: any) => {
            console.log(err);
          }
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  editTicket(data: TicketEstatusModel)
  {
    const sistema = this.sistemasList.find(sistema => sistema.Sistema_Nombre === data.Sistema_Nombre);
    const sistemaId = sistema ? sistema.Sistema_Id : 0;

    const modulo = this.modulosBySistema.find(modulo => modulo.Modulo_Nombre === data.Modulo_Nombre);
    const moduloId = modulo ? modulo.Modulo_Id : 0;

    this.form.patchValue({
      id: data.Ticket_Id,
      sistema: sistemaId,
      modulo: moduloId,
      descripcion: data.Ticket_Descripcion
    })
  }

  deleteTicket(Ticket_Id: number)
  {
    this.sweetAlertService.confirm({
      title: '¿Estas seguro que deseas eliminar permanentemente este ticket?',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ticketService.deleteTicket(Ticket_Id)
          .subscribe({
            next: (res) => {
              this.getTickets();
            },
            error: (err) => {
              console.log(err);
            }
          });
      }
    });     }

  resetForm() {
    this.form.reset({
      id: 0,
      tipo: 0,
      sistema: 0,
      modulo: 0,
      descripcion: '',
    });
  }
}
