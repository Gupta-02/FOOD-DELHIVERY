'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { QuantityControl } from '@/components/cart/quantity-control';
import { Separator } from '@/components/ui/separator';
import { TrashIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

export default function CartPage() {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    subtotal, 
    tax, 
    deliveryFee, 
    total,
    itemsCount 
  } = useCart();

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id);
    toast.success(`${name} removed from cart`);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Looks like you haven't added any delicious items to your cart yet.
          </p>
          <Link href="/menu">
            <Button size="lg">
              <ShoppingBagIcon className="mr-2 h-5 w-5" />
              Start Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-foreground">Your Cart</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearCart}
            className="text-destructive hover:text-destructive"
          >
            <TrashIcon className="mr-2 h-4 w-4" />
            Clear Cart
          </Button>
        </div>
        <p className="text-muted-foreground">
          {itemsCount} {itemsCount === 1 ? 'item' : 'items'} in your cart
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-card rounded-lg border p-4 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <QuantityControl
                          quantity={item.quantity}
                          onIncrease={() => handleQuantityChange(item.id, item.quantity + 1)}
                          onDecrease={() => handleQuantityChange(item.id, item.quantity - 1)}
                          size="sm"
                        />
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="text-destructive hover:text-destructive"
                        >
                          <TrashIcon className="h-4 w-4" />
                          <span className="sr-only">Remove {item.name}</span>
                        </Button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">₹{item.price} each</p>
                        <p className="font-semibold text-lg">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-lg border p-6 shadow-sm sticky top-24"
          >
            <h2 className="font-semibold text-xl mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({itemsCount} items)</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Link href="/checkout">
                <Button size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>
              
              <Link href="/menu">
                <Button variant="outline" size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
            
            <div className="mt-6 text-xs text-muted-foreground">
              <p>📍 Free delivery on orders above ₹500</p>
              <p>🕒 Estimated delivery: 30-45 minutes</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}