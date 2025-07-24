import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-sidebar',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.scss',
})
export class CartSidebarComponent implements OnInit {
  @Input() isOpen = false;
  @Output() closeSidebar = new EventEmitter<void>();

  cartItems$!: Observable<CartItem[]>;
  cartTotal$!: Observable<number>;
  deliveryFee = 2.5; // Frais de livraison fixes

  phoneValidated = false;
  showSmsValidation = false;
  smsCode = '';
validatedPhone = '';

  customerInfo = {
    fullName: '',
    email: '',
    phone: '',
    deliveryType: 'delivery' as 'delivery' | 'pickup',
    address: '',
    postalCode: '',
    city: '',
  };

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartService.getCartItems();
    this.cartTotal$ = this.cartService.getCartTotal();
  }

onPhoneChange(): void {
  // Si le numéro change après validation, on réinitialise
  if (this.phoneValidated && this.customerInfo.phone !== this.validatedPhone) {
    this.phoneValidated = false;
    this.showSmsValidation = false;
    this.smsCode = '';
  }
}

// Méthode pour changer volontairement de numéro
changePhoneNumber(): void {
  this.phoneValidated = false;
  this.showSmsValidation = false;
  this.smsCode = '';
  this.validatedPhone = '';
  this.customerInfo.phone = '';
}

  // Ajoutez ces méthodes
sendSmsCode(): void {
  // TODO: Appeler l'API pour envoyer le SMS
  console.log('Envoi SMS au:', this.customerInfo.phone);
  this.showSmsValidation = true;
  
  // Simulation
  setTimeout(() => {
    alert('Code SMS envoyé ! (Code test: 1234)');
  }, 500);
}

isFormValid(): boolean {
  const info = this.customerInfo;
  
  // Vérifications de base
  if (!info.fullName || !info.email || !info.phone) {
    return false;
  }
  
  // Si livraison, vérifier l'adresse
  if (info.deliveryType === 'delivery') {
    if (!info.address || !info.postalCode || !info.city) {
      return false;
    }
  }
  
  return true;
}

// Modifiez validateSmsCode pour sauvegarder le numéro validé
validateSmsCode(): void {
  // TODO: Vérifier avec l'API
  if (this.smsCode === '1234') {
    this.phoneValidated = true;
    this.showSmsValidation = false;
    this.validatedPhone = this.customerInfo.phone; // Sauvegarder le numéro validé
    alert('Numéro vérifié avec succès !');
  } else {
    alert('Code incorrect');
  }
}

// Modifiez la méthode checkout
checkout(): void {
  if (!this.phoneValidated) {
    alert('Veuillez d\'abord vérifier votre numéro de téléphone');
    return;
  }
  
  // TODO: Procéder au paiement
  console.log('Commande:', this.customerInfo);
  alert('Redirection vers le paiement...');
}

getDeliveryFee(): number {
  return this.customerInfo.deliveryType === 'pickup' ? 0 : this.deliveryFee;
}
  close(): void {
    this.closeSidebar.emit();
  }

  updateQuantity(itemId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(itemId);
    } else {
      this.cartService.updateQuantity(itemId, quantity);
    }
  }

  removeItem(itemId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      this.cartService.removeFromCart(itemId);
    }
  }

  clearCart(): void {
    if (confirm('Êtes-vous sûr de vouloir vider le panier ?')) {
      this.cartService.clearCart();
    }
  }

  // Helper pour afficher les détails d'un item
  getItemDescription(item: CartItem): string {
    let description = item.product.name;

    if (item.customization) {
      description += ` - Taille ${item.customization.size}`;

      if (item.customization.selectedMeats?.length) {
        description += `, ${item.customization.selectedMeats.length} viande(s)`;
      }
    }

    if (item.isMenu) {
      description += ' (Menu)';
    }

    return description;
  }
}
