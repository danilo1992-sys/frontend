import { create } from "zustand";

type PageState = false;

interface StoreState {
  pageState: PageState;
  setPageState: (state: PageState) => void;
}

export const FormStore = create<StoreState>((set) => ({
  pageState: false,
  setPageState: (state) => set({ pageState: state }),
}));

export const DeleteStore = create<StoreState>((set) => ({
  pageState: false,
  setPageState: (state) => set({ pageState: state }),
}));
