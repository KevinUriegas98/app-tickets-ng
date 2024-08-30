import { Component, inject } from '@angular/core';

import { CustomTableComponent } from '@Component/Table';
import { SweetAlertService } from '@Service/SweetAlert';

import { ModuloModel } from '@Models/Modulo';
import { ModuloService } from '@Services';

@Component({
  selector: 'app-modulos',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './modulos.component.html',
  styleUrl: './modulos.component.css'
})
export class ModulosComponent {
  constructor() { }
  private moduloService = inject(ModuloService);
  private sweetAlertService = inject(SweetAlertService);

  modulosList: ModuloModel[] = [];

  ngOnInit(): void {
    this.getAllModulos();
  }

  getAllModulos() {
    this.moduloService.getAllModulos().subscribe((data) => {
      this.modulosList = data.response;
    });
  }

  editModulo(data: ModuloModel) {
    console.log(data);
  }

  deleteModulo(Modulo_Id: number) {
    console.log(Modulo_Id)
  }
}
