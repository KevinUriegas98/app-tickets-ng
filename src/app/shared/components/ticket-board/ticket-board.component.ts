import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { forkJoin } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { tickets } from '@Global/endpoints';

import { EstatusTicketService } from '@Services';
import { TicketService } from '@Services';

import { EstatusTicketModel } from '@Models/StatusTickets';
import { TicketEstatusModel } from '@Models/Ticket';

import { IconCustomComponent } from "@Component/IconCustom";

@Component({
  selector: 'app-ticket-board',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, CdkDropList, CdkDrag, IconCustomComponent, FontAwesomeModule],
  templateUrl: './ticket-board.component.html',
  styleUrl: './ticket-board.component.css'
})
export class TicketBoardComponent {
  @Input() data: any[] = [];
  @Output() changeTicket: EventEmitter<any> = new EventEmitter();
  
  isModalOpen = false;
  ticket!: TicketEstatusModel;
  userProfile = localStorage.getItem('idPerfil');
  constructor() {}

  getConnectedDropListIds(index: number): string[] {
    return this.data.map((_, index) => `cdk-drop-list-${index}`);
  }

  drop(event: CdkDragDrop<any[]>, statusIndex: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.changeTicket.emit({data:event.item.data, statusIndex})
    }
  }

  openModal(data:any) {
    this.ticket = data;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}