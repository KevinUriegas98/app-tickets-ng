
import { NgIf, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CustomTableComponent } from '@Component/Table';
import { SweetAlertService } from '@Service/SweetAlert';

import { ModuloInsertRequest, ModuloModel } from '@Models/Modulo';
import { ModuloService, SistemaService } from '@Services';
import { SistemaModel } from '@Models/Sistema';

@Component({
  selector: 'app-modulos',
  standalone: true,
  imports: [CustomTableComponent, NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './modulos.component.html',
  styleUrl: './modulos.component.css'
})
export class ModulosComponent {
  constructor() { }
  private fb = inject(FormBuilder);
  private moduloService = inject(ModuloService);
  private sistemaService = inject(SistemaService);
  private sweetAlertService = inject(SweetAlertService);

  modulosList: ModuloModel[] = [];
  sistemasList: SistemaModel[] = [];

  form = this.fb.nonNullable.group({
    id: [0],
    nombre: ['', [Validators.required]],
    sistema: [0, [Validators.required, Validators.min(1)]]
  });

  ngOnInit(): void {
    this.getAllModulos();
    this.getAllSistemas();
  }

  getAllModulos() {
    this.moduloService.getAllModulos().subscribe((data) => {
      this.modulosList = data.response;
    });
  }

  getAllSistemas() {
    this.sistemaService.getAllSistemas().subscribe((data) => {
      this.sistemasList = data.response;
    });
  }

  onSubmit(): void{
    if (this.form.valid) {
      const { id, nombre, sistema } = this.form.getRawValue();

      const request: ModuloInsertRequest = {
        Modulo_Nombre: nombre.trim(),
        Sistema_Id: sistema,
        Modulo_Estatus: 1,
        Usuario_Registra: 1
      }

      const serviceCall = this.moduloService.insertModulo(request)
      serviceCall.subscribe({
        next: (res: any) => {
          this.resetForm();
          this.getAllModulos();
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
  }

  resetForm(): void{
    this.form.reset({
      id: 0,
      nombre: '',
      sistema: 0
    });
  }

  editModulo(data: ModuloModel) {
    console.log(data);
  }

  deleteModulo(Modulo_Id: number) {
    console.log(Modulo_Id)
  }
}
