import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
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

// type FavProduct = {
//   id: number;
//   name: string;
//   imgUrl: string;
// };

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    [],
  );

  const freeDeliveryPrice = 49;

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

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
    console.log(cartItems);
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
    console.log("cartItems-->", cartItems);

    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  function isInCart(id: number) {
    return cartItems.some((item) => item.id === id);
  }

  const [favs, setFavs] = useLocalStorage<number[]>("favProducts", []);

  useEffect(() => {
    console.log(favs);
  }, [favs]);

  function isFav(id: number) {
    return favs.some((item) => item === id);
  }

  function addToFavs(id) {
    setFavs((prev) => [...prev, id]);
  }

  function removeFromFavs(id) {
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
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
