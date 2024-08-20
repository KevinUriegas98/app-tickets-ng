import { NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table';

import { PerfilModel, PerfilInsertRequest } from '@Models/Perfil';

import { PerfilService } from '@Services';

@Component({
  selector: 'app-perfiles',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CustomTableComponent],
  templateUrl: './perfiles.component.html',
  styleUrl: './perfiles.component.css'
})
export class PerfilesComponent {
  private fb = inject(FormBuilder);
  private perfilService = inject(PerfilService);

  perfilList: PerfilModel[] = [];

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.getPerfil();
  }

  getPerfil() {
    // this.perfilService.getPerfil().subscribe((data) => {
    //   this.perfilList = data.response.data;
    // });
    this.perfilList = [
      { Id: 1, Nombre: 'Administrador', Descripcion: 'Administrador'},
      { Id: 2, Nombre: 'Usuario', Descripcion: 'Usuario'},
      { Id: 3, Nombre: 'Sistemas', Descripcion: 'Sistemas'},
      { Id: 4, Nombre: 'Almacen', Descripcion: 'Almacen'},
      { Id: 5, Nombre: 'Contador', Descripcion: 'Contador'},
  ];
  }

  onSubmit(): void {
    console.log("here")
    if (this.form.valid) {
      const { nombre, descripcion } = this.form.getRawValue();
      const request: PerfilInsertRequest = {
        Id: 0,
        Nombre: nombre,
        Descripcion: descripcion
      };
      this.perfilService.insertPerfil(request)
        .subscribe({
          next: (res) => {
            const data = res;
            //this.getPersons();
          },
          error: (err) => {
            console.log(err)
            // this.toastr.error('Ha Ocurrido un Error', err);
          }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  editPerfil(data:any){
    console.log(data)
  }

  deletePerfil(id:number){
    console.log(id)
  }
}
