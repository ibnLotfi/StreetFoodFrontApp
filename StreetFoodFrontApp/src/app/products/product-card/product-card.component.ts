import { Component, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from '../../cart/services/cart.service';
import { CartItem } from '../../cart/models/cart-item.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

    onAddToCart(): void {
    if (this.product.isCustomizable) {
      // TODO: Ouvrir la modale de personnalisation
      console.log('Ouvrir modale pour:', this.product.name);
    } else {
      // Produit simple, ajouter directement
      this.addSimpleProduct();
    }
  }

  private addSimpleProduct(): void {
    const cartItem: CartItem = {
      id: Date.now().toString(), // ID temporaire
      product: this.product,
      quantity: 1,
      isMenu: false,
      unitPrice: this.product.basePrice,
      totalPrice: this.product.basePrice
    };
    
    this.cartService.addToCart(cartItem);
    console.log('Produit ajouté au panier');
  }
}
