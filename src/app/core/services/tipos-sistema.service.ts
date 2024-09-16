import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { tiposSistema } from '@EndPoints';
import { GetTiposSistemaResponse, TipoSistemaInsertRequest } from '@Models/TipoSistema';

@Injectable({
  providedIn: 'root'
})
export class TiposSistemaService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({})
  }

  insertTipoSistema(tipo: TipoSistemaInsertRequest): Observable<boolean>
  {
    const httpOptions = { headers: this.headers };
    return this.http.post<boolean>(tiposSistema.insert, tipo, httpOptions)
      .pipe(
        map(res => {
        return res;
      })
    )
  }
  
  getAllTiposSistemas(): Observable<GetTiposSistemaResponse>
  {
    const httpOptions = { headers: this.headers };
    return this.http.get<GetTiposSistemaResponse>(tiposSistema.get, httpOptions)
      .pipe(
        map(res => {
          return res;
        })
    )
  }

}
