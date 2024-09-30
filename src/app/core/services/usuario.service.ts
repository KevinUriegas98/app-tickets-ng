import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { usuarios } from '@EndPoints';
import { GetUsuariosResponse } from '@Models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders ({})
  }

  getUsuarios(): Observable<GetUsuariosResponse> {
    const httpOptions = {headers: this.headers};
    return this.http.get<GetUsuariosResponse>(usuarios.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }
}
