export type ProductCategory = 'tacos' | 'pizza' | 'drink' | 'dessert' | 'extra';
export type ProductSize = 'M' | 'L' | 'XL'| "2XL";

export interface Product {

    id: string;
    name: string;
    description?: string;
    category: ProductCategory;
    basePrice: number;
    image?: string;
    isActive: boolean;
    IsCustomizable: boolean;
    availableSizes?: ProductSize[];
    // for simpliest product like drinks :
    size?: string;
    availableSupplements?: string[]; // Ids of available supplements
    availableMeats?: string[]; // Ids of available Meats
    availableSauces?: string[]; // Ids of available Sauces
}