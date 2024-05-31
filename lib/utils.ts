import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, fractionDigits: boolean = true) {
  const formatter = new Intl.NumberFormat('en-US', {
    currency: 'INR',
    style: 'currency',
    maximumFractionDigits: fractionDigits ? 0 : 2
  });
  return formatter.format(value);
}
