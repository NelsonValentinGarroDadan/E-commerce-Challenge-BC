export type ShoppingItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
};


export type ShoppingCart = {
    items: ShoppingItem[];
    isOpen: boolean;
    addItem: (item: ShoppingItem) => void;
    removeItem: (id: string) => void;
    toggleCart: () => void;
    closeCart: () => void;
    updateQuantity: (id: string, quantity: number) => void;
 };