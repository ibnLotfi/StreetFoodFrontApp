import { Product } from "../../products/models/product.model";
import { ProductCustomization } from "../../products/models/product-option.model";
import { MenuOption } from "../../products/models/menu-option.model";

export interface CartItem {
    id: string; // Unique ID for this cart item
    product: Product;
    quantity: number;
    customization?: ProductCustomization;
    isMenu: boolean;
    menuOptions?: MenuOption;
    unitPrice: number; // price for 1 item with all options
    totalPrice: number; // unitPrice * quantity
}