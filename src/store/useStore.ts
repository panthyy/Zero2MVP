import { create } from "zustand";
import { persist } from "zustand/middleware";
type StoreState = {
  selectedStore: string;
  setSelectedStore: (store: string) => void;
};

export const useStoreStore = create<StoreState>()(
  persist(
    (set) => ({
      selectedStore: "",
      setSelectedStore: (store) => set({ selectedStore: store }),
    }),
    {
      name: "store-storage",
    }
  )
);
