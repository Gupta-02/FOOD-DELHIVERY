'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group"
    >
      <Link href={`/menu?category=${category.id}`}>
        <div className="bg-card rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-all duration-200">
          <div className="relative h-32">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
            <p className="text-muted-foreground text-sm">
              {category.itemCount} items
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}