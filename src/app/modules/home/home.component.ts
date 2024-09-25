import { Component, inject } from '@angular/core';

import { TicketBoardComponent } from '@Component/TicketBoard';
import { TicketEstatusModel, TicketUpdateRequest } from '@Models/Ticket';
import { TicketService } from '@Services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TicketBoardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private ticketService = inject(TicketService);

  tickets: any[] = [];

  constructor() {}

  ngOnInit(): void{
    this.getTicketsBoard();
  }

  getTicketsBoard() {
    this.ticketService.getTicketsBoard().subscribe((data) => {
      this.tickets = data.response;
    })
  }

  changeTicket(data:any){
    let dataTicket = data.data;
    let estatusIdNew = data.statusIndex;

    const requestUpdate: TicketUpdateRequest = {
      Ticket_Id: dataTicket.Ticket_Id,
      Ticket_Tipo: dataTicket.Tipo_Ticket_Id,
      Modulo_Id: dataTicket.Modulo_Id,
      Ticket_Descripcion: dataTicket.Ticket_Descripcion,
      Ticket_Comentarios: dataTicket.Comentarios,
      Ticket_Estatus: estatusIdNew,
      Ticket_Titulo: dataTicket.Ticket_Titulo,
      Usuario_Registra: 1
    }

    const serviceCall = this.ticketService.updateTicket(requestUpdate);
    serviceCall.subscribe({
      next: (res: any) => {
        console.log(res)
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}
