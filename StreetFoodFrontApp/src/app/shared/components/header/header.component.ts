import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartSidebarComponent } from '../../../cart/cart-sidebar/cart-sidebar.component';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, CartSidebarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  cartCount$!: Observable<number>;
  isCartOpen = false;

  constructor(private cartService: CartService) {
  }
  
  ngOnInit(): void {
    this.cartCount$ = this.cartService.getCartCount();
  }

  openCart(): void {
    this.isCartOpen = true; // Modification
  }

  closeCart(): void {
    this.isCartOpen = false; // Ajout
  }

}
