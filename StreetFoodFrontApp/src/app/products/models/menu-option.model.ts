export interface MenuOption {
    fries? : {
        size: 'normal' | 'medium' | 'large';
        extraPrice: number; // 0, 1,5 etc 
    }
    drink?: {
        id: string;
        name: string;
        extraPrice: number; // 0 for included drinks, more for RedBull for example
    }
}