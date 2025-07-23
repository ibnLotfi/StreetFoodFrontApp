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
      image:
        'https://images.unsplash.com/photo-1585238342107-49a3cdace47f?q=80&w=767&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'tacos',
      basePrice: 6,
      isActive: true,
      isCustomizable: true,
      availableSizes: ['M', 'L', 'XL'],
    },
    {
      id: '2',
      name: 'Tacos Poulet',
      image:
        'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'tacos',
      basePrice: 7,
      isActive: true,
      isCustomizable: false,
    },
    {
      id: '3',
      name: 'Tacos Kebab',
      category: 'tacos',
      image:
        'https://images.unsplash.com/photo-1699728088614-7d1d4277414b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      basePrice: 7.5,
      isActive: true,
      isCustomizable: false,
    },

    // Pizzas
    {
      id: '4',
      name: 'Pizza sur mesure',
      category: 'pizza',
      image:
        'https://plus.unsplash.com/premium_photo-1677607235809-7c5f0b240117?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      basePrice: 8,
      isActive: true,
      isCustomizable: true,
      availableSizes: ['M', 'L', 'XL', '2XL'],
      availableBases: ['b1', 'b2'],
    },
    {
      id: '5',
      name: 'Pizza Margherita',
      category: 'pizza',
      image:
        'https://images.unsplash.com/photo-1551105018-7c047ef2c508?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      basePrice: 9,
      isActive: true,
      isCustomizable: false,
    },

    // Boissons
    {
      id: '6',
      name: 'Coca-Cola',
      image:
        'https://images.unsplash.com/photo-1667204651371-5d4a65b8b5a9?q=80&w=716&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'drink',
      basePrice: 2.5,
      isActive: true,
      isCustomizable: false,
      size: '33cl',
    },
    {
      id: '7',
      name: 'Eau',
      category: 'drink',
      image:
        'https://images.unsplash.com/photo-1616118132534-381148898bb4?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      basePrice: 1.5,
      isActive: true,
      isCustomizable: false,
      size: '50cl',
    },
    {
      id: '8',
      name: 'Red Bull',
      category: 'drink',
      basePrice: 4,
      isActive: true,
      isCustomizable: false,
      size: '25cl',
      menuPrice: 2,
      image:
        'https://images.unsplash.com/photo-1640317455707-d83d8d2e938f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
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
    // bases pizza
    { id: 'b1', name: 'Base Tomate', type: 'bases', price: 0, available: true },
    { id: 'b2', name: 'Base Crème', type: 'bases', price: 0, available: true },
  ];

  getProducts(): Observable<Product[]> {
    return of(this.mockProducts);
  }

  getProductById(id: string): Observable<Product | undefined> {
    return of(this.mockProducts.find((p) => p.id == id));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return of(this.mockProducts.filter((p) => p.category === category));
  }

  getProductOptions(type?: string): Observable<ProductOption[]> {
    if (type) {
      return of(this.mockOptions.filter((o) => o.type === type));
    }
    return of(this.mockOptions);
  }
}
