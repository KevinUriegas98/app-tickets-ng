import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { tickets } from '@EndPoints';
import { TicketInsertRequest } from '../models/tickets';

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
}
