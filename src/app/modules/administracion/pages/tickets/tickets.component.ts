import { NgIf, NgFor } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';

import { CustomTableComponent } from '@Component/Table';
import { SweetAlertService } from '@Service/SweetAlert';

import { TicketInsertRequest } from '@Models/Ticket';
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
  modulosList: ModuloModel[] = [];

  form = this.fb.nonNullable.group({
    id: [0],
    tipo: [1, [Validators.required]],
    sistema: [1, [Validators.required, Validators.maxLength(255)]],
    modulo: [1, [Validators.required]],
    descripcion: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.getSistemas();
    this.getModulos();

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

  onSubmit(): void{
    if (this.form.valid) {
      const { id, tipo, sistema, modulo, descripcion } = this.form.getRawValue();

      const request: TicketInsertRequest = {
        Usuario_Registra: 1,
        Ticket_Tipo: tipo,
        Modulo_Id: modulo,
        Ticket_Descripcion: descripcion,
        Ticket_Estatus: 1
      }

      console.log(request)
    }
  }
}
