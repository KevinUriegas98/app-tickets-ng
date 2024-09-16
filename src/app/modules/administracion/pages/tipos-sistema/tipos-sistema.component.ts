import { Component, inject } from '@angular/core';
import { CustomTableComponent } from '@Component/Table';

import { TipoSistemaModel } from '@Models/TipoSistema';
import { TiposSistemaService } from '@Services';

@Component({
  selector: 'app-tipos-sistema',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './tipos-sistema.component.html',
  styleUrl: './tipos-sistema.component.css'
})
export class TiposSistemaComponent {
  constructor() { }
 
  private tipoService = inject(TiposSistemaService);
  
  tiposList: TipoSistemaModel[] = [];

  ngOnInit(): void {
    this.getAllTiposSistemas();
  }

  getAllTiposSistemas() {
    this.tipoService.getAllTiposSistemas().subscribe((data) => {
      this.tiposList = data.response;
    })
  }

  editTipoSistema(data: TipoSistemaModel) {
    console.log(data);
  }

  deleteTipoSistema(TipoSistema_Id: number) {
    console.log(TipoSistema_Id);
  }

}
