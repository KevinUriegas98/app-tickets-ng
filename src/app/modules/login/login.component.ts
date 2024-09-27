import { Component, inject, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrService } from 'ngx-toastr';
import { faHeart, faUser, faLock } from '@fortawesome/free-solid-svg-icons';

import { images } from '@Constants';
// Models //
import { LoginRequest } from '@Models/Auth';
// Services //
import { LoginService } from '@Services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, NgIf]
})
export class LoginComponent implements OnInit {
  readonly images = images;
  private fb = inject(FormBuilder);
  private auth = inject(LoginService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  year: number = 0;
  private isBrowser: boolean;

  constructor(library: FaIconLibrary, @Inject(PLATFORM_ID) platformId: any) {
    library.addIcons(
      faHeart,
      faUser,
      faLock
    );
    this.isBrowser = isPlatformBrowser(platformId);
  }
  
  form = this.fb.nonNullable.group({
    usuario: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  toggleDarkMode(): void {
    if (this.isBrowser) {
      const body = document.body;
      const isDarkMode = body.classList.contains('dark');
      body.classList.toggle('dark', !isDarkMode);
      localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
    }
  }

  ngOnInit(): void {
    const d = new Date();
    this.year = d.getFullYear();

    if (this.isBrowser) {
      const themeToggleButton = document.getElementById('theme-toggle');
      if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => this.toggleDarkMode());
      }
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }
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
            if (data.Token != null) {
            localStorage.setItem('token', data.Token);
            localStorage.setItem('idUsuario', data.Usuario.Id.toString());
            localStorage.setItem('idPerfil', data.Usuario.IdPerfil.toString());
            localStorage.setItem('usuario', data.Usuario.NombreUsuario);
            localStorage.setItem('nombrePersona', data.Usuario.NombrePersona);
            if (!localStorage.getItem('mode')) {
              localStorage.setItem('mode', 'light');
            }
              this.router.navigate(['/home']);
            }
            else {
              this.toastr.error('Usuario o contraseña incorrecto')
            }
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
