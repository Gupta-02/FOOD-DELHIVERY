'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: 'sm' | 'default';
}

export function QuantityControl({ 
  quantity, 
  onIncrease, 
  onDecrease, 
  size = 'default' 
}: QuantityControlProps) {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size={size}
        onClick={onDecrease}
        className="h-8 w-8 p-0"
        disabled={quantity <= 0}
        aria-label="Decrease quantity"
      >
        <MinusIcon className="h-4 w-4" />
      </Button>
      
      <span className="w-8 text-center font-medium" aria-label={`Quantity: ${quantity}`}>
        {quantity}
      </span>
      
      <Button
        variant="outline"
        size={size}
        onClick={onIncrease}
        className="h-8 w-8 p-0"
        aria-label="Increase quantity"
      >
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}