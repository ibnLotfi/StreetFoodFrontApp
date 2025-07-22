import { ProductSize } from "./product.model";

export type OptionType = 'meats' | 'sauces' | 'supplements' | 'size';

export interface ProductOption {
    id: string;
    name:string;
    type: OptionType;
    price: number; // Extra price (0 if included)
    available: boolean;
    // for sauces that can be used as supplements
    canBeExtra?: boolean;
    extraPrice?: number;
}

export interface ProductCustomization {
    numberOfMeats?: number; // Tacos 1, 2 ou 3+ meats
    selectedMeats?: string[];
    selectedSauces?: string[]; // maximum 2 for tacos (free)
    selectedSupplements?: string[]; // Including extra sauces
    size: ProductSize;
}