import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

import { sistemas } from '@EndPoints';
import { SistemaInsertRequest, SistemaUpdateRequest, SistemaModel, GetSistemasResponse } from '@Models/Sistema';

@Injectable({
  providedIn: 'root'
})
export class SistemaService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders ({})
  }

  insertSistema(sistema: SistemaInsertRequest): Observable<Boolean> {
    const httpOptions = { headers: this.headers };
    return this.http.post<Boolean>(sistemas.insert, sistema, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )  }

  getAllSistemas(): Observable<GetSistemasResponse> {
    const httpOptions = { headers: this.headers };
    return this.http.get<GetSistemasResponse>(sistemas.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  updateSistema(sistema: SistemaUpdateRequest): Observable<Boolean> {
    const httpOptions = { headers: this.headers };
    return this.http.put<Boolean>(sistemas.update, sistema, httpOptions)
      .pipe(
        map(res => {
          return res;
      })
    )
  }
}
