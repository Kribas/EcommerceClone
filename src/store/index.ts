import React from "react";
import create, { StateCreator } from "zustand";
import { PersistOption } from "zustand-persist/lib/configurePersist";
import { AuthUserType } from "../types/AuthUserTypes";
import { persist } from "zustand/middleware/persist";

interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  units: number;
}

interface Store {
  productData: ProductType[];
  basketItems: ProductType[];
  searchedProduct: ProductType[];
  showSearchBar: boolean;
  authUser: AuthUserType[];
}

type MyPersist = (
  config: StateCreator<Store>,
  options: PersistOption<Store>
) => StateCreator<Store>;

const useStore = create<Store>((set, get) => ({
  basketItems: [],
  productData: [],
  searchedProduct: [],
  showSearchBar: true,
  authUser: [],

  getProductData: (data: ProductType[]) =>
    set(() => ({
      productData: data,
      searchedProduct: data,
    })),

  getSearchedProduct: (data: ProductType[]) => {
    set(() => ({
      searchedProduct: data,
    }));
  },

  setShowSearchBar: (show: boolean) => {
    set(() => ({
      showSearchBar: show,
    }));
  },

  addToBasket: (items: ProductType) =>
    set((state: Store) => ({
      basketItems: [...state.basketItems, items],
    })),

  removeFromBasket: (item: ProductType) => {
    const basketItems = get().basketItems;
    const index = basketItems.findIndex(
      (basketItem: ProductType) => basketItem.id === item.id
    );
    let newBasket = [...basketItems];
    if (index >= 0) {
      newBasket.splice(index, 1);
    } else {
      console.warn(`Cant remove product (id: ${item.id}) from basket`);
    }
    set(() => ({
      basketItems: newBasket,
    }));
  },

  setAuthUser: (user: AuthUserType[]) => {
    set(() => ({
      authUser: user,
    }));
  },
}));

export const useProductsStore = useStore;
