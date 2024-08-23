import { NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomTableComponent } from '@Component/Table';

import { EstatusTicketInsertRequest, EstatusTicketModel } from 'src/app/core/models/estatus-tickets';
import { EstatusTicketService } from 'src/app/core/services/estatus-ticket.service';

@Component({
  selector: 'app-estatus-ticket',
  standalone: true,
  imports: [ReactiveFormsModule,  NgIf,   CustomTableComponent],
  templateUrl: './estatus-ticket.component.html',
  styleUrl: './estatus-ticket.component.css'
})
export class EstatusTicketComponent {
  constructor(private toastr: ToastrService) {}
  private fb = inject(FormBuilder);
  private estatusTicketService = inject(EstatusTicketService);

  estatusList: EstatusTicketModel[] = [];

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z ]*$')]],
    activo: [1, [Validators.required]]
  });

  ngOnInit(): void {
    this.getAllEstatus();
  }

  getAllEstatus(){
    this.estatusTicketService.getAllEstatusTickets().subscribe((data) => {
      this.estatusList = data.response;
      console.log(this.estatusList);
    })
  }

  onSubmit(): void{
    console.log("here")
    if (this.form.valid) {
      const {nombre, activo} = this.form.getRawValue();
      const request: EstatusTicketInsertRequest = {
        Estatus_Nombre: nombre.trim(),
        Estatus_Activo: activo
      
      };
      this.estatusTicketService.insertEstatusTicket(request)
        .subscribe({
          next: (res) => {
            const data = res;
            this.toastr.success('Estatus registrado exitosamente');
            this.getAllEstatus();
          },
          error: (err) => {
            console.log(err);
            this.toastr.error('Ha Ocurrido un Error', err);
          }
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  editEstatus(data: any){
    console.log(data)
  }

  deleteEstatus(id:number){
    console.log(id)
  }
}
