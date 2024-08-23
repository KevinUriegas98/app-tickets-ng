import { NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { EstatusTicketInsertRequest } from 'src/app/core/models/estatus-tickets';
import { EstatusTicketService } from 'src/app/core/services/estatus-ticket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-estatus-ticket',
  standalone: true,
  imports: [ReactiveFormsModule,  NgIf],
  templateUrl: './estatus-ticket.component.html',
  styleUrl: './estatus-ticket.component.css'
})
export class EstatusTicketComponent {
  constructor(private toastr: ToastrService) {}
  private fb = inject(FormBuilder);
  private estatusTicketService = inject(EstatusTicketService);

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z ]*$')]],
    activo: [1, [Validators.required]]
  });

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
}
