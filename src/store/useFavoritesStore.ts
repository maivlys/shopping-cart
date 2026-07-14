import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoritesStore = {
  favs: number[];
  isFav: (id: number) => boolean;
  addToFavs: (id: number) => void;
  removeFromFavs: (id: number) => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favs: [],

      isFav: (id) => get().favs.includes(id),

      addToFavs: (id) => {
        set((state) => ({ favs: [...state.favs, id] }))
      },

      removeFromFavs: (id) => {
        set((state) => ({
          favs: state.favs.filter((favId) => favId !== id)
        }))
      },

    }),
    { name: "favProducts" },
  )
);