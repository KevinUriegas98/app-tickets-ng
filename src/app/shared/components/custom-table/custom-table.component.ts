import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { IconCustomComponent } from '@Component/IconCustom';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [NgFor, NgIf, FontAwesomeModule, NgClass, IconCustomComponent],
  templateUrl: './custom-table.component.html'
})
export class CustomTableComponent {
  @Input() keyRow: string = "Id";
  @Input() keyStatus: string = "Id";
  @Input() tableHeadColor: string = "primary";
  @Input() tableHead: string = "Tabla";
  @Input() headers: any[] = [];
  @Input() data: any[] = [];
  @Input() keys: any[] = [];
  @Input() hasPagination: boolean = false;
  @Input() hasExport: boolean = false;
  @Input() hasSearch: boolean = false;
  @Input() hasEdit: boolean = false;
  @Input() hasDelete: boolean = false;
  @Input() hasStatus: boolean = false;
  @Output() editEmit: EventEmitter<any> = new EventEmitter();
  @Output() deleteEmit: EventEmitter<number> = new EventEmitter();

  constructor() {}

  editRow(data:any) {
    this.editEmit.emit(data)
  }

  deleteRow(data:any) {
    this.deleteEmit.emit(data[this.keyRow])
  }
}
