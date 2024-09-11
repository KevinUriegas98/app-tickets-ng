import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { tipos } from '@EndPoints';
import { GetTiposTicketResponse, TipoTicketInsertRequest } from '@Models/Tipo';
import { isGeneratorFunction } from 'util/types';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders ({})
  }

  insertTipo(tipo: TipoTicketInsertRequest): Observable<boolean> {
    const httpOptions = { headers: this.headers };
    return this.http.post<boolean>(tipos.insert,tipo,httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }
  getAllTipos(): Observable<GetTiposTicketResponse> {
    const httpOptions = { headers: this.headers };
    return this.http.get<GetTiposTicketResponse>(tipos.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

}


