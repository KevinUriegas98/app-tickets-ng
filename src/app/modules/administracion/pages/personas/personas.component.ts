import { NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTableComponent } from '@Component/Table';

import { PersonaModel, PersonInsertRequest } from '@Models/Person';

import { PersonasService } from '@Services';

@Component({
  selector: 'app-personas',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CustomTableComponent],
  templateUrl: './personas.component.html',
  styleUrl: './personas.component.css'
})
export class PersonasComponent {
  private fb = inject(FormBuilder);
  private personService = inject(PersonasService);

  personsList: PersonaModel[] = [];

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required]],
    apPaterno: ['', [Validators.required]],
    apMaterno: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons() {
    // this.personService.getPersons().subscribe((data) => {
    //   this.personsList = data.response.data;
    // });
    this.personsList = [
      { Id: 1, IdUsuario: 101, Nombre: 'Juan', ApPaterno: 'Pérez', ApMaterno: 'García' },
      { Id: 2, IdUsuario: 102, Nombre: 'María', ApPaterno: 'López', ApMaterno: 'Martínez' },
      { Id: 3, IdUsuario: 103, Nombre: 'Carlos', ApPaterno: 'Rodríguez', ApMaterno: 'Hernández' },
      { Id: 4, IdUsuario: 104, Nombre: 'Ana', ApPaterno: 'González', ApMaterno: 'Sánchez' },
      { Id: 5, IdUsuario: 105, Nombre: 'José', ApPaterno: 'Fernández', ApMaterno: 'Díaz' },
      { Id: 6, IdUsuario: 106, Nombre: 'Laura', ApPaterno: 'Ramírez', ApMaterno: 'Romero' },
      { Id: 7, IdUsuario: 107, Nombre: 'Pedro', ApPaterno: 'Torres', ApMaterno: 'Ortiz' },
      { Id: 8, IdUsuario: 108, Nombre: 'Marta', ApPaterno: 'Castro', ApMaterno: 'Vargas' },
      { Id: 9, IdUsuario: 109, Nombre: 'Luis', ApPaterno: 'Mendoza', ApMaterno: 'Rojas' },
      { Id: 10, IdUsuario: 110, Nombre: 'Sofía', ApPaterno: 'Flores', ApMaterno: 'Navarro' }
  ];
  }

  onSubmit(): void {
    console.log("here")
    if (this.form.valid) {
      const { nombre, apPaterno, apMaterno } = this.form.getRawValue();
      const request: PersonInsertRequest = {
        Id: 0,
        Nombre: nombre,
        ApPaterno: apPaterno,
        ApMaterno: apMaterno
      };
      this.personService.insertPersons(request)
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

  editPerson(data:any){
    console.log(data)
  }

  deletePerson(id:number){
    console.log(id)
  }
}
