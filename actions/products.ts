'use server';
import products from '@/data/products.json';
import { shuffle } from '@/lib/helpers';

const CATEGORY_MAPPING = {
  Electronics: ['Electronics', 'Computers & Accessories', 'Home Improvement'],
  Watches: ['Watches'],
  Groceries: ['Grocery & Gourmet Foods'],
  Fashion: [
    'Clothing & Accessories',
    'Shoes & Handbags',
    'Bags, Wallets and Luggage'
  ],
  'Home & Kitchen': ['Home & Kitchen', 'Office Products', 'Outdoor Living']
};

export async function getProducts(category: Category) {
  return products.filter(
    (p) => p.category && CATEGORY_MAPPING[category]?.includes(p.category)
  );
}

export async function getRecommendations() {
  return shuffle(products).slice(0, 10);
}

export async function getProduct(id: string) {
  const product = products.find((p) => p.id == id);
  return product;
}

export type Product = (typeof products)[0];
export type Category = keyof typeof CATEGORY_MAPPING;
