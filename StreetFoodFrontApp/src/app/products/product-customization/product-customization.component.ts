import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../../cart/services/cart.service';
import { Product, ProductSize } from '../models/product.model';
import {
  ProductCustomization,
  ProductOption,
} from '../models/product-option.model';
import { CartItem } from '../../cart/models/cart-item.model';
import { MenuOption } from '../models/menu-option.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-product-customization',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormsModule],
  templateUrl: './product-customization.component.html',
  styleUrl: './product-customization.component.scss',
})
export class ProductCustomizationComponent {
  @Input() product!: Product;
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();

  // Options disponibles
  meats: ProductOption[] = [];
  sauces: ProductOption[] = [];
  supplements: ProductOption[] = [];
  bases: ProductOption[] = [];
  drinks: Product[] = [];

  // Sélections de l'utilisateur
  selectedSize: ProductSize = 'M';
  selectedBase = 'b1';

  selectedMeats: string[] = [];
  selectedSauces: string[] = [];
  selectedSupplements: string[] = [];
  private _numberOfMeats = 1;
  get numberOfMeats(): number {
    return this._numberOfMeats;
  }
  set numberOfMeats(value: number) {
    this._numberOfMeats = value;
    // Réinitialiser les viandes sélectionnées si on diminue le nombre
    if (this.selectedMeats.length > value) {
      this.selectedMeats = this.selectedMeats.slice(0, value);
    }
  }

  // Menu
  isMenu = false;
  selectedFriesSize: 'normal' | 'medium' | 'large' = 'normal';
  selectedDrink = '';

  quantity = 1;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadOptions();
    if (this.product?.availableSizes?.length) {
      this.selectedSize = this.product.availableSizes[0];
    }
  }

  loadOptions(): void {
    this.loadDrinks();
    this.productService.getProductOptions('meats').subscribe((options) => {
      this.meats = options;
    });

    this.productService.getProductOptions('sauces').subscribe((options) => {
      this.sauces = options;
    });

    this.productService.getProductOptions('bases').subscribe((options) => {
      this.bases = options;
      // Sélectionner la première base par défaut
      if (this.product?.category === 'pizza' && options.length > 0) {
        this.selectedBase = options[0].id;
      }
    });

    this.productService
      .getProductOptions('supplements')
      .subscribe((options) => {
        this.supplements = options;
      });
  }

  close(): void {
    this.resetSelections();
    this.closeModal.emit();
  }

  loadDrinks(): void {
    this.productService.getProductsByCategory('drink').subscribe((drinks) => {
      this.drinks = drinks;
    });
  }
  resetSelections(): void {
    this.selectedMeats = [];
    this.selectedSauces = [];
    this.selectedSupplements = [];
    this.isMenu = false;
    this.quantity = 1;
    this.selectedBase = '';
  }

  // Calcul du prix total
  calculateTotalPrice(): number {
    let price = this.getBasePrice();

    // Prix selon nombre de viandes pour tacos
    if (this.product?.category === 'tacos') {
      if (this.numberOfMeats === 2) {
        price += 2;
      } else if (this.numberOfMeats === 3) {
        price += 3.5;
      }
    }

    // Ajout des suppléments
    this.selectedSupplements.forEach((suppId) => {
      const supp = this.supplements.find((s) => s.id === suppId);
      if (supp) price += supp.price;
    });

    // Si menu
    if (this.isMenu) {
      price += 2; // Prix du menu

      // Frites
      if (this.selectedFriesSize === 'medium') price += 1.5;
      if (this.selectedFriesSize === 'large') price += 2;

      // Boisson avec supplément éventuel
      const selectedDrinkObj = this.drinks.find(
        (d) => d.id === this.selectedDrink
      );
      if (selectedDrinkObj?.menuPrice) {
        price += selectedDrinkObj.menuPrice;
      }
    }

    return price * this.quantity;
  }

  getBasePrice(): number {
    // Prix selon la taille
    const sizeMultiplier = {
      M: 1,
      L: 1.5,
      XL: 2,
      '2XL': 2.5,
    };
    return this.product.basePrice * (sizeMultiplier[this.selectedSize] || 1);
  }

  // Méthodes pour gérer les sélections
  toggleMeat(meatId: string): void {
    const index = this.selectedMeats.indexOf(meatId);
    if (index > -1) {
      this.selectedMeats.splice(index, 1);
    } else if (this.selectedMeats.length < this.numberOfMeats) {
      this.selectedMeats.push(meatId);
    }
  }

  toggleSauce(sauceId: string): void {
    const index = this.selectedSauces.indexOf(sauceId);
    if (index > -1) {
      this.selectedSauces.splice(index, 1);
    } else if (this.selectedSauces.length < 2) {
      this.selectedSauces.push(sauceId);
    }
  }

  toggleSupplement(suppId: string): void {
    const index = this.selectedSupplements.indexOf(suppId);
    if (index > -1) {
      this.selectedSupplements.splice(index, 1);
    } else {
      this.selectedSupplements.push(suppId);
    }
  }

  // Helper pour afficher le prix par taille
  getBasePriceForSize(size: ProductSize): number {
    const sizeMultiplier: Record<ProductSize, number> = {
      M: 1,
      L: 1.5,
      XL: 2,
      '2XL': 2.5,
    };
    return this.product.basePrice * (sizeMultiplier[size] || 1);
  }

  // Labels pour les frites
  getFriesLabel(size: string): string {
    const labels: Record<string, string> = {
      normal: 'Normales',
      medium: 'Moyennes (+1.5€)',
      large: 'Grandes (+2€)',
    };
    return labels[size] || size;
  }

  // Validation du formulaire
  isFormValid(): boolean {
  // Pour les tacos
  if (this.product?.category === 'tacos') {
    // Vérifier le nombre de viandes
    if (this.selectedMeats.length !== this.numberOfMeats) {
      return false;
    }
    // Vérifier les sauces
    if (this.selectedSauces.length === 0) {
      return false;
    }
  }
  
  // Pour les pizzas
  if (this.product?.category === 'pizza') {
    // Vérifier qu'une base est sélectionnée
    if (!this.selectedBase) {
      return false;
    }
    // Si des viandes sont prévues, vérifier qu'elles sont sélectionnées
    if (this.numberOfMeats > 0 && this.selectedMeats.length !== this.numberOfMeats) {
      return false;
    }
  }
  
  return true;
}

  // Helper pour l'affichage du prix des boissons
  getDrinkLabel(drink: Product): string {
    if (drink.menuPrice && drink.menuPrice > 0) {
      return `${drink.name} (+${drink.menuPrice}€)`;
    }
    return drink.name;
  }

  // Méthode addToCart améliorée
  addToCart(): void {
    if (!this.isFormValid()) return;

    const customization: ProductCustomization = {
      size: this.selectedSize,
      numberOfMeats: this.numberOfMeats,
      selectedMeats: this.selectedMeats,
      selectedSauces: this.selectedSauces,
      selectedSupplements: this.selectedSupplements,
      selectedBase: this.selectedBase 
    };

    const menuOptions: MenuOption | undefined = this.isMenu
      ? {
          fries: {
            size: this.selectedFriesSize,
            extraPrice:
              this.selectedFriesSize === 'medium'
                ? 1.5
                : this.selectedFriesSize === 'large'
                ? 2
                : 0,
          },
        }
      : undefined;

    const cartItem: CartItem = {
      id: Date.now().toString(),
      product: this.product,
      quantity: this.quantity,
      customization: customization,
      isMenu: this.isMenu,
      menuOptions: menuOptions,
      unitPrice: this.calculateTotalPrice() / this.quantity,
      totalPrice: this.calculateTotalPrice(),
    };

    this.cartService.addToCart(cartItem);
    console.log('Produit personnalisé ajouté au panier:', cartItem);
    this.close();
  }
}
