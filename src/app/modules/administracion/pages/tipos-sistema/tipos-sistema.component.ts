import { Component, inject } from '@angular/core';
import { CustomTableComponent } from '@Component/Table';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

import { TipoSistemaInsertRequest, TipoSistemaModel } from '@Models/TipoSistema';
import { TiposSistemaService } from '@Services';
import { SweetAlertService } from '@Service/SweetAlert';

@Component({
  selector: 'app-tipos-sistema',
  standalone: true,
  imports: [CustomTableComponent, ReactiveFormsModule, NgIf],
  templateUrl: './tipos-sistema.component.html'
})
export class TiposSistemaComponent {
  constructor() { }
  private fb = inject(FormBuilder);
 
  private tipoService = inject(TiposSistemaService);
  private sweetAlertService = inject(SweetAlertService);
  
  tiposList: TipoSistemaModel[] = [];

  form = this.fb.nonNullable.group({
    id: [0],
    descripcion: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.getAllTiposSistemas();
  }

  getAllTiposSistemas() {
    this.tipoService.getAllTiposSistemas().subscribe((data) => {
      this.tiposList = data.response;
    })
  }

  onSubmit(): void{
    if (this.form.valid) {
      const { id, descripcion } = this.form.getRawValue();

      const request: TipoSistemaInsertRequest = {
        TipoSistema_Descripcion: descripcion.trim()
      }

      const requestUpdate: TipoSistemaModel = {
        TipoSistema_Id: id,
        TipoSistema_Descripcion: descripcion.trim()
      }

      const serviceCall = id == 0 ?this.tipoService.insertTipoSistema(request) : this.tipoService.updateTipoSistema(requestUpdate);
      serviceCall.subscribe({
        next: (res: any) => {
          this.resetForm();
          this.getAllTiposSistemas();
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  resetForm() {
    this.form.reset({
      id: 0,
      descripcion: ''
    })
  }
  editTipoSistema(data: TipoSistemaModel) {
    this.form.patchValue({
      id: data.TipoSistema_Id,
      descripcion: data.TipoSistema_Descripcion
    })
  }

  deleteTipoSistema(TipoSistema_Id: number) {
    this.sweetAlertService.confirm({
      title: '¿Estás seguro que deseas eliminar este tipo de sistema?',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoService.deleteTipoSistema(TipoSistema_Id)
        .subscribe({
          next: (res) => {
            this.getAllTiposSistemas();
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    })
  }

}
