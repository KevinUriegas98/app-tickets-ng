import { Component, inject } from '@angular/core';

import { CustomTableComponent } from '@Component/Table';
import { SweetAlertService } from '@Service/SweetAlert';

import { TipoTicketModel } from '@Models/Tipo';
import { TipoService } from '@Services';
@Component({
  selector: 'app-tipos',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './tipos.component.html',
  styleUrl: './tipos.component.css'
})
export class TiposComponent {
  constructor() {}

  private tipoService = inject(TipoService);
  private sweetAlertService = inject(SweetAlertService);

  tiposList: TipoTicketModel[] = [];
  
  ngOnInit(): void {
    this.getAllTipos();
  }

  getAllTipos(){
    this.tipoService.getAllTipos().subscribe((data) => {
      this.tiposList = data.response;
    })
  }

  editTipo(data: TipoTicketModel){
    console.log(data);
  }

  deleteTipo(Tipo_Id: number) {
    console.log(Tipo_Id);
  }
}
