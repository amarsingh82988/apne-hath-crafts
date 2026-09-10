import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/data/catalog";

export type CartLine = {
  productId: string;
  qty: number;
  color?: string;
  size?: string;
  note?: string;
};

type ShopState = {
  cart: CartLine[];
  wishlist: string[];
  ready: boolean;
  addToCart: (line: CartLine) => void;
  updateQty: (index: number, qty: number) => void;
  removeLine: (index: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  inWishlist: (productId: string) => boolean;
  cartCount: number;
  subtotal: number;
};

const ShopContext = createContext<ShopState | null>(null);

const CART_KEY = "ahc.cart";
const WISH_KEY = "ahc.wishlist";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      const w = localStorage.getItem(WISH_KEY);
      if (c) setCart(JSON.parse(c) as CartLine[]);
      if (w) setWishlist(JSON.parse(w) as string[]);
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, ready]);

  useEffect(() => {
    if (ready) localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, ready]);

  const value = useMemo<ShopState>(() => {
    const subtotal = cart.reduce((sum, line) => {
      const p = products.find((x) => x.id === line.productId);
      return sum + (p ? p.price * line.qty : 0);
    }, 0);

    return {
      cart,
      wishlist,
      ready,
      cartCount: cart.reduce((n, l) => n + l.qty, 0),
      subtotal,
      addToCart: (line) =>
        setCart((prev) => {
          const i = prev.findIndex(
            (l) => l.productId === line.productId && l.color === line.color && l.size === line.size,
          );
          if (i === -1) return [...prev, line];
          const next = [...prev];
          const existing = next[i]!;
          const product = products.find((p) => p.id === line.productId);
          const max = product?.stock ?? 99;
          next[i] = { ...existing, qty: Math.min(existing.qty + line.qty, max) };
          return next;
        }),
      updateQty: (index, qty) =>
        setCart((prev) =>
          prev.map((l, i) => (i === index ? { ...l, qty: Math.max(1, qty) } : l)),
        ),
      removeLine: (index) => setCart((prev) => prev.filter((_, i) => i !== index)),
      clearCart: () => setCart([]),
      toggleWishlist: (productId) =>
        setWishlist((prev) =>
          prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
        ),
      inWishlist: (productId) => wishlist.includes(productId),
    };
  }, [cart, wishlist, ready]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}

export const productById = (id: string): Product | undefined => products.find((p) => p.id === id);
