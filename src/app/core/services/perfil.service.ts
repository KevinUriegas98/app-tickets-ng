import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { persons } from '@EndPoints';
import { PerfilInsertRequest, GetPerfilResponse } from '@Models/Perfil'

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders ({})
  }

  getPerfil(): Observable<GetPerfilResponse> {
    const httpOptions = {headers:this.headers}
    return this.http.post<GetPerfilResponse>(persons.get, null, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  insertPerfil(person:PerfilInsertRequest): Observable<boolean> {
    const httpOptions = {headers:this.headers}
    return this.http.post<boolean>(persons.insert, person, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }
}