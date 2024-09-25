import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { tickets } from '@EndPoints';
import { TicketEstatusResponse, TicketInsertRequest, TicketUpdateRequest } from '@Models/Ticket';
import { tick } from '@angular/core/testing';
 
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

  getTicketsBoard(): Observable<TicketEstatusResponse>
  {
    const httpOptions = { headers: this.headers };
    return this.http.get<TicketEstatusResponse>(tickets.getTicketsBoard, httpOptions)
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

  updateTicket(ticket: TicketUpdateRequest): Observable<Boolean>
  {
    const httpOptions = { headers: this.headers };
    return this.http.put<Boolean>(tickets.update, ticket, httpOptions)
    .pipe(
      map(res => {
        return res; 
      } )
    )
  }

  deleteTicket(id: number): Observable<Boolean> {
    const httpOptions = { headers: this.headers };
    const url = `${tickets.delete}?Id=${id}`
    return this.http.delete<Boolean>(url, httpOptions)
      .pipe(
        map( res => {
          return res;
        })
      )
  }
}
