'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircleIcon, ClockIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      setOrder(JSON.parse(lastOrder));
    }
  }, []);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <Link href="/menu">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground text-lg">
            Thank you for your order. We're preparing your delicious meal!
          </p>
        </motion.div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
          <p className="text-green-800 dark:text-green-200 font-semibold">
            Order ID: {order.id}
          </p>
          <p className="text-green-600 dark:text-green-300 text-sm">
            Estimated delivery: 30-45 minutes
          </p>
        </div>
      </motion.div>

      <div className="space-y-6">
        {/* Order Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5" />
                Order Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium">Order Confirmed</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="font-medium">Preparing</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-muted rounded-full"></div>
                    <span className="text-muted-foreground">Out for Delivery</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-muted rounded-full"></div>
                    <span className="text-muted-foreground">Delivered</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Delivery Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5" />
                Delivery Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium">{order.deliveryDetails.fullName}</p>
                <p className="text-muted-foreground text-sm">{order.deliveryDetails.email}</p>
              </div>
              <div className="flex items-start gap-2">
                <PhoneIcon className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span className="text-sm">{order.deliveryDetails.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPinIcon className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div className="text-sm">
                  <p>{order.deliveryDetails.address}</p>
                  <p>{order.deliveryDetails.city}, {order.deliveryDetails.postalCode}</p>
                </div>
              </div>
              {order.deliveryDetails.specialInstructions && (
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm font-medium mb-1">Special Instructions:</p>
                  <p className="text-sm text-muted-foreground">
                    {order.deliveryDetails.specialInstructions}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-muted-foreground text-sm">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">₹{item.price * item.quantity}</p>
                </div>
              ))}
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{(order.total - (order.total * 0.08) - 50).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>₹{(order.total * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span>₹50.00</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/menu" className="flex-1">
            <Button variant="outline" size="lg" className="w-full">
              Order Again
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button size="lg" className="w-full">
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Support */}
        <div className="text-center text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">
          <p className="mb-2">Need help with your order?</p>
          <p>📞 Call us at +91 98765 43210</p>
          <p>📧 Email: support@foodieexpress.com</p>
        </div>
      </div>
    </div>
  );
}