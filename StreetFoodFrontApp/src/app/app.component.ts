import { Component } from '@angular/core';
import { ProductListComponent } from './products/product-list/product-list.component';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [ProductListComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'StreetFoodFrontApp';
}
