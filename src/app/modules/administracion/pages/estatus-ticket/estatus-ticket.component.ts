import { NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomTableComponent } from '@Component/Table';

import { EstatusTicketInsertRequest, EstatusTicketModel } from 'src/app/core/models/estatus-tickets';
import { EstatusTicketService } from 'src/app/core/services/estatus-ticket.service';

import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';


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
    Swal.fire({
      title: 'Editar Estatus',
      html: `
        <form id="editEstatusForm" novalidate">
          <div class="z-0 w-full mb-5 group">
              <label for="nombre" class="block mb-2 text-bg font-medium text-light-text dark:text-dark-text">*Nombre de estatus</label>
              <input type="text" id="nombre" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Nombre de estatus" value="${data.Estatus_Nombre}"/>
          </div> 
          <div class="relative z-0 w-full mb-5 group">
              <label for="estatus" class="block mb-2 text-bg font-medium text-light-text dark:text-dark-text">*Estatus</label>
              <div class="flex items-center space-x-4">
                  <input type="radio" id="activo" name="activo" value="1" ${data.Estatus_Activo === 1 ? 'checked' : ''}>
                  <label for="text" class="text-md font-medium text-light-text dark:text-dark-text">Activo</label>

                  <input type="radio" id="inactivo" class="" name="activo" value="0" ${data.Estatus_Activo === 0 ? 'checked' : ''}>
                  <label for="text" class="text-md font-medium text-light-text dark:text-dark-text">Inactivo</label>
              </div>
          </div>
        </form>
      `,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Actualizar",
      customClass: {
        popup: 'dark:bg-dark-bg',
        title: 'dark:text-white',
        validationMessage: 'dark:bg-dark-bg text-white'
      },
      preConfirm: () => {
        const nombre = (Swal.getPopup()!.querySelector('#nombre') as HTMLInputElement).value.trim();
        const activo = (Swal.getPopup()!.querySelector('input[name="activo"]:checked') as HTMLInputElement)?.value;

        if (!nombre) {
          Swal.showValidationMessage('El nombre no puede estar en blanco');
          return null;
        }
        if (!/^[a-zA-Z ]*$/.test(nombre)) {
          Swal.showValidationMessage('El nombre solo puede contener letras y espacios');
          return null;
        }

        const updateRequest: EstatusTicketModel = {
          Estatus_Id: data.Estatus_Id,
          Estatus_Nombre: nombre,
          Estatus_Activo: parseInt(activo)
        };
        return updateRequest
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.estatusTicketService.updateEstatusTicket(result.value)
        .subscribe({
          next: (res) => {
            this.toastr.success('Estatus actualizado exitosamente');
            this.getAllEstatus();
          },
          error: (err) => {
            console.log(err);
            this.toastr.error('Ha Ocurrido un Error', err);
          }
        });
      }
    });
  }

  deleteEstatus(id:number){
    console.log(id)
  }
}
