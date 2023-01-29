import { Event as FirestoreEventItem } from "@/pages";
import { create } from "zustand";

interface MainState {
    currentItem?: FirestoreEventItem;
    setCurrentItem: (item: FirestoreEventItem) => void;
    eventItems: FirestoreEventItem[];
    setEventItems:  (items: FirestoreEventItem[]) => void;
}

const useMainStore = create<MainState>((set) => ({
    currentItem: undefined,
    setCurrentItem: (item: FirestoreEventItem) => set((state) => ({ currentItem: item })),
    eventItems: [],
    setEventItems: (items: FirestoreEventItem[]) => set((state) => ({ eventItems: items })),
}))

export default useMainStore