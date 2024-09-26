import { NgIf, NgFor } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
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
  @ViewChild('fileInput') fileInput!: ElementRef;

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
  selectedFiles: File[] = []; // Almacenar archivos seleccionados


  form = this.fb.nonNullable.group({
    id: [0],
    tipo: [0,[Validators.required, Validators.min(1)]],
    sistema: [0, [Validators.required, Validators.min(1)]],
    modulo: [0, [Validators.required, Validators.min(1)]],
    titulo: ['', [Validators.required, Validators.maxLength(50)]],
    descripcion: ['', [Validators.required, Validators.maxLength(255)]],
    comentarios: ['']
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
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files); // Guardar los archivos seleccionados
    }
  }

  getFormValidationErrors() {
    const errors: string[] = [];
  
    Object.keys(this.form.controls).forEach(key => {
      const controlErrors = this.form.get(key)?.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(errorKey => {
          errors.push(`${key}: ${errorKey}`);
        });
      }
    });
  
    return errors;
  }
  

  onSubmit(): void{
    console.log(this.form.valid)
    console.log(this.getFormValidationErrors());
    if (this.form.valid) {
      const { id, tipo, sistema, modulo, descripcion, titulo } = this.form.getRawValue();
      const usuarioRegistra = parseInt(localStorage.getItem('idUsuario')??'0')

      const formData = new FormData();
      formData.append('Usuario_Registra', usuarioRegistra.toString());
      formData.append('Ticket_Tipo', tipo.toString());
      formData.append('Modulo_Id', modulo.toString());
      formData.append('Ticket_Descripcion', descripcion.trim());
      // formData.append('Ticket_Comentarios', comentarios.trim());
      formData.append('Ticket_Titulo', titulo);
      formData.append('Ticket_Estatus', '1');

      // Agregar archivos seleccionados al FormData
      this.selectedFiles.forEach((file, index) => {
        formData.append('Ticket_Archivos', file); 
      });
      
      console.log(this.selectedFiles);
      

      console.log(formData);
      
      const request: TicketInsertRequest = {
        Usuario_Registra: usuarioRegistra,
        Ticket_Tipo: tipo,
        Modulo_Id: modulo,
        Ticket_Descripcion: descripcion.trim(),
        Ticket_Comentarios: "",
        Ticket_Titulo: titulo,
        Ticket_Estatus: 1
      }

      const requestUpdate: TicketUpdateRequest = {
        Ticket_Id: id,
        Ticket_Tipo: tipo,
        Modulo_Id: modulo,
        Ticket_Descripcion: descripcion.trim(),
        Ticket_Comentarios: "",
        Ticket_Estatus: 1,
        Ticket_Titulo: titulo,
        Usuario_Registra: usuarioRegistra,
        Usuario_Asignado:0
      }

      this.resetForm();
      const serviceCall = id === 0 ?this.ticketService.insertTicket(formData):this.ticketService.updateTicket(requestUpdate);
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
    this.selectedFiles = [];
    this.fileInput.nativeElement.value = '';
  }
}
