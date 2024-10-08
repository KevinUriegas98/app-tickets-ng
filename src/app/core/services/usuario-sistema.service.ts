import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

import { usuariosSistemas } from '@EndPoints';
import { UsuarioSistemaInsertRequest, UsuarioSistemaUpdateRequest, GetUsuarioSistemaResponse } from '@Models/Usuario-Sistema';
@Injectable({
  providedIn: 'root'
})
export class UsuarioSistemaService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders ({})
  }

  insertUsuarioSistema(usuarioSistema: UsuarioSistemaInsertRequest): Observable<Boolean> {
    const httpOptions = { headers: this.headers };
    return this.http.post<Boolean>(usuariosSistemas.insert, usuarioSistema, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )  }

  getAllUsuariosSistemas(): Observable<GetUsuarioSistemaResponse> {
    const httpOptions = { headers: this.headers };
    return this.http.get<GetUsuarioSistemaResponse>(usuariosSistemas.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  updateUsuarioSistema(usuarioSistema: UsuarioSistemaUpdateRequest): Observable<Boolean> {
    const httpOptions = { headers: this.headers };
    return this.http.put<Boolean>(usuariosSistemas.update, usuarioSistema, httpOptions)
      .pipe(
        map(res => {
          return res;
      })
    )
  }

  deleteUsuarioSistema(id: number): Observable<Boolean> {
    const httpOptions = { headers: this.headers };
    const url = `${usuariosSistemas.delete}?Id=${id}`
    return this.http.delete<boolean>(url, httpOptions)
      .pipe(
        map(res => {
        return res;
      })
    )
  }
}
