import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

import { modulos } from '@EndPoints';
import { GetModulosResponse } from '@Models/Modulo';
@Injectable({
  providedIn: 'root'
})
export class ModuloService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders ({})
  }

  getAllModulos(): Observable<GetModulosResponse>{
    const httpOptions = { headers: this.headers };
    return this.http.get<GetModulosResponse>(modulos.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )  }
}
