import { FoodItem, Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'appetizers',
    name: 'Appetizers',
    image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=500',
    itemCount: 8
  },
  {
    id: 'mains',
    name: 'Main Dishes',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500',
    itemCount: 12
  },
  {
    id: 'desserts',
    name: 'Desserts',
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=500',
    itemCount: 6
  },
  {
    id: 'beverages',
    name: 'Beverages',
    image: 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=500',
    itemCount: 10
  },
  {
    id: 'pizza',
    name: 'Pizza',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=500',
    itemCount: 8
  },
  {
    id: 'burgers',
    name: 'Burgers',
    image: 'https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=500',
    itemCount: 5
  }
];

export const foodItems: FoodItem[] = [
  // Appetizers
  {
    id: '1',
    name: 'Crispy Spring Rolls',
    description: 'Fresh vegetables wrapped in crispy pastry, served with sweet chili sauce',
    price: 299,
    image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'appetizers',
    featured: true,
    rating: 4.5,
    preparationTime: '15-20 min'
  },
  {
    id: '2',
    name: 'Chicken Wings',
    description: 'Spicy buffalo wings with ranch dip and celery sticks',
    price: 399,
    image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'appetizers',
    rating: 4.8,
    preparationTime: '20-25 min'
  },
  {
    id: '3',
    name: 'Mozzarella Sticks',
    description: 'Golden fried mozzarella with marinara sauce',
    price: 349,
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'appetizers',
    rating: 4.3,
    preparationTime: '10-15 min'
  },

  // Main Dishes
  {
    id: '4',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with lemon herb butter and seasonal vegetables',
    price: 799,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'mains',
    featured: true,
    rating: 4.9,
    preparationTime: '25-30 min'
  },
  {
    id: '5',
    name: 'Chicken Tikka Masala',
    description: 'Tender chicken in rich tomato and cream sauce with basmati rice',
    price: 599,
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'mains',
    rating: 4.7,
    preparationTime: '30-35 min'
  },
  {
    id: '6',
    name: 'Beef Wellington',
    description: 'Premium beef tenderloin wrapped in puff pastry with mushroom duxelles',
    price: 1299,
    image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'mains',
    rating: 4.8,
    preparationTime: '45-50 min'
  },

  // Pizza
  {
    id: '7',
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh mozzarella, tomatoes, and basil',
    price: 549,
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'pizza',
    featured: true,
    rating: 4.6,
    preparationTime: '15-20 min'
  },
  {
    id: '8',
    name: 'Pepperoni Supreme',
    description: 'Loaded with pepperoni, mushrooms, bell peppers, and extra cheese',
    price: 699,
    image: 'https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'pizza',
    rating: 4.4,
    preparationTime: '18-22 min'
  },

  // Burgers
  {
    id: '9',
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with cheese, lettuce, tomato, and special sauce',
    price: 449,
    image: 'https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'burgers',
    rating: 4.5,
    preparationTime: '12-15 min'
  },
  {
    id: '10',
    name: 'Veggie Burger',
    description: 'Plant-based patty with avocado, sprouts, and chipotle mayo',
    price: 399,
    image: 'https://images.pexels.com/photos/1556698/pexels-photo-1556698.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'burgers',
    featured: true,
    rating: 4.2,
    preparationTime: '10-12 min'
  },

  // Desserts
  {
    id: '11',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
    price: 349,
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'desserts',
    rating: 4.9,
    preparationTime: '8-10 min'
  },
  {
    id: '12',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone',
    price: 299,
    image: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'desserts',
    rating: 4.6,
    preparationTime: '5 min'
  },

  // Beverages
  {
    id: '13',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice, no added sugar',
    price: 149,
    image: 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'beverages',
    rating: 4.3,
    preparationTime: '2-3 min'
  },
  {
    id: '14',
    name: 'Iced Coffee',
    description: 'Cold brew coffee with ice and your choice of milk',
    price: 199,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'beverages',
    rating: 4.4,
    preparationTime: '3-5 min'
  }
];

export const mockApiDelay = () => new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));