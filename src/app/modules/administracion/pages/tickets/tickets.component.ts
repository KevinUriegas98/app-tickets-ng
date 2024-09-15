import { NgIf, NgFor } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { forkJoin } from 'rxjs';

import { CustomTableComponent } from '@Component/Table';
import { SweetAlertService } from '@Service/SweetAlert';
import { TicketEstatusModel, TicketInsertRequest, TicketUpdateRequest } from '@Models/Ticket';
import { TicketService, TipoService, SistemaService, ModuloService } from '@Services';

import { SistemaModel } from '@Models/Sistema';
import { ModuloModel } from '@Models/Modulo';
import { TipoTicketModel } from '@Models/Tipo';

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
  private tipoService = inject(TipoService);
  private sweetAlertService = inject(SweetAlertService);

  sistemasList: SistemaModel[] = [];
  modulosBySistema: ModuloModel[] = [];
  modulosList: ModuloModel[] = [];
  tiposList: TipoTicketModel[] = [];
  ticketsList:TicketEstatusModel[] = [];


  form = this.fb.nonNullable.group({
    id: [0],
    tipo: [0,[Validators.required, Validators.min(1)]],
    sistema: [0, [Validators.required, Validators.min(1)]],
    modulo: [0, [Validators.required, Validators.min(1)]],
    titulo: ['', [Validators.required, Validators.maxLength(50)]],
    descripcion: ['', [Validators.required, Validators.maxLength(55)]],
    comentarios: ['', [Validators.required, Validators.maxLength(255)]]
  });

  ngOnInit(): void {
    this.getTipos();
    this.getSistemasModulos();
    this.getTickets();
  }

  getTickets()
  {
    this.ticketService.getTicketsEstatus().subscribe((data) => {
      this.ticketsList = data.response;
    });
  }
  getTipos() {
    this.tipoService.getAllTipos().subscribe((data) => {
      this.tiposList = data.response;
    })
  }
  getSistemasModulos(){
    forkJoin({
      sistemas: this.sistemaService.getAllSistemas(),
      modulos: this.moduloService.getAllModulos()
    }).subscribe(({sistemas, modulos})=>{
      this.sistemasList = sistemas.response;
      this.modulosList = modulos.response;
    });
  }

  filterModulos(event: Event) {
    const Sistema_Id = +(event.target as HTMLSelectElement).value;
    this.modulosBySistema = this.modulosList.filter(modulo => modulo.Sistema_Id == Sistema_Id);
    this.form.controls['modulo'].setValue(this.modulosBySistema.length > 0 ? this.modulosBySistema[0].Modulo_Id : 0)
  }
  
  onSubmit(): void{
    if (this.form.valid) {
      const { id, tipo, sistema, modulo, descripcion, comentarios, titulo } = this.form.getRawValue();
      const usuarioRegistra = parseInt(localStorage.getItem('idUsuario')??'0')
      const request: TicketInsertRequest = {
        Usuario_Registra: usuarioRegistra,
        Ticket_Tipo: tipo,
        Modulo_Id: modulo,
        Ticket_Descripcion: descripcion.trim(),
        Ticket_Comentarios: comentarios.trim(),
        Ticket_Titulo: titulo,
        Ticket_Estatus: 1
      }

      const requestUpdate: TicketUpdateRequest = {
        Ticket_Id: id,
        Ticket_Tipo: tipo,
        Modulo_Id: modulo,
        Ticket_Descripcion: descripcion.trim(),
        Ticket_Comentarios: comentarios.trim(),
        Ticket_Estatus: 1,
        Ticket_Titulo: titulo,
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

    const tipo = this.tiposList.find(tipo => tipo.Tipo_Nombre === data.Tipo_Ticket_Nombre);
    const tipoId = tipo ? tipo.Tipo_Id : 0;


    this.form.patchValue({
      id: data.Ticket_Id,
      tipo: tipoId,
      sistema: sistemaId,
      descripcion: data.Ticket_Descripcion
    })

    this.modulosBySistema = this.modulosList.filter(modulo => modulo.Sistema_Id === sistemaId);
    const modulo = this.modulosBySistema.find(modulo => modulo.Modulo_Nombre === data.Modulo_Nombre);
    const moduloId = modulo ? modulo?.Modulo_Id : 0;
    this.form.patchValue({
      modulo:moduloId
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
