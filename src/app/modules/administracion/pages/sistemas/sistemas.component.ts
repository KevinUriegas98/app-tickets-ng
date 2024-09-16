import { NgFor, NgIf } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Component, inject, Injectable } from "@angular/core";

import { CustomTableComponent } from "@Component/Table";
import { SweetAlertService } from "@Service/SweetAlert";

import { SistemaInsertRequest, SistemaUpdateRequest, SistemaModel } from "@Models/Sistema";
import { SistemaService, TiposSistemaService } from "@Services";
import { TipoSistemaModel } from "@Models/TipoSistema";

@Component({
  selector: 'app-sistemas',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, CustomTableComponent],
  templateUrl: './sistemas.component.html',
})
export class SistemasComponent {
  constructor() { }
  private fb = inject(FormBuilder);
  private sistemaService = inject(SistemaService);
  private tipoSistemaService = inject(TiposSistemaService);
  private sweetAlertService = inject(SweetAlertService);

  sistemasList: SistemaModel[] = []
  tiposList: TipoSistemaModel[] = []


  form = this.fb.nonNullable.group({
    id: [0],
    nombre: ['', Validators.required],
    tipo: [0, [Validators.required, Validators.min(1)]]
  })

  ngOnInit(): void{
    this.getAllSistemas();
    this.getAllTiposSistema();
  }

  getAllTiposSistema() {
    this.tipoSistemaService.getAllTiposSistemas().subscribe((data) => {
      this.tiposList = data.response;
    })
  }
  getAllSistemas() {
    this.sistemaService.getAllSistemas().subscribe((data) => {
      this.sistemasList = data.response;
    })
  }

  onSubmit(): void{
    if (this.form.valid) {
      const { id, nombre, tipo } = this.form.getRawValue();
      const usuarioRegistra = parseInt(localStorage.getItem('idUsuario')??'0')
      const request: SistemaInsertRequest = {
        Sistema_Nombre: nombre.trim(),
        Tipo_Id: tipo,
        Sistema_Estatus: 1,
        Usuario_Registra: usuarioRegistra
      }

      const requestUpdate: SistemaUpdateRequest = {
        Sistema_Id: id,
        Sistema_Nombre: nombre.trim(),
        Tipo_Id: tipo,
        Sistema_Estatus: 1,
        Usuario_Registra: usuarioRegistra
      }

      const serviceCall = id === 0 ?this.sistemaService.insertSistema(request):this.sistemaService.updateSistema(requestUpdate)
      serviceCall.subscribe({
        next: (res: any) => {
          this.resetForm();
          this.getAllSistemas();
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
      nombre: '',
      tipo: 0,
    });
  }

  editSistema(data: SistemaModel) {
    this.form.patchValue({
      id: data.Sistema_Id,
      nombre: data.Sistema_Nombre,
      tipo: data.Tipo_Id
    });
  }

  deleteSistema(Sistema_Id: number) {
    this.sweetAlertService.confirm({
      title: '¿Estas seguro que deseas eliminar permanentemente este sistema?',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sistemaService.deleteSistema(Sistema_Id)
          .subscribe({
            next: (res) => {
              this.getAllSistemas();
            },
            error: (err) => {
              console.log(err);
            }
          });
      }
    });   
  }
}
