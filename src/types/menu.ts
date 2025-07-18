export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  category: 'appetizers' | 'mains' | 'desserts' | 'drinks';
  image?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}