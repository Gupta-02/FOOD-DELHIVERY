'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, FoodItem } from '@/types';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface CartState {
  items: CartItem[];
  total: number;
  itemsCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: FoodItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartContextType extends CartState {
  addItem: (item: FoodItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  tax: number;
  deliveryFee: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const TAX_RATE = 0.08; // 8% tax
const DELIVERY_FEE = 50;

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return calculateTotals(updatedItems);
      } else {
        const newItems = [...state.items, { ...action.payload, quantity: 1 }];
        return calculateTotals(newItems);
      }
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return calculateTotals(newItems);
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        const newItems = state.items.filter(item => item.id !== action.payload.id);
        return calculateTotals(newItems);
      }
      
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return calculateTotals(updatedItems);
    }
    
    case 'CLEAR_CART':
      return { items: [], total: 0, itemsCount: 0 };
    
    case 'LOAD_CART':
      return calculateTotals(action.payload);
    
    default:
      return state;
  }
}

function calculateTotals(items: CartItem[]): CartState {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + (items.length > 0 ? DELIVERY_FEE : 0);
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  return { items, total, itemsCount };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [storedItems] = useLocalStorage<CartItem[]>('cart-items', []);
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0, itemsCount: 0 });

  useEffect(() => {
    dispatch({ type: 'LOAD_CART', payload: storedItems });
  }, [storedItems]);

  useEffect(() => {
    localStorage.setItem('cart-items', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: FoodItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * TAX_RATE;
  const deliveryFee = state.items.length > 0 ? DELIVERY_FEE : 0;

  return (
    <CartContext.Provider value={{
      ...state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      subtotal,
      tax,
      deliveryFee
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}