import { Component } from '@angular/core';
import { TicketBoardComponent } from 'src/app/shared/components/ticket-board/ticket-board.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TicketBoardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
