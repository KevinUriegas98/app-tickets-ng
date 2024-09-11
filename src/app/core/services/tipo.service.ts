import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { tipos } from '@EndPoints';
import { GetTiposTicketResponse } from '@Models/Tipo';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders ({})
  }

  getAllTipos(): Observable<GetTiposTicketResponse> {
    const httpOptions = { headers: this.headers };
    return this.http.get<GetTiposTicketResponse>(tipos.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }}
