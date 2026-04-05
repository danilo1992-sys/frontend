import { create } from "zustand";
import type { FormStoreState, DeleteStoreState, PageState } from "./types";

export const FormStore = create<FormStoreState>((set) => ({
  pageState: true,
  setPageState: (state: PageState) => set({ pageState: state }),
  isSaving: false,
  setIsSaving: (state: boolean) => set({ isSaving: state })
}));

export const DeleteStore = create<DeleteStoreState>((set) => ({
  pageState: false,
  setPageState: (state) => set({ pageState: state }),
}));
