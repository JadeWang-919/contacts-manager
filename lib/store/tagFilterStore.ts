import { create } from "zustand";

interface TagFilterStore {
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  clearTags: () => void;
}

export const useTagFilterStore = create<TagFilterStore>((set) => ({
  selectedTags: [],
  toggleTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.includes(tag)
        ? state.selectedTags.filter((t) => t !== tag)
        : [...state.selectedTags, tag],
    })),
  clearTags: () => set({ selectedTags: [] }),
}));
