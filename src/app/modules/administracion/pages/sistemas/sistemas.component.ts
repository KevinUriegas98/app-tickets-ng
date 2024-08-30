import { NgIf } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Component, inject, Injectable } from "@angular/core";

import { CustomTableComponent } from "@Component/Table";
import { SweetAlertService } from "@Service/SweetAlert";

import { SistemaInsertRequest, SistemaModel } from "@Models/Sistema";
import { SistemaService } from "@Services";

@Component({
  selector: 'app-sistemas',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CustomTableComponent],
  templateUrl: './sistemas.component.html',
})
export class SistemasComponent {
  constructor() { }
  private fb = inject(FormBuilder);
  private sistemaService = inject(SistemaService);
  private sweetAlertService = inject(SweetAlertService);

  sistemasList: SistemaModel[] = []

  form = this.fb.nonNullable.group({
    id: [0],
    nombre: ['', Validators.required],
    tipo: [0, [Validators.required, Validators.min(1)]]
  })

  ngOnInit(): void{
    this.getAllSistemas();
  }

  getAllSistemas() {
    this.sistemaService.getAllSistemas().subscribe((data) => {
      this.sistemasList = data.response;
    })
  }

  onSubmit(): void{
    if (this.form.valid) {
      const { id, nombre, tipo } = this.form.getRawValue();

      const request: SistemaInsertRequest = {
        Sistema_Nombre: nombre.trim(),
        Sistema_Tipo: tipo,
        Sistema_Estatus: 1,
        Usuario_Registra: 1,
      }
      const serviceCall = this.sistemaService.insertSistema(request);
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
    console.log(data);
  }

  deleteSistema(Sistema_Id: number) {
    console.log(Sistema_Id);
  }


  
}
