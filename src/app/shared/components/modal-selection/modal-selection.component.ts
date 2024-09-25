import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { IconCustomComponent } from '@Component/IconCustom';
import { images } from '@Global/constants';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-custom-modal',
  standalone: true,
  imports: [NgFor, NgIf, FontAwesomeModule, NgClass, IconCustomComponent],
  templateUrl: './modal-selection.component.html'
})
export class ModalSelectionComponent {
    readonly images = images;
    @Input() isModalOpen: boolean = false;
    @Output() close = new EventEmitter<void>();
  
    showConfirmation: boolean = false;  // Para mostrar la confirmación
    selectedImageUrl: string = '';      // Para almacenar la imagen seleccionada
  
    constructor(private storageService: StorageService) {}
  
    // Cerrar el modal
    closeModal() {
      this.close.emit();
    }
  
    // Abrir confirmación al seleccionar una imagen
    confirmImageSelection(imageUrl: string) {
      this.selectedImageUrl = imageUrl;
      this.showConfirmation = true;  // Mostrar la confirmación
    }
  
    // Cancelar la selección de la imagen
    cancelSelection() {
      this.showConfirmation = false;
      this.selectedImageUrl = ''; // Reiniciar la selección
    }
  
    // Actualizar el fondo en el localStorage
    updateBackground() {
      if (this.selectedImageUrl) {
        this.storageService.setBackground(this.selectedImageUrl)
        this.showConfirmation = false;
        this.closeModal();  // Cerrar el modal después de confirmar
      }
    }
}
