import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

import { modulos } from '@EndPoints';
import { GetModulosResponse, ModuloInsertRequest, ModuloUpdateRequest } from '@Models/Modulo';
@Injectable({
  providedIn: 'root'
})
export class ModuloService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders ({})
  }

  insertModulo(modulo: ModuloInsertRequest): Observable<Boolean>{
    const httpOptions = { headers: this.headers };
    return this.http.post<Boolean>(modulos.insert, modulo, httpOptions)
      .pipe(
        map(res => {
          return res;
      })
    )
  }

  getAllModulos(): Observable<GetModulosResponse>{
    const httpOptions = { headers: this.headers };
    return this.http.get<GetModulosResponse>(modulos.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  updateModulo(modulo: ModuloUpdateRequest): Observable<Boolean>{
    const httpOptions = { headers: this.headers };
    return this.http.put<Boolean>(modulos.update, modulo, httpOptions)
    .pipe(
      map(res => {
        return res;
    })
  )
  }
}
