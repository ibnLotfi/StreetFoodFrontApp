import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  // @Input = recevoir des données du parent
  @Input() isOpen = false;
  @Input() title = '';

  // @Output = envoyer des événements au parent
  @Output() closeModal = new EventEmitter<void>();

  // Méthode pour fermer la modale
  close(): void {
    this.closeModal.emit();
  }

  // Empêcher la fermeture quand on clique sur le contenu
  onContentClick(event: Event): void {
    event.stopPropagation();
  }
}
