import { create } from "zustand";

interface CanvasBox {
  topLeftX: number;
  topLeftY: number;
  width: number;
  height: number;
}

interface StoreState {
  images: { id: number; url: string }[];
  setImages: (images: { id: number; url: string }[]) => void;
  categories: { id: number; name: string }[];
  setCategories: (categories: { id: number; name: string }[]) => void;
  currentImage: { id: number; url: string } | null;
  setCurrentImage: (image: { id: number; url: string } | null) => void;
  selectedCategory: number | null;
  setSelectedCategory: (category: number | null) => void;
  canvasBox: CanvasBox;
  setCanvasBox: (box: CanvasBox) => void;
}

const useStore = create<StoreState>((set) => ({
  images: [],
  setImages: (images) => set({ images }),
  categories: [],
  setCategories: (categories) => set({ categories }),
  currentImage: null,
  setCurrentImage: (image) => set({ currentImage: image }),
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  canvasBox: { topLeftX: 0, topLeftY: 0, width: 0, height: 0 },
  setCanvasBox: (box) => set({ canvasBox: box }),
}));

export default useStore;
