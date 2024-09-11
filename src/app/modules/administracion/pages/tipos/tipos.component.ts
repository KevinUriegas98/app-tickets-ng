import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table';
import { SweetAlertService } from '@Service/SweetAlert';

import { TipoTicketModel, TipoTicketInsertRequest } from '@Models/Tipo';
import { TipoService } from '@Services';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-tipos',
  standalone: true,
  imports: [CustomTableComponent, ReactiveFormsModule, NgIf],
  templateUrl: './tipos.component.html',
  styleUrl: './tipos.component.css'
})
export class TiposComponent {
  constructor() {}
  private fb = inject(FormBuilder);

  private tipoService = inject(TipoService);
  private sweetAlertService = inject(SweetAlertService);

  tiposList: TipoTicketModel[] = [];
  
  form = this.fb.nonNullable.group({
    id: [0],
    nombre: ['', [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z ]*$')]],
    estatus: [1, [Validators.required]]
  })

  ngOnInit(): void {
    this.getAllTipos();
  }

  getAllTipos(){
    this.tipoService.getAllTipos().subscribe((data) => {
      this.tiposList = data.response;
    })
  }

  onSubmit(): void{
    if(this.form.valid){
      const {id, nombre, estatus} = this.form.getRawValue();

      const request: TipoTicketInsertRequest = {
        Tipo_Nombre: nombre.trim(),
        Tipo_Estatus: estatus
      };

      const requestUpdate: TipoTicketModel = {
        Tipo_Id: id,
        Tipo_Nombre: nombre.trim(),
        Tipo_Estatus: estatus
      }

      const serviceCall = id == 0 ?this.tipoService.insertTipo(request):this.tipoService.updateTipos(requestUpdate)
      serviceCall.subscribe({
        next: (res: any) => {
          this.resetForm();
          this.getAllTipos();
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
      estatus: 1
    })
  }

  editTipo(data: TipoTicketModel){
    this.form.patchValue({
      id: data.Tipo_Id,
      nombre: data.Tipo_Nombre,
      estatus: data.Tipo_Estatus
    })
  }

  deleteTipo(Tipo_Id: number) {
    console.log(Tipo_Id);
  }
}
