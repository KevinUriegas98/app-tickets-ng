import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [NgFor, NgIf, FontAwesomeModule],
  templateUrl: './custom-table.component.html'
})
export class CustomTableComponent {
  @Input() keyRow: string = "primary";
  @Input() tableHeadColor: string = "primary";
  @Input() tableHead: string = "Tabla";
  @Input() headers: any[] = [];
  @Input() data: any[] = [];
  @Input() keys: any[] = [];
  @Input() hasExport: boolean = false;
  @Input() hasSearch: boolean = false;
  @Input() hasEdit: boolean = false;
  @Input() hasDelete: boolean = false;
  @Output() editEmit: EventEmitter<any> = new EventEmitter();
  @Output() deleteEmit: EventEmitter<number> = new EventEmitter();

  constructor(library: FaIconLibrary) {
    library.addIcons(
      faPen,
      faTrashCan
    );
  }

  editRow(data:any) {
    this.editEmit.emit(data)
  }

  deleteRow(data:any) {
    this.deleteEmit.emit(data[this.keyRow])
  }
}
