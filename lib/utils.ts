import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertAmountFromMiliunits(amount: number){
  return amount / 100;
};

export function convertAmountToMiliunits(amount: number){
  return Math.round(amount * 100)
};

export function formatCurrency(value: number){
  // const finalValue = convertAmountFromMiliunits(value);
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(value);
};
