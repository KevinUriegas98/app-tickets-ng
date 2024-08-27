import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

import { estatusTickets } from '@EndPoints';
import { EstatusTicketInsertRequest, EstatusTicketModel, GetEstatusTicketsResponse } from '../models/estatus-tickets';

@Injectable({
  providedIn: 'root'
})
export class EstatusTicketService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders ({})
  }

  insertEstatusTicket(estatus:EstatusTicketInsertRequest): Observable<boolean> {
    const httpOptions = { headers: this.headers };
    return this.http.post<boolean>(estatusTickets.insert,estatus,httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  getAllEstatusTickets(): Observable<GetEstatusTicketsResponse> {
    const httpOptions = { headers: this.headers };
    return this.http.get<GetEstatusTicketsResponse>(estatusTickets.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  updateEstatusTicket(estatus:EstatusTicketModel): Observable<boolean> {
    const httpOptions = { headers: this.headers };
    return this.http.put<boolean>(estatusTickets.update, estatus,httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  deleteEstatusTicket(id:number): Observable<boolean> {
    const httpOptions = { headers: this.headers };
    const url = `${estatusTickets.delete}?Id=${id}`;
    return this.http.delete<boolean>(url, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }
}
