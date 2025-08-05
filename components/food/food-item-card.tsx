'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FoodItem } from '@/types';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusIcon, StarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface FoodItemCardProps {
  item: FoodItem;
  viewMode?: 'grid' | 'list';
}

export function FoodItemCard({ item, viewMode = 'grid' }: FoodItemCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(item);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        className="bg-card rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-all duration-200"
      >
        <div className="flex flex-col sm:flex-row">
          <div className="relative h-48 sm:h-32 sm:w-48 flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 192px"
            />
            {item.featured && (
              <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                Featured
              </Badge>
            )}
          </div>
          
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">₹{item.price}</p>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {item.description}
              </p>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                {item.rating && (
                  <div className="flex items-center space-x-1">
                    <StarIconSolid className="h-4 w-4 text-yellow-400" />
                    <span>{item.rating}</span>
                  </div>
                )}
                {item.preparationTime && (
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>{item.preparationTime}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleAddToCart} size="sm">
                <PlusIcon className="h-4 w-4 mr-1" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-card rounded-lg border shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-48">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {item.featured && (
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
          {item.rating && (
            <div className="flex items-center space-x-1">
              <StarIconSolid className="h-4 w-4 text-yellow-400" />
              <span>{item.rating}</span>
            </div>
          )}
          {item.preparationTime && (
            <div className="flex items-center space-x-1">
              <ClockIcon className="h-4 w-4" />
              <span>{item.preparationTime}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-primary">₹{item.price}</p>
          <Button onClick={handleAddToCart} size="sm">
            <PlusIcon className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
}