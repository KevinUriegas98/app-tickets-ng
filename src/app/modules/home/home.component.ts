import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketBoardComponent } from '@Component/TicketBoard';
import { TicketEstatusModel, TicketUpdateRequest } from '@Models/Ticket';
import { TicketService } from '@Services';
import { StorageService } from 'src/app/shared/services/storage.service';
import { bgImages, images } from '@Global/constants';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TicketBoardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly images = bgImages;
  private ticketService = inject(TicketService);

  tickets: any[] = [];
  background = localStorage.getItem("background") || bgImages[0];

  constructor(private storageService:StorageService) {
    this.background = this.storageService.backgroundSource.getValue();
    this.storageService.background$.subscribe((bg) => {
      this.background = bg;
    });
  }

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
      Usuario_Registra: 1,
      Usuario_Asignado: Number(localStorage.getItem('idUsuario'))
    }

    const serviceCall = this.ticketService.updateTicket(requestUpdate);
    serviceCall.subscribe({
      next: (res: any) => {
        this.getTicketsBoard();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}