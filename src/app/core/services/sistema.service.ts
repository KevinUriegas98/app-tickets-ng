import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

import { sistemas } from '@EndPoints';
import { SistemaModel, GetSistemasResponse } from '@Models/Sistema';

@Injectable({
  providedIn: 'root'
})
export class SistemaService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders ({})
  }

  getAllSistemas(): Observable<GetSistemasResponse> {
    const httpOptions = { headers: this.headers };
    return this.http.get<GetSistemasResponse>(sistemas.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }
}
