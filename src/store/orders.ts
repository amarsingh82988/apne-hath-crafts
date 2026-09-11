import type { CartLine } from "@/store/shop";

export type Order = {
  id: string;
  createdAt: string;
  status: "confirmed" | "making" | "shipped" | "delivered";
  items: (CartLine & { title: string; price: number; image: string })[];
  customer: { name: string; email: string; phone: string; address: string; city: string; state: string; pin: string };
  payment: "prepaid" | "cod";
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
};

const KEY = "ahc_orders";

export function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]") as Order[];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order) {
  const all = loadOrders();
  all.unshift(order);
  window.localStorage.setItem(KEY, JSON.stringify(all.slice(0, 50)));
}

export function findOrder(id: string): Order | undefined {
  return loadOrders().find((o) => o.id.toLowerCase() === id.trim().toLowerCase());
}

export function newOrderId() {
  return `AHC${Date.now().toString().slice(-8)}`;
}

export const statusSteps: Order["status"][] = ["confirmed", "making", "shipped", "delivered"];

export const statusLabel: Record<Order["status"], string> = {
  confirmed: "Order confirmed",
  making: "On the hook",
  shipped: "Shipped",
  delivered: "Delivered",
};
