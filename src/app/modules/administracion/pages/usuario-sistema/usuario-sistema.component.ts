import { NgFor, NgIf } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Component, inject, Injectable } from "@angular/core";

import { CustomTableComponent } from "@Component/Table";
import { SweetAlertService } from "@Service/SweetAlert";

import { UsuarioSistemaInsertRequest, UsuarioSistemaUpdateRequest, UsuarioSistemaModel } from "@Models/Usuario-Sistema";
import { UsuarioSistemaService, SistemaService, UsuarioService } from "@Services";
import { SistemaModel } from "@Models/Sistema";
import { UsuarioModel } from "@Models/Usuario";


@Component({
  selector: 'app-usuario-sistema',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, CustomTableComponent],
  templateUrl: './usuario-sistema.component.html',
  styleUrl: './usuario-sistema.component.css'
})
export class UsuarioSistemaComponent {
  constructor() { }
  private fb = inject(FormBuilder);
  private sweetAlertService = inject(SweetAlertService);

  private usuarioSistemaService = inject(UsuarioSistemaService);
  private sistemaService = inject(SistemaService);
  private usuarioService = inject(UsuarioService);

  usuarioSistemaList: UsuarioSistemaModel[] = []
  sistemasList: SistemaModel[] = []
  usuariosList: UsuarioModel[] = []

  form = this.fb.nonNullable.group({
    id: [0],
    usuario: [0, [Validators.required, Validators.min(1)]],
    sistema: [0, [Validators.required, Validators.min(1)]]
  })

  ngOnInit(): void{
    this.getAllUsuariosSistemas();
    this.getAllSistemas();
    this.getAllUsuarios();
  }

  getAllUsuariosSistemas() {
    this.usuarioSistemaService.getAllUsuariosSistemas().subscribe((data) => {
      this.usuarioSistemaList = data.response;
    })
  }

  getAllSistemas() {
    this.sistemaService.getAllSistemas().subscribe((data) => {
      this.sistemasList = data.response;
    })
  }

  getAllUsuarios() {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuariosList = data.response
    })
  }

  onSubmit(): void{
    if (this.form.valid) {
      const { id, usuario, sistema } = this.form.getRawValue();

      const request: UsuarioSistemaInsertRequest = {
        Sistema_Id: sistema,
        Usuario_Id: usuario,
        Estatus: 1
      }

      const requestUpdate: UsuarioSistemaUpdateRequest = {
        Id: id,
        Sistema_Id: sistema,
        Usuario_Id: usuario,
        Estatus: 1
      }

      const serviceCall = id === 0 ? this.usuarioSistemaService.insertUsuarioSistema(request) : this.usuarioSistemaService.updateUsuarioSistema(requestUpdate)
      serviceCall.subscribe({
        next: (res: any) => {
          this.resetForm();
          this.getAllUsuariosSistemas();
        },
        error: (err: any) => {
          console.log(err)
        }
      });
    } else {
      this.form.markAllAsTouched
    }
    
  }

  resetForm() {
    this.form.reset({
      id: 0,
      sistema: 0,
      usuario: 0
    })
  }

  editUsuarioSistema(data: UsuarioSistemaModel) {
    console.log(data);
  }

  deleteUsuarioSistema(Id: number) {
    console.log(Id);
  }
  

}
