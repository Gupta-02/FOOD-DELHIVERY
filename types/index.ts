export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
  rating?: number;
  preparationTime?: string;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  itemCount: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered';
  deliveryDetails: DeliveryDetails;
  createdAt: Date;
}

export interface DeliveryDetails {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  specialInstructions?: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  createdAt: Date;
  isAnonymous?: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type ViewMode = 'grid' | 'list';