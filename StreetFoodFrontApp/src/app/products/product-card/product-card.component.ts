import { Component, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from '../../cart/services/cart.service';
import { CartItem } from '../../cart/models/cart-item.model';
import { CommonModule } from '@angular/common';
import { ProductCustomizationComponent } from '../product-customization/product-customization.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, ProductCustomizationComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;
  isCustomizationModalOpen = false;

  constructor(private cartService: CartService) {}

    onAddToCart(): void {
    if (this.product.isCustomizable) {
      this.isCustomizationModalOpen = true;
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

    closeCustomizationModal(): void {
    this.isCustomizationModalOpen = false;
  }
}
