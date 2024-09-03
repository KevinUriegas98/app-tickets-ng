import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { tickets } from '@EndPoints';
import { TicketEstatusResponse, TicketInsertRequest } from '@Models/Ticket';
 
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({})
  }

  insertTicket(ticket: TicketInsertRequest): Observable<boolean> {
    const httpOptions = { headers: this.headers };
    return this.http.post<boolean>(`${tickets.insert}`, ticket, httpOptions)
      .pipe(
        map(res => {
          return res;
        })
    )
      
  }

  getTicketsEstatus(): Observable<TicketEstatusResponse>
  {
    const httpOptions = { headers: this.headers };
    return this.http.get<TicketEstatusResponse>(tickets.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }
}
