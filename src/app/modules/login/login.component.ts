import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrService } from 'ngx-toastr';
import { faHeart, faUser, faLock } from '@fortawesome/free-solid-svg-icons';

import { images } from '@Constants';
// Models //
import { LoginRequest } from '@Models/Auth'
// Services //
import { LoginService } from '@Services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, NgIf]
})
export class LoginComponent {
  readonly images = images;

  private fb = inject(FormBuilder);
  private auth = inject(LoginService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  year:number = 0;

  constructor(library: FaIconLibrary) {
    library.addIcons(
      faHeart,
      faUser,
      faLock
    );
  }
  
  form = this.fb.nonNullable.group({
    usuario: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  ngOnInit(): void {
    var  d = new  Date();
    this.year = d.getFullYear();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { usuario, password } = this.form.getRawValue();
      const request: LoginRequest = {
        username: usuario,
        userpassword: password
      };
      this.auth.auth(request)
        .subscribe({
          next: (res) => {
            const data = res.Response.data;
            localStorage.setItem('token', data.Token);
            localStorage.setItem('idUsuario', data.Usuario.Id.toString());
            localStorage.setItem('idPerfil', data.Usuario.IdPerfil.toString());
            localStorage.setItem('usuario', data.Usuario.NombreUsuario);
            localStorage.setItem('nombrePersona', data.Usuario.NombrePersona);
            localStorage.setItem('idSucursal', data.Usuario.IdSucursal.toString());
            localStorage.setItem('sucursal', data.Usuario.NombreSucursal);
            localStorage.setItem('pctDescuento', data.Usuario.PctDescuento.toString());
            if(!localStorage.getItem('mode')){
              localStorage.setItem('mode', 'light');
            }
            this.router.navigate(['/home']);
          },
          error: (err) => {
            this.toastr.error('Ha Ocurrido un Error', err);
          }
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
