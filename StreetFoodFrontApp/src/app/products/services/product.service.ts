import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductOption } from '../models/product-option.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  private mockProducts: Product[] = [
  // Tacos
  {
    id: '1',
    name: 'Tacos sur mesure',
    category: 'tacos',
    basePrice: 6,
    isActive: true,
    isCustomizable: true,
    availableSizes: ['M', 'L', 'XL']
  },
  {
    id: '2',
    name: 'Tacos Poulet',
    category: 'tacos',
    basePrice: 7,
    isActive: true,
    isCustomizable: false
  },
  {
    id: '3',
    name: 'Tacos Kebab',
    category: 'tacos',
    basePrice: 7.5,
    isActive: true,
    isCustomizable: false
  },
  
  // Pizzas
  {
    id: '4',
    name: 'Pizza sur mesure',
    category: 'pizza',
    basePrice: 8,
    isActive: true,
    isCustomizable: true,
    availableSizes: ['M', 'L', 'XL']
  },
  {
    id: '5',
    name: 'Pizza Margherita',
    category: 'pizza',
    basePrice: 9,
    isActive: true,
    isCustomizable: false
  },
  
  // Boissons
  {
    id: '6',
    name: 'Coca-Cola',
    category: 'drink',
    basePrice: 2.5,
    isActive: true,
    isCustomizable: false,
    size: '33cl'
  },
  {
    id: '7',
    name: 'Eau',
    category: 'drink',
    basePrice: 1.5,
    isActive: true,
    isCustomizable: false,
    size: '50cl'
  }
];

  private mockOptions: ProductOption[] = [
    // Meats
    { id: 'm1', name: 'Poulet', type: 'meats', price: 0, available: true },
    { id: 'm2', name: 'Kebab', type: 'meats', price: 0, available: true },
    { id: 'm3', name: 'Kefta', type: 'meats', price: 0, available: true },
    { id: 'm4', name: 'Merguez', type: 'meats', price: 0, available: true },

    // Sauces
    {
      id: 's1',
      name: 'Algérienne',
      type: 'sauces',
      price: 0,
      available: true,
      canBeExtra: true,
      extraPrice: 0.5,
    },
    {
      id: 's2',
      name: 'Blanche',
      type: 'sauces',
      price: 0,
      available: true,
      canBeExtra: true,
      extraPrice: 0.5,
    },
    {
      id: 's3',
      name: 'Harissa',
      type: 'sauces',
      price: 0,
      available: true,
      canBeExtra: true,
      extraPrice: 0.5,
    },

    // Supplements
    {
      id: 'sup1',
      name: 'Fromage supplémentaire',
      type: 'supplements',
      price: 1.5,
      available: true,
    },
    { id: 'sup2', name: 'Œuf', type: 'supplements', price: 1, available: true },
    {
      id: 'sup3',
      name: 'Nuggets',
      type: 'supplements',
      price: 2,
      available: true,
    },
  ];

  getProducts(): Observable<Product[]> {
    return of(this.mockProducts);
  }

  getProductById(id: string): Observable<Product | undefined>{
    return of(this.mockProducts.find(p => p.id == id));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return of(this.mockProducts.filter(p => p.category === category));
  }

  getProductOptions(type?: string): Observable<ProductOption[]> {
    if (type) {
      return of(this.mockOptions.filter(o => o.type === type));
    }
    return of(this.mockOptions);
  }
}
