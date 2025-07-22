import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItem$ = new BehaviorSubject<CartItem[]>([]);

  constructor() {}

  getCartItems(): Observable<CartItem[]> {
    return this.cartItem$.asObservable();
  }

  addToCart(item: CartItem): void {
    const currentItems = this.cartItem$.value;

    // verifier si le produit existe déjà (meme config)
    const existingItemIndex = currentItems.findIndex((cartItem) =>
      this.isSameConfiguration(cartItem, item)
    );

    if (existingItemIndex > -1) {
      // si existe on augment la qtté
      currentItems[existingItemIndex].quantity += item.quantity;
      currentItems[existingItemIndex].totalPrice =
        currentItems[existingItemIndex].unitPrice *
        currentItems[existingItemIndex].quantity;
    }else{
      // sinon ajouter comme un nouveau
      currentItems.push(item);
    }

    this.cartItem$.next([...currentItems]);

  }

  clearCart(): void {
    this.cartItem$.next([]);
  }

  getCartTotal(): Observable<number> {
    return this.cartItem$.pipe(
      map( items => items.reduce((total,item) => total + item.totalPrice, 0))
    );
  }

  // Vérifier si c'est la même configuration
  private isSameConfiguration(item1: CartItem, item2: CartItem): boolean {
    // Pour l'instant, on compare juste l'ID du produit
    // TODO: Comparer aussi les options/personnalisations
    return item1.product.id === item2.product.id;
  }

  // Mettre à jour la quantité d'un item
  updateQuantity(itemId: string, quantity: number): void {
    const currentItems = this.cartItem$.value;
    const itemIndex = currentItems.findIndex(item => item.id === itemId);
    
    if (itemIndex > -1) {
      if (quantity <= 0) {
        // Si quantité 0 ou moins, on supprime
        this.removeFromCart(itemId);
      } else {
        currentItems[itemIndex].quantity = quantity;
        currentItems[itemIndex].totalPrice = 
          currentItems[itemIndex].unitPrice * quantity;
        this.cartItem$.next([...currentItems]);
      }
    }
  }

  // Supprimer un item du panier
  removeFromCart(itemId: string): void {
    const currentItems = this.cartItem$.value;
    const filteredItems = currentItems.filter(item => item.id !== itemId);
    this.cartItem$.next(filteredItems);
  }

  // Obtenir le nombre d'items dans le panier
  getCartCount(): Observable<number> {
    return this.cartItem$.pipe(
      map(items => items.reduce((count, item) => count + item.quantity, 0))
    );
  }
}
