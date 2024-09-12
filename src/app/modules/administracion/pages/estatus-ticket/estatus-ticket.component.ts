import { NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';

import { CustomTableComponent } from '@Component/Table';
import { SweetAlertService } from '@Service/SweetAlert';

import { EstatusTicketInsertRequest, EstatusTicketModel } from '@Models/StatusTickets';
import { EstatusTicketService } from '@Services';

@Component({
  selector: 'app-estatus-ticket',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CustomTableComponent],
  templateUrl: './estatus-ticket.component.html'
})
export class EstatusTicketComponent {
  constructor() {}
  private fb = inject(FormBuilder);
  private estatusTicketService = inject(EstatusTicketService);
  private sweetAlertService = inject(SweetAlertService);

  estatusList: EstatusTicketModel[] = [];
  form = this.fb.nonNullable.group({
    id: [0],
    nombre: ['', [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z ]*$')]],
    activo: [1, [Validators.required]]
  });

  ngOnInit(): void {
    this.getAllEstatus();
  }

  getAllEstatus(){
    this.estatusTicketService.getAllEstatusTickets().subscribe((data) => {
      this.estatusList = data.response;
    })
  }

  onSubmit(): void{
    if (this.form.valid) {
      const {id, nombre, activo} = this.form.getRawValue();
      
      const request: EstatusTicketInsertRequest = {
        Estatus_Nombre: nombre.trim(),
        Estatus_Activo: activo
      };

      const requestUpdate: EstatusTicketModel = {
        Estatus_Id : id,
        Estatus_Nombre: nombre.trim(),
        Estatus_Activo: activo
      };
      const serviceCall = id == 0 ?this.estatusTicketService.insertEstatusTicket(request):this.estatusTicketService.updateEstatusTicket(requestUpdate)
      serviceCall.subscribe({
          next: (res: any) => {
            this.resetForm();
            this.getAllEstatus();
          },
          error: (err: any) => {
            console.log(err);
          }
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  resetForm(){
    this.form.reset({
      id: 0,
      nombre: '',
      activo: 1
    });
  }

  editEstatus(data: EstatusTicketModel){
    this.form.patchValue({
      id: data.Estatus_Id,
      nombre: data.Estatus_Nombre,
      activo: data.Estatus_Activo
    })
  }

  deleteEstatus(Estatus_Id: number) {
    this.sweetAlertService.confirm({
      title: '¿Estás seguro que deseas eliminar permanentemente este estatus?',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.estatusTicketService.deleteEstatusTicket(Estatus_Id)
        .subscribe({
          next: (res) => {
            this.getAllEstatus();
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }
}
