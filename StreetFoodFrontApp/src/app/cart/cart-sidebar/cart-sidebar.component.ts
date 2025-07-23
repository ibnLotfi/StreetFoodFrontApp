import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-sidebar',
  imports: [CommonModule,],
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.scss'
})
export class CartSidebarComponent implements OnInit {
 @Input() isOpen = false;
  @Output() closeSidebar = new EventEmitter<void>();

  cartItems$!: Observable<CartItem[]>;
  cartTotal$!: Observable<number>;
  deliveryFee = 2.5; // Frais de livraison fixes

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartService.getCartItems();
    this.cartTotal$ = this.cartService.getCartTotal();
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

  checkout(): void {
    // TODO: Implémenter le checkout
    console.log('Procéder au paiement');
    alert('Fonctionnalité de paiement à venir !');
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
