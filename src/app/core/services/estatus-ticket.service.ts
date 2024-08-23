import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

import { estatusTickets } from '@Global/endpoints';
import { EstatusTicketInsertRequest, GetEstatusTicketsResponse } from '../models/estatus-tickets';

@Injectable({
  providedIn: 'root'
})
export class EstatusTicketService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders ({})
  }

  insertEstatusTicket(estatus:EstatusTicketInsertRequest): Observable<boolean> {
    const httpOptions = {headers:this.headers}
    return this.http.post<boolean>(estatusTickets.insert,estatus,httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  getAllEstatusTickets(): Observable<GetEstatusTicketsResponse> {
    const httpOptions = {headers:this.headers}
    return this.http.get<GetEstatusTicketsResponse>(estatusTickets.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }
}
