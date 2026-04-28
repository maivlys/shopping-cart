import { createContext, useContext, useState, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartContext = {
  getQnt: (id: number) => number;
  increaseQnt: (id: number, qntInput?: number) => void;
  decreaseQnt: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  getTotalQnt: () => number;
  isInCart: (id: number) => boolean;
  favs: number[];
  isFav: (id: number) => boolean;
  addToFavs: (id: number) => void;
  removeFromFavs: (id: number) => void;
  freeDeliveryPrice: number;
  giftPackagingPrice: number;
  openCartPreview: boolean;
  setOpenCartPreview: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [openCartPreview, setOpenCartPreview] = useState(false); //cart preview on product page

  const freeDeliveryPrice = 49;
  const giftPackagingPrice = 1.5;

  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    [],
  );

  function getQnt(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseQnt(id: number, qntInput: number = 1) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id) == null) {
        return [...cartItems, { id, quantity: qntInput }];
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + qntInput };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseQnt(id: number) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.quantity === 1) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }

  function getTotalQnt(): number {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  function isInCart(id: number) {
    return cartItems.some((item) => item.id === id);
  }

  const [favs, setFavs] = useLocalStorage<number[]>("favProducts", []);

  function isFav(id: number) {
    return favs.some((item) => item === id);
  }

  function addToFavs(id: number) {
    setFavs((prev) => [...prev, id]);
  }

  function removeFromFavs(id: number) {
    const filtered = favs.filter((item) => item !== id);
    setFavs(filtered);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        setCartItems,
        getQnt,
        increaseQnt,
        decreaseQnt,
        removeFromCart,
        getTotalQnt,
        isInCart,
        favs,
        isFav,
        addToFavs,
        removeFromFavs,
        freeDeliveryPrice,
        giftPackagingPrice,
        openCartPreview,
        setOpenCartPreview,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
