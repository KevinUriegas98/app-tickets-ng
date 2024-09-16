import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { tipos, tiposSistema } from '@EndPoints';
import { GetTiposSistemaResponse, TipoSistemaInsertRequest, TipoSistemaModel } from '@Models/TipoSistema';

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

  updateTipoSistema(tipo: TipoSistemaModel): Observable<boolean>
  {
    const httpOptions = { headers: this.headers };
    return this.http.put<boolean>(tiposSistema.update, tipo, httpOptions)
      .pipe(
        map(res => {
          return res;
        })
    )
  }

  deleteTipoSistema(id: number): Observable<boolean>{
    const httpOptions = { headers: this.headers };
    const url = `${tiposSistema.delete}?Id=${id}`
    return this.http.delete<boolean>(url, httpOptions)
      .pipe(
        map(res => {
          return res;
      })
    )
  }

}
