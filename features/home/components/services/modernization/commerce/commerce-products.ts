export const COMMERCE_PRODUCTS = [
  {
    id: 'headphones',
    name: 'Studio Headphones',
    price: '₦84,000',
    qty: '1',
    inventory: '42 in stock',
    image:
      'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=900'
  },
  {
    id: 'sneakers',
    name: 'Motion Sneakers',
    price: '₦62,500',
    qty: '1',
    inventory: '18 in stock',
    image:
      'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=900'
  },
  {
    id: 'backpack',
    name: 'Utility Backpack',
    price: '₦49,900',
    qty: '2',
    inventory: '31 in stock',
    image:
      'https://images.pexels.com/photos/11726029/pexels-photo-11726029.jpeg?auto=compress&cs=tinysrgb&w=900'
  },
  {
    id: 'lamp',
    name: 'Studio Lamp',
    price: '₦37,000',
    qty: '1',
    inventory: '9 in stock',
    image:
      'https://images.pexels.com/photos/7184401/pexels-photo-7184401.jpeg?auto=compress&cs=tinysrgb&w=900'
  }
] as const;

export type CommerceProduct =
  (typeof COMMERCE_PRODUCTS)[number];
