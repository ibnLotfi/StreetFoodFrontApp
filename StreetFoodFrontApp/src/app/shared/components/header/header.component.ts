import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  cartCount$!: Observable<number>;

  constructor(private cartService: CartService) {
  }
  
  ngOnInit(): void {
    this.cartCount$ = this.cartService.getCartCount();
  }

  openCart(){
    console.log('Open cart');
  }

}
