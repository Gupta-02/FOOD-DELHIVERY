'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/auth-context';
import { Order } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ClipboardDocumentCheckIcon, 
  ClockIcon, 
  CheckCircleIcon,
  TruckIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';

const statusConfig = {
  pending: { 
    label: 'Pending', 
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    icon: ClockIcon 
  },
  confirmed: { 
    label: 'Confirmed', 
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    icon: CheckCircleIcon 
  },
  preparing: { 
    label: 'Preparing', 
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    icon: ClockIcon 
  },
  delivered: { 
    label: 'Delivered', 
    color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    icon: TruckIcon 
  },
};

export default function OrdersPage() {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;

    const loadOrders = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const storedOrders = JSON.parse(localStorage.getItem('user-orders') || '[]');
      
      // Filter orders for current user (including anonymous orders if guest)
      const userOrders = storedOrders.filter((order: Order) => {
        if (user?.isAnonymous) {
          // For guest users, show orders from current session
          return order.userId === user.id || order.userId === 'anonymous';
        }
        return order.userId === user?.id;
      });
      
      // Sort by creation date (newest first)
      userOrders.sort((a: Order, b: Order) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      setOrders(userOrders);
      setLoading(false);
    };

    loadOrders();
  }, [user, isAuthenticated]);

  const reorderItems = (order: Order) => {
    // Add all items from the order back to cart
    order.items.forEach(item => {
      // This would typically dispatch to cart context
      // For now, we'll just show a success message
    });
    // toast.success('Items added to cart!');
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ClipboardDocumentCheckIcon className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-foreground mb-4">Sign In Required</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Please sign in to view your order history.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" size="lg">Create Account</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="h-8 bg-muted rounded w-48 mb-2"></div>
          <div className="h-4 bg-muted rounded w-64"></div>
        </div>
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-card rounded-lg border p-6">
              <div className="h-6 bg-muted rounded w-32 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
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
        <h1 className="text-3xl font-bold text-foreground mb-2">Your Orders</h1>
        <p className="text-muted-foreground">
          {user?.isAnonymous ? 'Your guest session orders' : 'Track and manage your order history'}
        </p>
      </motion.div>

      {orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <ShoppingBagIcon className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-foreground mb-4">No Orders Yet</h2>
          <p className="text-muted-foreground text-lg mb-8">
            You haven't placed any orders yet. Start exploring our delicious menu!
          </p>
          <Link href="/menu">
            <Button size="lg">
              Browse Menu
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {orders.map((order, index) => {
              const status = statusConfig[order.status];
              const StatusIcon = status.icon;
              
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                >
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <ClipboardDocumentCheckIcon className="h-5 w-5" />
                            Order #{order.id.split('-')[1]}
                          </CardTitle>
                          <p className="text-muted-foreground text-sm">
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Badge className={status.color}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {status.label}
                          </Badge>
                          <div className="text-right">
                            <p className="font-semibold text-lg">₹{order.total.toFixed(2)}</p>
                            <p className="text-muted-foreground text-sm">
                              {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Order Items */}
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-3">
                            <div className="relative h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{item.name}</p>
                              <p className="text-muted-foreground text-xs">
                                Qty: {item.quantity} × ₹{item.price}
                              </p>
                            </div>
                            <p className="font-semibold text-sm">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                      
                      <Separator />
                      
                      {/* Delivery Address */}
                      <div className="text-sm">
                        <p className="font-medium mb-1">Delivery Address:</p>
                        <p className="text-muted-foreground">
                          {order.deliveryDetails.address}, {order.deliveryDetails.city}, {order.deliveryDetails.postalCode}
                        </p>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Reorder Items
                        </Button>
                        {order.status === 'delivered' && (
                          <Button variant="outline" size="sm" className="flex-1">
                            Rate Order
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
      
      {/* Continue Shopping */}
      {orders.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center pt-8"
        >
          <Link href="/menu">
            <Button variant="outline" size="lg">
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}